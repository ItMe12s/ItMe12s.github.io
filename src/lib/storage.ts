export function readJson<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ponytail: localStorage blocked */ }
}

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch { /* ponytail: localStorage blocked */ }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch { /* ponytail: localStorage blocked */ }
}
