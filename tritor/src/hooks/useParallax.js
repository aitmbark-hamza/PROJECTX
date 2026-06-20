import { useEffect, useRef, useState } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Read position once to avoid forced reflow on every scroll frame
    const rect = element.getBoundingClientRect();
    const initialTop = rect.top + window.scrollY;
    const elementHeight = rect.height;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const elementCenter = initialTop - scrollY + elementHeight / 2;
        const screenCenter = windowHeight / 2;
        const distance = (elementCenter - screenCenter) / windowHeight;
        setOffsetY(distance * speed * 100);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return [ref, offsetY];
}
