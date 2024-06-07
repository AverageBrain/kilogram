import { RefObject, useEffect, useRef } from 'react';

type ReturnValue<T> = {
  ref: RefObject<T>;
  scroll: (offset: number) => void;
};

export const useScroll = <T extends HTMLElement>(): ReturnValue<T> => {
  const ref = useRef<T>(null);
  const mouseCoords = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  function captureClick(e: MouseEvent) {
    e.stopPropagation();
    window.removeEventListener('click', captureClick, true);
  }

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return;
    e.preventDefault();

    const curElem = ref.current;
    const x = e.pageX - curElem.offsetLeft;
    const walkX = x - mouseCoords.current.startX;
    if (Math.abs(walkX) < 3) {
      return;
    }
    curElem.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    // Отлавливание клика по колонкам, если произошла прокрутка
    window.addEventListener('click', captureClick, true);
  };

  const onLeave = (e: MouseEvent) => {
    if (!ref.current) return;
    e.preventDefault();

    document.removeEventListener('pointermove', handleMove);
    document.removeEventListener('pointerup', onLeave);
  };

  const onEnter = (e: MouseEvent) => {
    if (!ref.current) return;

    const curElem = ref.current;
    const startX = e.pageX - curElem.offsetLeft;
    const { scrollLeft } = curElem;

    e.preventDefault();
    mouseCoords.current = { startX, scrollLeft };
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', onLeave);
  };

  const scroll = (offset: number) => {
    if (!ref.current) return;

    const curElem = ref.current;
    curElem.scrollLeft = (curElem.scrollLeft ?? 0) - offset;
  };

  useEffect(() => {
    const el = ref.current;

    if (el) {
      el.addEventListener('pointerdown', onEnter);

      return () => {
        el.removeEventListener('pointerdown', onEnter);
      };
    }
  }, []);

  return { ref, scroll };
};
