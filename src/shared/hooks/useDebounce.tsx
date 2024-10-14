import { useEffect, useState } from "react";

export const useDebounce = (value: string, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value ?? "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, ms]);

  return debouncedValue;
};
