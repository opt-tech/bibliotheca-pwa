import { MutableRefObject, useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(null) as MutableRefObject<T>;

  useEffect(() => {
    ref.current = value;
  }, [ref, value]);

  return ref.current;
}
