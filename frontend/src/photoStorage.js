// photoStorage.js - High-capacity IndexedDB + In-Memory Photo Vault for School ERP
// Solves browser localStorage 5MB quota exhaustion permanently.

const DB_NAME = 'MagraSchoolPhotoVault';
const DB_VERSION = 1;
const STORE_NAME = 'student_photos';

// In-memory cache for 0ms synchronous access during React renders
export const PHOTO_CACHE = new Map();

// Helper to normalize department / group
export function normalizeStudentDept(student) {
  if (!student) return '';
  const sid = String(student.student_id || student.id || '').toUpperCase();
  if (sid.includes('-HUM') || sid.includes('_HUM') || sid.includes('/HUM') || sid.includes('HUM-') || sid.includes('-ARTS-')) return 'hum';
  if (sid.includes('-BS') || sid.includes('_BS') || sid.includes('/BS') || sid.includes('BS-') || sid.includes('-COM-') || sid.includes('-BUS-')) return 'bs';
  if (sid.includes('-SCI') || sid.includes('_SCI') || sid.includes('/SCI') || sid.includes('SCI-')) return 'sci';

  const raw = `${student.department || ''} ${student.group_name || ''} ${student.group || ''} ${student.section || ''}`.toLowerCase();
  if (raw.includes('মানবিক') || raw.includes('humanities') || raw.includes('arts') || raw.includes('hum')) return 'hum';
  if (raw.includes('ব্যবসা') || raw.includes('বাণিজ্য') || raw.includes('business') || raw.includes('commerce') || raw.includes('bs')) return 'bs';
  if (raw.includes('বিজ্ঞান') || raw.includes('science') || raw.includes('sci')) return 'sci';
  
  const sec = String(student.section || '').trim().toLowerCase();
  if (sec && !sec.includes('সাধারণ')) {
    return sec.replace(/[^a-z0-9]/g, '');
  }
  return '';
}

// Helper to normalize class, roll & department
export function getStudentPhotoKey(student) {
  if (!student) return { sId: '', cName: '', rNo: '', dept: '' };
  const sId = String(student.id || student.student_id || '').toLowerCase().trim();
  const cName = String(student.class_name || '').replace(/[০-৯]/g, d => ({ '০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9' })[d] || d).trim();
  const rNo = String(student.roll_no || '').replace(/[০-৯]/g, d => ({ '০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9' })[d] || d).trim();
  const dept = normalizeStudentDept(student);
  return { sId, cName, rNo, dept };
}

// Open or get IndexedDB connection
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => {
      console.warn('IndexedDB open error:', e);
      resolve(null);
    };
  });
}

// Store photo in IndexedDB
export async function idbSetPhoto(key, dataUrl) {
  if (!key || !dataUrl) return;
  try {
    const db = await openDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(dataUrl, String(key).toLowerCase());
  } catch (err) {
    console.warn('idbSetPhoto error:', err);
  }
}

