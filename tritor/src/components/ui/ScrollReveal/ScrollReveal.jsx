import { motion } from 'framer-motion';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  className = '',
  style = {},
}) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: -distance };
      case 'right': return { opacity: 0, x: distance };
      case 'scale': return { opacity: 0, scale: 0.92 };
      default: return { opacity: 0, y: distance };
    }
  };

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div
        initial={getInitial()}
        animate={
          isVisible
            ? { opacity: 1, y: 0, x: 0, scale: 1 }
            : getInitial()
        }
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
