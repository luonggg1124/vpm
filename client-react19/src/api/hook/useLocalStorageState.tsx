import { useState } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(JSON.stringify(stored)) : defaultValue;
  });

  const setLocalStorageState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return {
    state, setLocalStorageState
  } as const;
}
