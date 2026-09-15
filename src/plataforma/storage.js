export const STORAGE_KEY = "kambelleh-data-v4";

export const hasClaudeStorage = () =>
  typeof window.storage !== "undefined" &&
  window.storage &&
  typeof window.storage.get === "function";

export function testLocalStorage() {
  try {
    const k = "__kambelleh_test__";
    localStorage.setItem(k, "1");
    const ok = localStorage.getItem(k) === "1";
    localStorage.removeItem(k);
    return ok;
  } catch (e) {
    return false;
  }
}

export async function storageGet() {
  let raw = null;
  if (hasClaudeStorage()) {
    try {
      const res = await window.storage.get(STORAGE_KEY, true);
      raw = res ? res.value : null;
    } catch (e) {
      /* ignore */
    }
  }
  if (!raw) {
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
  }
  return raw;
}

export async function storageSet(value) {
  let ok = false;
  if (hasClaudeStorage()) {
    try {
      await window.storage.set(STORAGE_KEY, value, true);
      ok = true;
    } catch (e) {
      /* fall through */
    }
  }
  try {
    localStorage.setItem(STORAGE_KEY, value);
    ok = true;
  } catch (e) {
    /* ignore */
  }
  return ok;
}
