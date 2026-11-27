// Supabase Client & Real-time Cloud Sync Engine for Magra School Management ERP V118
import { saveTeacherCustomPhoto, isAssistantHeadPhoto } from './photoStorage.js';
import { AUTHENTIC_FEE_DEPOSITS } from './mockData.js';

const DEFAULT_URL = 'https://iyznvucpjubelabwsiba.supabase.co';
const DEFAULT_KEY = 'sb_publishable_bIhO90sDYYb5Wi5pqlrAdg_G4TUov22';

const STORAGE_KEY_URL = 'magra_supabase_url';
const STORAGE_KEY_KEY = 'magra_supabase_anon_key';
const STORAGE_KEY_AUTO_SYNC = 'magra_supabase_auto_sync';

export const SYNC_KEYS = [
  'magra_finance_fees',
  'magra_finance_deposits',
  'magra_finance_incomes',
  'magra_finance_expenses',
  'magra_db_students',
  'magra_db_teachers',
  'magra_db_staff',
  'magra_db_marks',
  'magra_db_exams',
  'magra_db_notices'
];

export function cleanSupabaseUrl(url) {
  if (!url) return '';
  return String(url)
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/rest\/v1\/?$/i, '')
    .trim();
}

export function getSupabaseConfig() {
  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
  let url = (localStorage.getItem(STORAGE_KEY_URL) || env.VITE_SUPABASE_URL || DEFAULT_URL || '').trim();
  url = cleanSupabaseUrl(url);
  const anonKey = (localStorage.getItem(STORAGE_KEY_KEY) || env.VITE_SUPABASE_ANON_KEY || DEFAULT_KEY || '').trim();
  const autoSync = localStorage.getItem(STORAGE_KEY_AUTO_SYNC) !== 'false';
  return { url, anonKey, autoSync, isConfigured: Boolean(url && anonKey) };
}

export function saveSupabaseConfig(url, anonKey, autoSync = true) {
  const cleanUrl = cleanSupabaseUrl(url);
  const cleanKey = (anonKey || '').trim();
  if (cleanUrl) localStorage.setItem(STORAGE_KEY_URL, cleanUrl);
  else localStorage.removeItem(STORAGE_KEY_URL);

  if (cleanKey) localStorage.setItem(STORAGE_KEY_KEY, cleanKey);
  else localStorage.removeItem(STORAGE_KEY_KEY);

  localStorage.setItem(STORAGE_KEY_AUTO_SYNC, String(autoSync));
  return getSupabaseConfig();
}

export async function testSupabaseConnection(url, anonKey) {
  const targetUrl = cleanSupabaseUrl(url);
  const targetKey = (anonKey || '').trim();
  if (!targetUrl || !targetKey) throw new Error('Supabase URL এবং Anon Key উভয়ই প্রয়োজন');

  // Test against app_sync_store or root
  const endpoint = targetUrl + '/rest/v1/app_sync_store?select=count';
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      apikey: targetKey,
      Authorization: 'Bearer ' + targetKey,
      Prefer: 'count=exact'
    }
  });

  if (!res.ok) {
    const rootRes = await fetch(targetUrl + '/rest/v1/', {
      headers: { apikey: targetKey, Authorization: 'Bearer ' + targetKey }
    });
    if (rootRes.ok) {
      return { ok: true, status: rootRes.status, needsTables: true };
    }
    const txt = await res.text();
    throw new Error('সংযোগে ত্রুটি (' + res.status + '): ' + (txt || 'URL বা Key সঠিক নয়'));
  }
  return { ok: true, status: res.status };
}

export async function supabaseRequest(table, options = {}) {
  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;

  const { method = 'GET', query = '', body = null, headers = {} } = options;
  const queryString = query ? (query.startsWith('?') ? query : ('?' + query)) : '';
  const endpoint = url + '/rest/v1/' + table + queryString;

  const defaultHeaders = {
    apikey: anonKey,
    Authorization: 'Bearer ' + anonKey,
    'Content-Type': 'application/json',
    ...headers
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    if (!defaultHeaders['Prefer']) {
      defaultHeaders['Prefer'] = 'return=representation,resolution=merge-duplicates';
    }
  }

  const fetchOptions = {
    method,
    headers: defaultHeaders
  };
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(endpoint, fetchOptions);
  if (!res.ok) {
    const errorText = await res.text();
    console.warn('Supabase ' + method + ' on ' + table + ' error:', errorText);
    throw new Error(errorText || ('Supabase error (' + res.status + ')'));
  }

  if (res.status === 204) return null;
  return await res.json();
}

// Filter helper to reject obsolete dummy test mock receipts
export const isLegacyMockReceipt = (x) => {
  if (!x) return true;
  const id = String(x.id || '');
  const rno = String(x.receipt_no || x.receiptNo || '');
  if (rno.includes('মপাউইবি') && !rno.includes('মপাইউবি')) return true;
  if (id === 'mock-fee-1' || id === 'mock-fee-2') return true;
  return false;
};

