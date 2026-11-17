import React, { useState, useEffect } from 'react';

const DB_KEYS = [
  'magra_db_students',
  'magra_db_marks',
  'magra_db_pre_test_results',
  'magra_db_test_results',
  'magra_db_annual_results',
  'magra_db_half_yearly_results',
  'magra_db_admission_results',
  'magra_db_teachers',
  'magra_db_staff',
  'magra_db_notices',
  'magra_db_features',
  'magra_db_subjects',
  'magra_db_exams',
  'magra_institution_data',
  'magra_user'
];

export function exportAllLocalData() {
  const backup = {
    exported_at: new Date().toISOString(),
    system: 'Magra School Management System',
    version: '2.1.0-optimized',
    records: {}
  };

  DB_KEYS.forEach(key => {
    try {
      const val = localStorage.getItem(key);
      if (val !== null) {
        backup.records[key] = JSON.parse(val);
      }
    } catch {
      backup.records[key] = localStorage.getItem(key);
    }
  });

  // Also include any dynamic results keys (like magra_db_results_*)
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('magra_db_results_') && !backup.records[k]) {
      try {
        backup.records[k] = JSON.parse(localStorage.getItem(k));
      } catch {
        backup.records[k] = localStorage.getItem(k);
      }
    }
  }

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  a.download = `magra_school_data_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importAllLocalData(jsonString, onSuccess, onError) {
  try {
    const backup = JSON.parse(jsonString);
    if (!backup || !backup.records) {
      throw new Error('অবৈধ ব্যাকআপ ফাইল। সঠিক JSON ফাইল নির্বাচন করুন।');
    }

    let count = 0;
    Object.entries(backup.records).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        const strVal = typeof val === 'string' ? val : JSON.stringify(val);
        localStorage.setItem(key, strVal);
        count++;
      }
    });

    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('magra_auth_change'));
    window.dispatchEvent(new CustomEvent('magra_data_sync'));

    if (onSuccess) onSuccess(count);
  } catch (err) {
    if (onError) onError(err.message || 'ডাটা রিস্টোর করতে সমস্যা হয়েছে।');
  }
}

export default function DataSyncBridgeModal({ isOpen, onClose }) {
  const [stats, setStats] = useState({ students: 0, marks: 0, exams: 0 });
  const [message, setMessage] = useState(null);

  const calculateStats = () => {
    try {
      const s = JSON.parse(localStorage.getItem('magra_db_students') || '[]');
      const m = JSON.parse(localStorage.getItem('magra_db_marks') || '[]');
      const e = JSON.parse(localStorage.getItem('magra_db_exams') || '[]');
      setStats({
        students: Array.isArray(s) ? s.length : 0,
        marks: Array.isArray(m) ? m.length : 0,
        exams: Array.isArray(e) ? e.length : 0
      });
    } catch {}
  };

  useEffect(() => {
    if (isOpen) {
      calculateStats();
      setMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      importAllLocalData(
        evt.target?.result,
        (count) => {
          calculateStats();
          setMessage({ type: 'success', text: `সফলভাবে ${count}টি ডাটা গ্রুপ রিস্টোর সম্পন্ন হয়েছে! পেজ রিলোড হচ্ছে...` });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        (errMsg) => {
          setMessage({ type: 'error', text: errMsg });
        }
      );
    };
    reader.readAsText(file);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, padding: '16px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '580px',
        padding: '28px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#075c3a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄</span> ডাটা ব্যাকআপ, রিস্টোর ও সিঙ্ক ব্রিজ
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>✕</button>
        </div>

        {message && (
          <div style={{
            padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
            background: message.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: message.type === 'success' ? '#14532d' : '#991b1b',
            border: `1px solid ${message.type === 'success' ? '#86efac' : '#fca5a5'}`
          }}>
            {message.text}
          </div>
        )}

        <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: '#475569', marginBottom: '6px' }}>বর্তমান ব্রাউজারের সংরক্ষিত তথ্য:</div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '13.5px' }}>
            <span>🎓 মোট শিক্ষার্থী: <b>{stats.students}</b> জন</span>
            <span>📝 পরীক্ষার মার্কস রেকর্ড: <b>{stats.marks}</b> টি</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px', textAlign: 'center', background: '#f0fdf4' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📥</div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px', color: '#166534' }}>১-ক্লিক সম্পূর্ণ ব্যাকআপ</div>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>সকল শিক্ষার্থী, নম্বর ও রেজাল্ট একটি JSON ফাইলে সেভ করুন।</p>
            <button onClick={exportAllLocalData} style={{
              background: '#075c3a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer', width: '100%'
            }}>
              ⬇️ ব্যাকআপ ফাইল ডাউনলোড
            </button>
          </div>

          <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px', textAlign: 'center', background: '#eff6ff' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📤</div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px', color: '#1e40af' }}>ডাটা রিস্টোর / মাইগ্রেশন</div>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>পূর্বের ফাইল বা অন্য ব্রাউজার থেকে ব্যাকআপ ফাইল নির্বাচন করুন।</p>
            <label style={{
              display: 'block', background: '#2563eb', color: '#fff', padding: '8px 14px', borderRadius: '6px',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer', width: '100%', boxSizing: 'border-box'
            }}>
              📂 ফাইল নির্বাচন করুন
              <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
          💡 <b>টিপস:</b> আপনি যদি আগে <code>file://</code> মোডে কোনো রেজাল্ট বা ডাটা ইনপুট দিয়ে থাকেন, তাহলে আগের ফাইল থেকে ব্যাকআপ ডাউনলোড করে এখানে রিস্টোর করলে এক সেকেন্ডেই সমস্ত তথ্য চলে আসবে।
        </div>
      </div>
    </div>
  );
}
