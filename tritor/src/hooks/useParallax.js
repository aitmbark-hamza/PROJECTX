import { useEffect, useRef, useState } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = windowHeight / 2;
      const distance = (elementCenter - screenCenter) / windowHeight;
      setOffsetY(distance * speed * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offsetY];
}