// Push a single key to Supabase app_sync_store
let syncDebounceTimers = {};
export function pushKeyToCloud(key, value) {
  const { isConfigured, autoSync } = getSupabaseConfig();
  if (!isConfigured || !autoSync) return;

  // Never push corrupted/truncated arrays for critical academic tables
  if (Array.isArray(value)) {
    if (key === 'magra_db_marks' && value.length < 500) {
      return;
    }
    if (key === 'magra_db_teachers' && value.length < 15) {
      return;
    }
    if (key === 'magra_finance_fees') {
      value = value.filter(x => !isLegacyMockReceipt(x));
    }
    if (key === 'magra_finance_deposits') {
      value = Array.isArray(value) ? value : [];
    }
  }

  // Instant push (0ms) for financial transaction records to completely avoid window-focus sync race conditions
  const delay = (key === 'magra_finance_fees' || key === 'magra_finance_deposits') ? 0 : 300;

  if (syncDebounceTimers[key]) clearTimeout(syncDebounceTimers[key]);
  syncDebounceTimers[key] = setTimeout(async () => {
    try {
      let payload = value;
      if (typeof payload === 'string') {
        try { payload = JSON.parse(payload); } catch { }
      }
      await supabaseRequest('app_sync_store', {
        method: 'POST',
        body: {
          key,
          value: payload,
          updated_at: new Date().toISOString()
        },
        headers: { Prefer: 'resolution=merge-duplicates' }
      });
      console.log('☁️ Synced to cloud:', key);
    } catch (e) {
      console.warn('Cloud sync push failed for ' + key + ':', e.message);
    }
  }, delay);
}