// Get photo from IndexedDB
export async function idbGetPhoto(key) {
  if (!key) return null;
  try {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(String(key).toLowerCase());
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Delete photo from IndexedDB
export async function idbDeletePhoto(key) {
  if (!key) return;
  try {
    const db = await openDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(String(key).toLowerCase());
  } catch (err) {
    console.warn('idbDeletePhoto error:', err);
  }
}

// Detect Assistant Head Teacher (Tapasi Sarker) photo to prevent cross-contamination into Head Teacher's card
export function getAssistantHeadPhoto() {
  const asstKeys = [
    'teacher_t-2',
    'teacher_emp-002',
    'teacher_emp_002',
    'emp_002',
    'emp_2',
    'teacher_t_2',
    't-2',
    'teacher_name_তাপসী সরকার',
    'leadership_asst_head'
  ];
  for (const k of asstKeys) {
    const val = PHOTO_CACHE.get(k.toLowerCase());
    if (val && typeof val === 'string' && val.startsWith('data:image')) {
      return val;
    }
  }
  try {
    const lsVal = localStorage.getItem('magra_photo_teacher_EMP-002') || localStorage.getItem('magra_photo_teacher_t-2');
    if (lsVal && typeof lsVal === 'string' && lsVal.startsWith('data:image')) {
      return lsVal;
    }
    const rawTch = localStorage.getItem('magra_db_teachers');
    if (rawTch) {
      const list = JSON.parse(rawTch);
      if (Array.isArray(list)) {
        const asstT = list.find(t => t && ((t.employee_id || '').toUpperCase() === 'EMP-002' || t.id === 't-2' || (t.name_bn || '').includes('তাপসী')));
        const p = asstT?.photo_url || asstT?.photo;
        if (p && typeof p === 'string' && p.startsWith('data:image')) return p;
      }
    }
    const rawLeader = localStorage.getItem('magra_db_leadership_settings');
    if (rawLeader) {
      const leaderObj = JSON.parse(rawLeader);
      const asstP = leaderObj.asst_head?.photo;
      if (asstP && typeof asstP === 'string' && asstP.startsWith('data:image')) return asstP;
    }
  } catch {}
  return null;
}

export function isAssistantHeadPhoto(photo) {
  if (!photo || typeof photo !== 'string' || !photo.startsWith('data:image')) return false;
  const asstPhoto = getAssistantHeadPhoto();
  if (asstPhoto && photo === asstPhoto) return true;
  const asstKeys = [
    'teacher_t-2',
    'teacher_emp-002',
    'teacher_emp_002',
    'emp_002',
    'emp_2',
    'teacher_t_2',
    't-2',
    'teacher_name_তাপসী সরকার',
    'leadership_asst_head'
  ];
  for (const k of asstKeys) {
    const val = PHOTO_CACHE.get(k.toLowerCase());
    if (val && val === photo) return true;
  }
  return false;
}

// Load all photos from IndexedDB and localStorage into PHOTO_CACHE on startup
export async function initPhotoStorage() {
  if (typeof window === 'undefined') return;

  // 1a. Sanitize leadership settings & photos: Head Teacher must NEVER inherit Assistant Head Teacher's photo or name
  try {
    const rawLeader = localStorage.getItem('magra_db_leadership_settings');
    if (rawLeader) {
      const leaderObj = JSON.parse(rawLeader);
      let changed = false;
      if (leaderObj.head) {
        const hName = (leaderObj.head.name || '').toLowerCase();
        const hDesig = (leaderObj.head.designation || '').toLowerCase();
        const asstPhoto = leaderObj.asst_head?.photo || PHOTO_CACHE.get('leadership_asst_head') || getAssistantHeadPhoto();
        if (hName.includes('তাপসী') || hDesig.includes('সহকারী') || (asstPhoto && leaderObj.head.photo === asstPhoto) || isAssistantHeadPhoto(leaderObj.head.photo)) {
          delete leaderObj.head;
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem('magra_db_leadership_settings', JSON.stringify(leaderObj));
      }
    }

    const headPhotoInCache = PHOTO_CACHE.get('leadership_head');
    const asstPhotoInCache = PHOTO_CACHE.get('leadership_asst_head');
    if (headPhotoInCache && (headPhotoInCache === asstPhotoInCache || isAssistantHeadPhoto(headPhotoInCache))) {
      PHOTO_CACHE.delete('leadership_head');
      idbDeletePhoto('leadership_head');
    }
  } catch (err) {
    console.warn('Leadership photo sanitize error:', err);
  }

  // 1. Purge ambiguous non-department roll keys for Classes 9 & 10 from localStorage
  try {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (
        k.startsWith('magra_photo_cls_10_roll_') ||
        k.startsWith('magra_photo_cls_9_roll_') ||
        k.startsWith('magra_photo_10_') ||
        k.startsWith('magra_photo_9_') ||
        k.startsWith('magra_photo_cls_10_') ||
        k.startsWith('magra_photo_cls_9_') ||
        k.startsWith('magra_photo_class_10_') ||
        k.startsWith('magra_photo_class_9_')
      ) {
        if (!k.includes('_sci_') && !k.includes('_hum_') && !k.includes('_bs_')) {
          toRemove.push(k);
        }
      }
    }
    toRemove.forEach(k => localStorage.removeItem(k));
  } catch {}

  // 1b. Scan localStorage for any legacy photos and load into cache
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('magra_photo_') && !k.includes('thumb')) {
        const val = localStorage.getItem(k);
        if (val && val.startsWith('data:image')) {
          const subKey = k.replace('magra_photo_', '').toLowerCase();
          // Skip ambiguous class 9 & 10 keys without department
          if ((subKey.startsWith('cls_10_') || subKey.startsWith('cls_9_') || subKey.startsWith('10_') || subKey.startsWith('9_')) && !subKey.includes('_sci_') && !subKey.includes('_hum_') && !subKey.includes('_bs_')) {
            continue;
          }
          PHOTO_CACHE.set(subKey, val);
          idbSetPhoto(subKey, val);
        }
      }
    }
  } catch (e) {
    console.warn('LocalStorage scan error:', e);
  }

  // 2. Scan magra_db_students and resolve any cross-department duplicate photo pollution
  try {
    const rawSt = localStorage.getItem('magra_db_students');
    if (rawSt) {
      const list = JSON.parse(rawSt);
      if (Array.isArray(list)) {
        // Collect genuine Science Class 10 photos by roll
        const sciPhotosByRoll = new Map();
        list.forEach(s => {
          if (!s) return;
          const cName = String(s.class_name || '').trim();
          const dept = normalizeStudentDept(s);
          const rNo = String(s.roll_no || '').trim();
          const p = s.photo_url || s.photo || s.image;
          if (cName === '10' && dept === 'sci' && p && typeof p === 'string' && p.startsWith('data:image')) {
            sciPhotosByRoll.set(rNo, p);
          }
        });

        // Clean any Humanities / Business Studies students that mistakenly inherited Science photos
        let listModified = false;
        list.forEach(s => {
          if (!s) return;
          const cName = String(s.class_name || '').trim();
          const dept = normalizeStudentDept(s);
          const rNo = String(s.roll_no || '').trim();
          if (cName === '10' && dept !== 'sci') {
            const sciPhoto = sciPhotosByRoll.get(rNo);
            const p = s.photo_url || s.photo || s.image;
            if (sciPhoto && p === sciPhoto) {
              s.photo_url = '';
              s.photo = '';
              s.image = '';
              listModified = true;
            }
          }
        });
        if (listModified) {
          try {
            localStorage.setItem('magra_db_students', JSON.stringify(list));
          } catch {}
        }

        // Index all legitimate student photos with strict department awareness
        list.forEach(s => {
          if (!s) return;
          const photo = s.photo_url || s.photo || s.image;
          if (photo && typeof photo === 'string' && photo.startsWith('data:image') && photo.length > 50) {
            savePhotoToCacheAndIdb(s, photo);
          }
        });
      }
    }
  } catch (e) {
    console.warn('magra_db_students photo scan error:', e);
  }

  // 2b. Also scan magra_db_teachers in localStorage for embedded custom photos
  try {
    const rawTch = localStorage.getItem('magra_db_teachers');
    if (rawTch) {
      const list = JSON.parse(rawTch);
      if (Array.isArray(list)) {
        list.forEach(t => {
          if (!t) return;
          const photo = t.photo_url || t.photo;
          if (photo && typeof photo === 'string' && photo.startsWith('data:image') && photo.length > 50 && !photo.includes('data:image/svg')) {
            saveTeacherCustomPhoto(t, photo);
          }
        });
      }
    }
  } catch (e) {
    console.warn('magra_db_teachers photo scan error:', e);
  }

  // 3. Load all photos from IndexedDB into PHOTO_CACHE and delete ambiguous keys
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const k = String(cursor.key).toLowerCase();
          // Purge ambiguous keys without department in Class 9 & 10
          if ((k.startsWith('cls_10_') || k.startsWith('cls_9_') || k.startsWith('10_') || k.startsWith('9_') || k.startsWith('class_10_') || k.startsWith('class_9_')) && !k.includes('_sci_') && !k.includes('_hum_') && !k.includes('_bs_')) {
            cursor.delete();
            cursor.continue();
            return;
          }
          // Purge corrupt leadership_head or t-1 if it mistakenly contains Assistant Head Teacher's photo
          if ((k === 'leadership_head' || k.startsWith('teacher_t-1') || k.startsWith('emp_001')) && isAssistantHeadPhoto(cursor.value)) {
            cursor.delete();
            PHOTO_CACHE.delete(k);
            cursor.continue();
            return;
          }
          PHOTO_CACHE.set(k, cursor.value);
          cursor.continue();
        } else {
          // Clean memory cache of any ambiguous non-dept keys
          for (const k of Array.from(PHOTO_CACHE.keys())) {
            if ((k.startsWith('cls_10_') || k.startsWith('cls_9_') || k.startsWith('10_') || k.startsWith('9_') || k.startsWith('class_10_') || k.startsWith('class_9_')) && !k.includes('_sci_') && !k.includes('_hum_') && !k.includes('_bs_')) {
              PHOTO_CACHE.delete(k);
            }
          }
          // Double check leadership_head and head teacher keys in memory cache
          const lh = PHOTO_CACHE.get('leadership_head');
          if (lh && isAssistantHeadPhoto(lh)) {
            PHOTO_CACHE.delete('leadership_head');
            idbDeletePhoto('leadership_head');
          }
          const t1Photo = PHOTO_CACHE.get('teacher_t-1');
          if (t1Photo && isAssistantHeadPhoto(t1Photo)) {
            PHOTO_CACHE.delete('teacher_t-1');
            idbDeletePhoto('teacher_t-1');
          }
          const emp1Photo = PHOTO_CACHE.get('emp_001');
          if (emp1Photo && isAssistantHeadPhoto(emp1Photo)) {
            PHOTO_CACHE.delete('emp_001');
            idbDeletePhoto('emp_001');
          }
          // Ensure asst photo is correctly assigned to leadership_asst_head if missing
          const asstP = getAssistantHeadPhoto();
          if (asstP && !PHOTO_CACHE.get('leadership_asst_head')) {
            PHOTO_CACHE.set('leadership_asst_head', asstP);
            idbSetPhoto('leadership_asst_head', asstP);
          }
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('magra_photos_synced'));
          }
        }
      };
    }
  } catch (err) {
    console.warn('IndexedDB preload error:', err);
  }
}

