import { useState, useCallback } from 'react';

export default function useInput(initialValue = null) {
  const [value, setValue] = useState(initialValue);
  const setter = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value],
  );
  const reset = useCallback(
    () => {
      setValue(initialValue);
    },
    [value],
  );
  return [value, setter, reset];
}
