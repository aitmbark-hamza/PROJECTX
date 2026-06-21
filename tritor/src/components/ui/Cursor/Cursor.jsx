import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Cursor.module.css';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, input, textarea, select, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button, input, textarea, select, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className={styles.dot}
        style={{ left: cursorX, top: cursorY }}
        animate={{
          scale: isHovering ? 0.667 : 1,
          background: isHovering ? 'var(--color-gold-light)' : 'var(--color-gold)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.ring}
        style={{ left: ringXSpring, top: ringYSpring }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          borderColor: isHovering ? 'var(--color-gold)' : 'rgba(201, 168, 76, 0.4)',
          background: isHovering ? 'rgba(201, 168, 76, 0.05)' : 'transparent',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </>
  );
}
