// Supabase Client & Real-time Cloud Sync Engine for Magra School Management ERP V118

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

// Push a single key to Supabase app_sync_store
let syncDebounceTimers = {};
export function pushKeyToCloud(key, value) {
  const { isConfigured, autoSync } = getSupabaseConfig();
  if (!isConfigured || !autoSync) return;

  // Never push empty array over populated cloud data
  if (Array.isArray(value) && value.length === 0 && (key === 'magra_finance_fees' || key === 'magra_finance_deposits')) {
    return;
  }

  if (syncDebounceTimers[key]) clearTimeout(syncDebounceTimers[key]);
  syncDebounceTimers[key] = setTimeout(async () => {
    try {
      let payload = value;
      if (typeof payload === 'string') {
        try { payload = JSON.parse(payload); } catch {}
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
  }, 400);
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
        const valStr = typeof r.value === 'string' ? r.value : JSON.stringify(r.value);
        const cur = localStorage.getItem(r.key);
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
      try { parsed = JSON.parse(raw); } catch {}
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
      } catch (e) {}
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
    } catch {}
  }, 10000);

  // 3. Listen to page focus or visibility change
  window.addEventListener('focus', () => {
    pullAllFromCloud().catch(() => {});
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      pullAllFromCloud().catch(() => {});
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
