const STORAGE_PREFIX = "theralearn";

function createStorageKey(key: string): string {
  return `${STORAGE_PREFIX}:${key}`;
}

export function saveToStorage<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const storageKey = createStorageKey(key);
    const serializedValue = JSON.stringify(value);

    window.localStorage.setItem(storageKey, serializedValue);

    return true;
  } catch (error) {
    console.error(`Kunne ikke gemme "${key}" i localStorage:`, error);

    return false;
  }
}

export function getFromStorage<T>(
  key: string,
  fallbackValue: T
): T {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const storageKey = createStorageKey(key);
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue === null) {
      return fallbackValue;
    }

    return JSON.parse(storedValue) as T;
  } catch (error) {
    console.error(`Kunne ikke hente "${key}" fra localStorage:`, error);

    return fallbackValue;
  }
}

export function removeFromStorage(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const storageKey = createStorageKey(key);

    window.localStorage.removeItem(storageKey);

    return true;
  } catch (error) {
    console.error(`Kunne ikke fjerne "${key}" fra localStorage:`, error);

    return false;
  }
}

export function clearTheraLearnStorage(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const keysToRemove: string[] = [];

    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);

      if (key?.startsWith(`${STORAGE_PREFIX}:`)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      window.localStorage.removeItem(key);
    });

    return true;
  } catch (error) {
    console.error("Kunne ikke rydde TheraLearn-data:", error);

    return false;
  }
}