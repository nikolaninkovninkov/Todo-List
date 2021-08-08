import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue != null) return JSON.parse(localStorageValue);
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