// Pull all keys from cloud app_sync_store into localStorage
export async function pullAllFromCloud() {
  const { isConfigured } = getSupabaseConfig();
  if (!isConfigured) return false;

  try {
    const rows = await supabaseRequest('app_sync_store', { query: 'select=*' });
    if (!Array.isArray(rows) || rows.length === 0) return false;

    let updatedAny = false;
    rows.forEach(r => {
      if (r && r.key && r.value !== undefined) {
        // Protect critical academic datasets from being overwritten by corrupted cloud data
        if (r.key === 'magra_db_marks') {
          if (!Array.isArray(r.value) || r.value.length < 500) return;
        }
        if (r.key === 'magra_db_teachers') {
          if (!Array.isArray(r.value) || r.value.length < 15) return;
        }

        const cur = localStorage.getItem(r.key);

        // Smart union merge for fee records to NEVER delete locally entered receipts
        if (r.key === 'magra_finance_fees' && Array.isArray(r.value)) {
          let localArr = [];
          try {
            if (cur) localArr = JSON.parse(cur);
          } catch { }
          if (!Array.isArray(localArr)) localArr = [];

          // STRICTLY PURGE ALL LEGACY MOCK RECEIPTS (1070/1065) FROM BOTH CLOUD AND LOCAL
          const cloudArr = r.value.filter(x => !isLegacyMockReceipt(x));
          const cleanLocal = localArr.filter(x => !isLegacyMockReceipt(x));
          const cloudIdMap = new Map();
          const cloudReceiptMap = new Map();
          cloudArr.forEach(x => {
            if (x && x.id) cloudIdMap.set(String(x.id), x);
            const rno = x?.receipt_no || x?.receiptNo;
            if (rno) cloudReceiptMap.set(String(rno).trim(), x);
          });
          let localHasUnsynced = false;
          const merged = [...cloudArr];

          cleanLocal.forEach(localItem => {
            if (!localItem) return;
            const idStr = localItem.id ? String(localItem.id) : null;
            const rnoStr = (localItem.receipt_no || localItem.receiptNo) ? String(localItem.receipt_no || localItem.receiptNo).trim() : null;
            const inCloudById = idStr && cloudIdMap.has(idStr);
            const inCloudByReceipt = rnoStr && cloudReceiptMap.has(rnoStr);

            if (!inCloudById && !inCloudByReceipt) {
              merged.push(localItem);
              localHasUnsynced = true;
            }
          });

          merged.sort((a, b) => {
            const getSeq = (rec) => {
              if (!rec) return 0;
              const rno = rec.receipt_no || rec.receiptNo;
              if (!rno) return 0;
              const parts = String(rno).split('/');
              const lastPart = parts[parts.length - 1];
              const bnDigits = { '০': 0, '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9 };
              const str = String(lastPart).trim();
              const converted = str.split('').map(ch => bnDigits[ch] !== undefined ? bnDigits[ch] : ch).join('');
              const m = converted.match(/\d+/);
              return m ? parseInt(m[0], 10) : 0;
            };
            return getSeq(a) - getSeq(b);
          });

          const mergedStr = JSON.stringify(merged);
          if (cur !== mergedStr) {
            localStorage.setItem(r.key, mergedStr);
            updatedAny = true;
            window.dispatchEvent(new CustomEvent('magra_data_sync', { detail: { key: r.key } }));
          }

          if (localHasUnsynced || cloudArr.length !== r.value.length) {
            pushKeyToCloud(r.key, merged);
          }
          return;
        }

        // Smart union merge for deposits, strictly preserving all authentic deposits
        if (r.key === 'magra_finance_deposits' && Array.isArray(r.value)) {
          let localArr = [];
          try {
            if (cur) localArr = JSON.parse(cur);
          } catch { }
          if (!Array.isArray(localArr)) localArr = [];

          const cloudArr = r.value;
          const cloudIdMap = new Map(cloudArr.map(x => [x.id, x]));
          let localHasUnsynced = false;
          const merged = [...cloudArr];

          localArr.forEach(localItem => {
            if (localItem && localItem.id && !cloudIdMap.has(localItem.id)) {
              merged.push(localItem);
              localHasUnsynced = true;
            }
          });

          // Ensure authentic deposits are always present
          AUTHENTIC_FEE_DEPOSITS.forEach(ad => {
            if (!merged.some(d => d.id === ad.id || d.deposit_no === ad.deposit_no)) {
              merged.push(ad);
              localHasUnsynced = true;
            }
          });

          const mergedStr = JSON.stringify(merged);
          if (cur !== mergedStr) {
            localStorage.setItem(r.key, mergedStr);
            updatedAny = true;
            window.dispatchEvent(new CustomEvent('magra_data_sync', { detail: { key: r.key } }));
          }

          if (localHasUnsynced) {
            pushKeyToCloud(r.key, merged);
          }
          return;
        }

        // Smart merge for teachers to strictly preserve custom photos and qualifications
        if (r.key === 'magra_db_teachers' && Array.isArray(r.value)) {
          let localArr = [];
          try {
            if (cur) localArr = JSON.parse(cur);
          } catch { }
          if (!Array.isArray(localArr)) localArr = [];

          const localMap = new Map();
          localArr.forEach(t => {
            if (t.id) localMap.set(String(t.id).toLowerCase(), t);
            if (t.employee_id) localMap.set(String(t.employee_id).toLowerCase(), t);
          });

          let hasLocalNewerPhoto = false;
          const mergedTeachers = r.value.map(cloudT => {
            const idKey = String(cloudT.id || '').toLowerCase();
            const empKey = String(cloudT.employee_id || '').toLowerCase();
            const localT = localMap.get(idKey) || localMap.get(empKey);

            let photo = cloudT.photo_url || cloudT.photo || '';
            const isHeadT = (
              cloudT.id === 't-1' ||
              (cloudT.employee_id || '').toUpperCase() === 'EMP-001' ||
              ((cloudT.designation || '').includes('প্রধান শিক্ষক') && !(cloudT.designation || '').includes('সহকারী')) ||
              (cloudT.name_bn || '').includes('শফিকুল')
            );
            if (isHeadT && isAssistantHeadPhoto(photo)) {
              photo = '';
            }
            // If cloud has placeholder or empty, but local has real photo, keep local!
            if ((!photo || !photo.startsWith('data:image')) && localT) {
              const localPhoto = localT.photo_url || localT.photo || '';
              if (localPhoto && localPhoto.startsWith('data:image')) {
                if (!isHeadT || !isAssistantHeadPhoto(localPhoto)) {
                  photo = localPhoto;
                  hasLocalNewerPhoto = true;
                }
              }
            }
            if (photo && photo.startsWith('data:image')) {
              if (!isHeadT || !isAssistantHeadPhoto(photo)) {
                saveTeacherCustomPhoto(cloudT, photo);
              }
            }
            return {
              ...cloudT,
              photo_url: photo || cloudT.photo_url,
              photo: photo || cloudT.photo
            };
          });

          const mergedStr = JSON.stringify(mergedTeachers);
          if (cur !== mergedStr) {
            localStorage.setItem(r.key, mergedStr);
            updatedAny = true;
            window.dispatchEvent(new CustomEvent('magra_data_sync', { detail: { key: r.key } }));
            window.dispatchEvent(new CustomEvent('magra_teachers_updated'));
            window.dispatchEvent(new CustomEvent('magra_photos_synced'));
          }

          if (hasLocalNewerPhoto) {
            pushKeyToCloud(r.key, mergedTeachers);
          }
          return;
        }

        // Smart union merge for exams so custom exams are NEVER erased by cloud
        if (r.key === 'magra_db_exams' && Array.isArray(r.value)) {
          let localArr = [];
          try {
            if (cur) localArr = JSON.parse(cur);
          } catch { }
          if (!Array.isArray(localArr)) localArr = [];

          const cloudArr = r.value;
          const cloudIdMap = new Map();
          const cloudNameMap = new Map();
          cloudArr.forEach(x => {
            if (x && x.id) cloudIdMap.set(String(x.id).toLowerCase(), x);
            if (x && x.name_bn) cloudNameMap.set(String(x.name_bn).trim() + '_' + String(x.academic_year || '2026'), x);
          });

          let localHasUnsynced = false;
          const merged = [...cloudArr];

          localArr.forEach(localItem => {
            if (!localItem) return;
            const idKey = localItem.id ? String(localItem.id).toLowerCase() : null;
            const nameKey = localItem.name_bn ? String(localItem.name_bn).trim() + '_' + String(localItem.academic_year || '2026') : null;
            const inCloud = (idKey && cloudIdMap.has(idKey)) || (nameKey && cloudNameMap.has(nameKey));

            if (!inCloud) {
              merged.push(localItem);
              localHasUnsynced = true;
            }
          });

          // Ensure pre-test is always present for 2026
          if (!merged.some(e => e && e.name_bn && e.name_bn.includes('প্রাক'))) {
            merged.push({
              id: 'ex-pre-test-2026',
              academic_year: '2026',
              name_bn: 'প্রাক-নির্বাচনী পরীক্ষা',
              name_en: 'Pre-Test Examination',
              exam_type: 'প্রাক-নির্বাচনী পরীক্ষা',
              status: 'active',
              remarks: 'চলমান শিক্ষাবর্ষের প্রাক-নির্বাচনী পরীক্ষা',
              created_at: new Date().toISOString()
            });
            localHasUnsynced = true;
          }

          const mergedStr = JSON.stringify(merged);
          if (cur !== mergedStr) {
            localStorage.setItem(r.key, mergedStr);
            updatedAny = true;
            window.dispatchEvent(new CustomEvent('magra_data_sync', { detail: { key: r.key } }));
            window.dispatchEvent(new CustomEvent('magra_exams_updated'));
          }

          if (localHasUnsynced || merged.length !== cloudArr.length) {
            pushKeyToCloud(r.key, merged);
          }
          return;
        }

        const valStr = typeof r.value === 'string' ? r.value : JSON.stringify(r.value);
        if (cur !== valStr) {
          localStorage.setItem(r.key, valStr);
          updatedAny = true;
          window.dispatchEvent(new CustomEvent('magra_data_sync', { detail: { key: r.key } }));
        }
      }
    });
    return updatedAny;
  } catch (err) {
    console.warn('Pull from cloud error:', err.message);
    return false;
  }
}

// Push all local data to cloud (Initial migration / seed)
export async function pushAllLocalToCloud() {
  const { isConfigured } = getSupabaseConfig();
  if (!isConfigured) return;

  for (const k of SYNC_KEYS) {
    const raw = localStorage.getItem(k);
    if (raw !== null) {
      let parsed = raw;
      try { parsed = JSON.parse(raw); } catch { }
      if (k === 'magra_db_marks' && Array.isArray(parsed) && parsed.length < 500) continue;
      if (k === 'magra_db_teachers' && Array.isArray(parsed) && parsed.length < 15) continue;
      try {
        await supabaseRequest('app_sync_store', {
          method: 'POST',
          body: {
            key: k,
            value: parsed,
            updated_at: new Date().toISOString()
          },
          headers: { Prefer: 'resolution=merge-duplicates' }
        });
      } catch (e) { }
    }
  }
}

// Global auto-sync starter (Runs on both Mobile and Laptop)
let autoSyncStarted = false;
export function startRealtimeCloudSync() {
  if (autoSyncStarted || typeof window === 'undefined') return;
  autoSyncStarted = true;

  // 1. Initial pull from cloud immediately on startup
  const runInitialPull = async () => {
    try {
      await pullAllFromCloud();
    } catch (e) {
      console.warn('Initial cloud pull failed:', e);
    }
  };
  runInitialPull();
  setTimeout(runInitialPull, 1000);
  setTimeout(runInitialPull, 3000);

  // 2. Periodic sync every 10 seconds
  setInterval(async () => {
    try {
      if (document.visibilityState === 'visible') {
        await pullAllFromCloud();
      }
    } catch { }
  }, 10000);

  // 3. Listen to page focus or visibility change
  window.addEventListener('focus', () => {
    pullAllFromCloud().catch(() => { });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      pullAllFromCloud().catch(() => { });
    }
  });
}

// Legacy helpers for structured tables
export async function uploadLocalToSupabase() {
  await pushAllLocalToCloud();
  return { status: 'success' };
}

export async function downloadSupabaseToLocal() {
  await pullAllFromCloud();
  return { status: 'success' };
}
