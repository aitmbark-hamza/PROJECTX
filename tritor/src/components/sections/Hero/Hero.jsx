import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../ui/Button/Button';
import styles from './Hero.module.css';

const bgImages = [
  { src: '/images/hero-1.jpg',  },
  { src: '/images/hero-2.jpg', },
  { src: '/images/hero-3.jpg',  },
];

const titleLines = [
  { text: "L'Art de", italic: true, gold: false },
  { text: 'Créer des', italic: false, gold: false },
  { text: 'Moments', italic: false, gold: true },
];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const eyebrowVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
    },
  };

  const titleLineVariants = {
    hidden: { clipPath: 'inset(100% 0 0 0)', y: 40 },
    visible: (i) => ({
      clipPath: 'inset(0 0 0 0)',
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.4 + i * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const indicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.4, duration: 0.6 },
    },
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.background}>
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            className={styles.bgSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ backgroundImage: `url(${bgImages[bgIndex].src})` }}
          />
        </AnimatePresence>
        <div className={styles.bgOverlay} style={{ background: `linear-gradient(180deg, transparent 0%, ${bgImages[bgIndex].overlay} 50%, rgba(8,8,8,0.95) 100%)` }} />
        <div className={styles.bgParticles} />
        <div className={styles.bgIndicator}>
          {bgImages.map((_, i) => (
            <button
              key={i}
              className={`${styles.bgDot} ${i === bgIndex ? styles.bgDotActive : ''}`}
              onClick={() => setBgIndex(i)}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.eyebrow} variants={eyebrowVariants}>
            EST. 2024 · CASABLANCA, MAROC
          </motion.span>

          <h1 className={styles.title}>
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                className={`${styles.titleLine} ${line.italic ? styles.titleItalic : ''} ${line.gold ? styles.titleGold : ''}`}
                custom={i}
                variants={titleLineVariants}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p className={styles.subtitle} variants={subtitleVariants}>
            Chaque événement est une œuvre unique, conçue pour transcender l'ordinaire.
          </motion.p>

          <motion.div className={styles.ctas} variants={ctaVariants}>
            <Button variant="primary" href="#booking">
              Demander un Devis
            </Button>
            <Button variant="outline" href="#services">
              Découvrir
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className={styles.scrollIndicator} variants={indicatorVariants}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </motion.div>

      <div className={styles.socialSide}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <div className={styles.socialLine} />
      </div>
    </section>
  );
}
