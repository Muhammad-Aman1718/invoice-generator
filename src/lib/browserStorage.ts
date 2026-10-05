// Storage can throw (private mode, quota exceeded, blocked cookies); failures
// are logged and treated as "nothing stored" so the UI keeps working.

export function readStorage(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch (error) {
    console.warn(`[storage] could not read "${key}":`, error);
    return null;
  }
}

export function writeStorage(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch (error) {
    console.warn(`[storage] could not write "${key}":`, error);
  }
}

export function removeStorage(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.warn(`[storage] could not remove "${key}":`, error);
  }
}
