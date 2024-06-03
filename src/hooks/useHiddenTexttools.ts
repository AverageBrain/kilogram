import { useEffect, useState } from 'react';

export const useHiddenTexttools = () => {
  const [isToolbarHidden, setIsToolbarHidden] = useState(() => {
    const storedValue = localStorage.getItem('isToolbarHidden');
    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return true;
  });

  useEffect(() => {
    if (isToolbarHidden === undefined) return;
    localStorage.setItem('isToolbarHidden', JSON.stringify(isToolbarHidden));
  }, [isToolbarHidden]);

  return { isToolbarHidden, setIsToolbarHidden };
};
