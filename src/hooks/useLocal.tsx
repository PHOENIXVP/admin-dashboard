import { useEffect, useState } from "react";

const useLocal = (key, initValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return initValue;
    return JSON.parse(storedValue);
  });
  useEffect(() => {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};
export default useLocal;
