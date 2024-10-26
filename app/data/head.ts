import { useState } from "react";
import store from "store";


const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    try {
      const item = store.get(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const setValue = (value: string) => {
    try {
      const valueToStore =JSON.stringify(value);
      setStoredValue(valueToStore);
      store.set(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(null);
      store.remove(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { storedValue, setValue, removeValue };
};

export default useLocalStorage;
