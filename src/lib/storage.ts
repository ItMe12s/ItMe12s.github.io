// localStorage can throw (private mode, blocked site data), so every access falls back quietly.
function attempt<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function readStorage(key: string): string | null {
  return attempt(() => localStorage.getItem(key), null);
}

export function writeStorage(key: string, value: string): void {
  attempt(() => localStorage.setItem(key, value), undefined);
}

export function removeStorage(key: string): void {
  attempt(() => localStorage.removeItem(key), undefined);
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = readStorage(key);
  return raw === null ? fallback : attempt(() => JSON.parse(raw) as T, fallback);
}

export function writeJson(key: string, value: unknown): void {
  writeStorage(key, JSON.stringify(value));
}
