import { useState, useEffect } from 'react';
import type { RefObject } from 'react';
/**
 * useResizeObserver - Hook React para observar o tamanho de um elemento DOM.
 *
 * Exemplo de uso:
 *   const ref = useRef(null);
 *   const size = useResizeObserver(ref);
 *   // size = { width, height }
 *
 *   <div ref={ref}> ... </div>
 *
 * @param ref - Referência React para um elemento DOM
 * @returns { width: number, height: number } Objeto com largura e altura atuais do elemento
 */
export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T>
): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };
    updateSize();
    const observer = new window.ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
