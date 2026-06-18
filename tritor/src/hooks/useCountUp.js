import { useEffect, useState, useRef } from 'react';

export function useCountUp(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  const display = target.includes('+')
    ? `${count}+`
    : target.includes('%')
    ? `${count}%`
    : String(count);

  return display;
}
