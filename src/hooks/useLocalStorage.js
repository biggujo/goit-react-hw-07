import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useLocalStorage = (key, defaultData) => {
  const [data, setData] = useState(() => {
    try {
      const stringifiedData = window.localStorage.getItem(key);

      const parsedData = JSON.parse(stringifiedData);

      return parsedData ?? defaultData;
    } catch {
      toast.error(`Error reading "${key}" from the local storage`);

      return defaultData;
    }
  });

  useEffect(() => {
    try {
      const stringifiedData = JSON.stringify(data);

      window.localStorage.setItem(key, stringifiedData);
    } catch {
      toast.error(`Error writing "${key}" to the local storage`);
    }
  }, [data, key]);

  return [data, setData];
};