// Helper to save photo to memory cache and IndexedDB across multiple lookup keys
export function savePhotoToCacheAndIdb(student, dataUrl) {
  if (!student || !dataUrl) return;
  const { sId, cName, rNo, dept } = getStudentPhotoKey(student);

  // Set in synchronous memory cache
  if (student.id) PHOTO_CACHE.set(String(student.id).toLowerCase(), dataUrl);
  if (student.student_id) PHOTO_CACHE.set(String(student.student_id).toLowerCase(), dataUrl);
  if (sId) PHOTO_CACHE.set(sId, dataUrl);

  // Department-aware keys: Class 9 and 10 MUST use department in roll keys
  if (cName && rNo) {
    if (dept) {
      PHOTO_CACHE.set(`cls_${cName}_${dept}_roll_${rNo}`.toLowerCase(), dataUrl);
      PHOTO_CACHE.set(`cls_${cName}_${dept}_${rNo}`.toLowerCase(), dataUrl);
      PHOTO_CACHE.set(`${cName}_${dept}_${rNo}`.toLowerCase(), dataUrl);
    } else if (cName !== '9' && cName !== '10') {
      PHOTO_CACHE.set(`cls_${cName}_roll_${rNo}`.toLowerCase(), dataUrl);
      PHOTO_CACHE.set(`${cName}_${rNo}`.toLowerCase(), dataUrl);
      PHOTO_CACHE.set(`cls_${cName}_${rNo}`.toLowerCase(), dataUrl);
      PHOTO_CACHE.set(`class_${cName}_roll_${rNo}`.toLowerCase(), dataUrl);
    }
  }

  // Set in IndexedDB (asynchronous, high capacity)
  if (student.id) idbSetPhoto(String(student.id).toLowerCase(), dataUrl);
  if (student.student_id) idbSetPhoto(String(student.student_id).toLowerCase(), dataUrl);
  if (sId) idbSetPhoto(sId, dataUrl);
  if (cName && rNo) {
    if (dept) {
      idbSetPhoto(`cls_${cName}_${dept}_roll_${rNo}`.toLowerCase(), dataUrl);
      idbSetPhoto(`cls_${cName}_${dept}_${rNo}`.toLowerCase(), dataUrl);
    } else if (cName !== '9' && cName !== '10') {
      idbSetPhoto(`cls_${cName}_roll_${rNo}`.toLowerCase(), dataUrl);
      idbSetPhoto(`${cName}_${rNo}`.toLowerCase(), dataUrl);
      idbSetPhoto(`cls_${cName}_${rNo}`.toLowerCase(), dataUrl);
      idbSetPhoto(`class_${cName}_roll_${rNo}`.toLowerCase(), dataUrl);
    }
  }

  // Safe fallback to localStorage (tiny key only, ignore quota errors)
  try {
    if (cName && rNo) {
      if (dept) {
        localStorage.setItem(`magra_photo_cls_${cName}_${dept}_roll_${rNo}`, dataUrl);
      } else if (cName !== '9' && cName !== '10') {
        localStorage.setItem(`magra_photo_cls_${cName}_roll_${rNo}`, dataUrl);
      }
    }
  } catch {}

  // Dispatch update event for instant UI re-render
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('magra_photos_synced'));
  }
}

