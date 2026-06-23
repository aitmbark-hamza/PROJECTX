import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Star, ThumbsUp, Award, Truck, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { slideFromRight } from '../../../animations/variants';
import styles from './GoogleReviews.module.css';

const icons = [Star, ThumbsUp, Award, Truck];

export default function GoogleReviews() {
  const { t } = useTranslation();
  const reviews = t('reviews.items', { returnObjects: true });
  const stats = t('reviews.stats', { returnObjects: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const [displayRating, setDisplayRating] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const carouselRef = useRef(null);
  const constraintsRef = useRef(null);

  const itemsPerView = 3;
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const maxIndex = Math.max(0, reviewsArray.length - itemsPerView);

  const targetRating = 5.0;
  const targetCount = 3;

  useEffect(() => {
    if (displayRating < targetRating) {
      const timer = setTimeout(() => {
        setDisplayRating((prev) => Math.min(prev + 0.1, targetRating));
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [displayRating]);

  useEffect(() => {
    if (displayCount < targetCount) {
      const timer = setTimeout(() => {
        setDisplayCount((prev) => Math.min(prev + 1, targetCount));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [displayCount]);

  const goNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setDirection(1);
      setCurrentIndex(0);
    }
  }, [currentIndex, maxIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    } else {
      setDirection(-1);
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  const renderStars = (count, size = 14) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        className={`${styles.star} ${i < count ? styles.starFilled : styles.starEmpty}`}
      />
    ));
  };

  const visibleReviews = [];
  for (let i = 0; i < itemsPerView; i++) {
    const idx = (currentIndex + i) % reviews.length;
    visibleReviews.push(reviews[idx]);
  }

  return (
    <section className={styles.section} id="avis">
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <motion.div
        className={styles.container}
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className={styles.badgeGoogle}>
            <svg className={styles.googleIconSmall} viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className={styles.badgeText}>{t('reviews.badge')}</span>
          </div>

          <div className={styles.titleRow}>
            <h2 className={styles.titleFr}>{t('reviews.title')}</h2>
            <span className={styles.titleAr}>{t('reviews.titleAr')}</span>
          </div>

          <div className={styles.ratingRow}>
            <div className={styles.ratingBig}>
              <span className={styles.ratingNumber}>{displayRating.toFixed(1)}</span>
              <div className={styles.ratingStars}>
                <div className={styles.starsRow}>{renderStars(5, 22)}</div>
                <span className={styles.totalReviews}>
                  {t('reviews.basedOn', { count: displayCount })}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.trustBanner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className={styles.trustIcon}>✦</span>
          {t('reviews.trustBanner')}
        </motion.div>

        <div className={styles.carouselWrapper} ref={constraintsRef}>
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={goPrev} aria-label={t('reviews.previous')}>
            <ChevronLeft size={20} />
          </button>

          <div className={styles.carousel} ref={carouselRef}>
            <AnimatePresence mode="popLayout" custom={direction}>
              {visibleReviews.map((review, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}`}
                  className={styles.card}
                  layout
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.08 }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <div className={styles.cardGlow} />
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                      {review.initials}
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardName}>{review.name}</span>
                      <span className={styles.cardDate}>{review.date}</span>
                    </div>
                  </div>
                  <div className={styles.cardStars}>
                    {renderStars(review.rating, 12)}
                  </div>
                  <p className={styles.cardText}>"{review.text}"</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={goNext} aria-label={t('reviews.next')}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.dots}>
          {Array.from({ length: Math.min(maxIndex + 1, 6) }, (_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex % (maxIndex + 1) ? styles.dotActive : ''}`}
              onClick={() => { setDirection(1); setCurrentIndex(i); }}
              aria-label={t('reviews.goTo', { index: i + 1 })}
            />
          ))}
        </div>

        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {Array.isArray(stats) && stats.map((stat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <Icon size={20} className={styles.statIcon} />
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.a
          href="https://maps.app.goo.gl/FKzHbuFLAAgJMnP7A"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.googleBtn}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className={styles.googleBtnIcon} viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {t('reviews.cta')}
          <ExternalLink size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
}
