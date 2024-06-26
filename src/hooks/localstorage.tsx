import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: any): [any, (value: any) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error: any) {
      console.error('Failed to retrieve value from local storage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error: any) {
      console.error('Failed to save value to local storage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};