export function getTeacherPhotoKeys(teacher) {
  if (!teacher) return [];
  const keys = [];
  const id = String(teacher.id || '').toLowerCase().trim();
  const empId = String(teacher.employee_id || '').toLowerCase().trim();
  const nameBn = String(teacher.name_bn || teacher.name || '').trim();

  if (id) {
    keys.push(`teacher_${id}`);
    keys.push(`tch_${id}`);
    keys.push(id);
    const idNum = id.match(/\d+/);
    if (idNum) {
      keys.push(`teacher_t_${idNum[0]}`);
      keys.push(`teacher_t_${parseInt(idNum[0], 10)}`);
    }
  }
  if (empId) {
    keys.push(`teacher_${empId}`);
    keys.push(`teacher_emp_${empId}`);
    keys.push(`tch_emp_${empId}`);
    keys.push(`emp_${empId}`);
    const numMatch = empId.match(/\d+/);
    if (numMatch) {
      const num = parseInt(numMatch[0], 10);
      keys.push(`teacher_emp_${num}`);
      keys.push(`teacher_emp_${String(num).padStart(3, '0')}`);
      keys.push(`emp_${num}`);
      keys.push(`emp_${String(num).padStart(3, '0')}`);
    }
  }
  if (nameBn) {
    keys.push(`teacher_name_${nameBn}`);
  }
  return keys;
}

