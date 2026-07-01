function storageTry<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function readJson<T>(key: string, fallback: T): T {
  return storageTry(
    () => JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)) as T,
    fallback,
  );
}

export function writeJson(key: string, value: unknown): void {
  storageTry(() => localStorage.setItem(key, JSON.stringify(value)), undefined);
}

export function readStorage(key: string): string | null {
  return storageTry(() => localStorage.getItem(key), null);
}

export function writeStorage(key: string, value: string): void {
  storageTry(() => localStorage.setItem(key, value), undefined);
}

export function removeStorage(key: string): void {
  storageTry(() => localStorage.removeItem(key), undefined);
}
