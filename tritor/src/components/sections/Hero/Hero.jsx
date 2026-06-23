import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button';
import styles from './Hero.module.css';

// Each slide needs an `overlay` color — it feeds the gradient that darkens
// the photo so the title/eyebrow/CTAs stay readable on top of it.
const bgImages = [
  { src: '/images/hero-1.webp', overlay: 'rgba(10, 9, 6, 0.55)' },
  { src: '/images/hero-2.webp', overlay: 'rgba(12, 10, 6, 0.6)' },
  { src: '/images/hero-3.webp', overlay: 'rgba(8, 8, 8, 0.55)' },
];

export default function Hero({ onBookingClick }) {
  const { t } = useTranslation();
  const [bgIndex, setBgIndex] = useState(0);

  const titleLines = [
    { text: t('hero.title1'), italic: true, gold: false },
    { text: t('hero.title2'), italic: false, gold: false },
    { text: t('hero.title3'), italic: false, gold: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const eyebrowVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 },
    },
  };

  const titleLineVariants = {
    hidden: { clipPath: 'inset(100% 0 0 0)', y: 40 },
    visible: (i) => ({
      clipPath: 'inset(0 0 0 0)',
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const indicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.4 },
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
              aria-label={t('hero.imageLabel', { index: i + 1 })}
            />
          ))}
        </div>
      </div>

      <div className={styles.logoWatermark}>
        <img src="/images/LOGO.webp" alt="" aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.eyebrow} variants={eyebrowVariants}>
            {t('hero.eyebrow')}
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
            {t('hero.subtitle')}
          </motion.p>
          <motion.p className={styles.description} variants={subtitleVariants}>
            {t('hero.description')}
          </motion.p>

          <motion.div className={styles.ctas} variants={ctaVariants}>
            <Button variant="primary" onClick={onBookingClick}>
              {t('hero.ctaPrimary')}
            </Button>
            <Button variant="outline" href="#contact">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}