export function saveTeacherCustomPhoto(teacher, dataUrl) {
  if (!teacher || !dataUrl) return;
  const isHead = (
    teacher.id === 't-1' || 
    (teacher.employee_id || '').toUpperCase() === 'EMP-001' ||
    ((teacher.designation || '').includes('প্রধান শিক্ষক') && !(teacher.designation || '').includes('সহকারী')) ||
    (teacher.name_bn || '').includes('শফিকুল')
  );
  if (isHead && isAssistantHeadPhoto(dataUrl)) {
    return; // Strictly reject assigning Assistant Head photo to Head Teacher!
  }
  const keys = getTeacherPhotoKeys(teacher);
  keys.forEach(k => {
    PHOTO_CACHE.set(k, dataUrl);
    idbSetPhoto(k, dataUrl);
  });
  const empId = String(teacher.employee_id || teacher.id || '').trim();
  if (empId) {
    try {
      localStorage.setItem(`magra_photo_teacher_${empId}`, dataUrl);
    } catch {}
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('magra_photos_synced'));
    window.dispatchEvent(new CustomEvent('magra_teachers_updated'));
  }
}

export function getTeacherCustomPhoto(teacher) {
  if (!teacher) return null;
  const isHead = (
    teacher.id === 't-1' || 
    (teacher.employee_id || '').toUpperCase() === 'EMP-001' ||
    ((teacher.designation || '').includes('প্রধান শিক্ষক') && !(teacher.designation || '').includes('সহকারী')) ||
    (teacher.name_bn || '').includes('শফিকুল')
  );
  const keys = getTeacherPhotoKeys(teacher);
  for (const k of keys) {
    const val = PHOTO_CACHE.get(k);
    if (val && val.length > 50) {
      if (!isHead || !isAssistantHeadPhoto(val)) {
        return val;
      }
    }
  }
  const empId = String(teacher.employee_id || teacher.id || '').trim();
  if (empId) {
    try {
      const lsVal = localStorage.getItem(`magra_photo_teacher_${empId}`);
      if (lsVal && lsVal.length > 50) {
        if (!isHead || !isAssistantHeadPhoto(lsVal)) {
          PHOTO_CACHE.set(`teacher_${empId}`, lsVal);
          return lsVal;
        }
      }
    } catch {}
  }
  return null;
}

