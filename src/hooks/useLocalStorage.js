import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            const value = item ? JSON.parse(item) : initialValue;
            return typeof value === 'function' ? value() : value;
        } catch (error) {
            console.error(error);
            const value = initialValue;
            return typeof value === 'function' ? value() : value;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
