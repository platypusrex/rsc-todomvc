import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: (e: MouseEvent) => void) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target;
      if (ref.current && target && !ref.current.contains(target as Node)) {
        callback(e);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line
  }, [ref]);

  return ref;
};