export async function saveLeadershipPhoto(roleKey, dataUrl) {
  if (!roleKey || !dataUrl) return;
  if (roleKey === 'head' && isAssistantHeadPhoto(dataUrl)) {
    return; // Strictly reject saving assistant head photo as head photo
  }
  const key = `leadership_${roleKey}`.toLowerCase();
  PHOTO_CACHE.set(key, dataUrl);
  await idbSetPhoto(key, dataUrl);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('magra_photos_synced'));
    window.dispatchEvent(new CustomEvent('magra_leadership_updated'));
  }
}

export function getLeadershipPhoto(roleKey) {
  if (!roleKey) return null;
  const key = `leadership_${roleKey}`.toLowerCase();
  const val = PHOTO_CACHE.get(key) || null;
  if (key === 'leadership_head' && isAssistantHeadPhoto(val)) {
    PHOTO_CACHE.delete('leadership_head');
    idbDeletePhoto('leadership_head');
    return null;
  }
  return val;
}

// Client-side lightweight canvas image compressor to prevent LocalStorage 5MB quota errors
export function compressImageToDataUrl(source, maxDimension = 360, quality = 0.82) {
  return new Promise((resolve) => {
    if (!source) return resolve('');
    // If it's a File or Blob
    if (typeof window !== 'undefined' && (source instanceof Blob || source instanceof File)) {
      const reader = new FileReader();
      reader.onload = () => {
        compressImageToDataUrl(reader.result, maxDimension, quality).then(resolve);
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(source);
      return;
    }
    // If it's a string URL
    if (typeof source === 'string') {
      if (!source.startsWith('data:image/')) {
        // Plain HTTP or static image URL
        return resolve(source);
      }
      // If already compact (< 35KB), keep as is
      if (source.length < 35000) {
        return resolve(source);
      }
      if (typeof document === 'undefined') return resolve(source);
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let w = img.width;
          let h = img.height;
          if (w > maxDimension || h > maxDimension) {
            const ratio = Math.min(maxDimension / w, maxDimension / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }
          canvas.width = Math.max(1, w);
          canvas.height = Math.max(1, h);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(source);
        }
      };
      img.onerror = () => resolve(source);
      img.src = source;
      return;
    }
    resolve(source);
  });
}

// Auto-initialize on import in browser
if (typeof window !== 'undefined') {
  setTimeout(() => {
    initPhotoStorage();
  }, 10);
}
