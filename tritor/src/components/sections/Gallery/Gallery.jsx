import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import { slideFromLeft } from '../../../animations/variants';
import styles from './Gallery.module.css';

export default function Gallery() {
  const { t } = useTranslation();
  const categories = t('gallery.categories', { returnObjects: true });
  const defaultCat = Array.isArray(categories) ? categories[0] : 'Tout';
  const rawItems = t('gallery.items', { returnObjects: true });
  
  const aspects = ['4/3'];
  const galleryFileNumbers = [4, 5, 6, 10, 14, 15, 17, 18, 25, 26, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55];
  const galleryItems = Array.isArray(rawItems)
    ? rawItems.map((item, i) => ({
        ...item,
        src: `/images/gallery-${galleryFileNumbers[i] || (i + 1)}.webp`,
        aspect: aspects[i % aspects.length],
      }))
    : [];

  const [activeCategory, setActiveCategory] = useState(defaultCat);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = Array.isArray(galleryItems)
    ? activeCategory === defaultCat
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)
    : [];

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (!filteredItems.length) return;
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    if (!filteredItems.length) return;
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  // Handle Swipe Gesture for Mobile
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      goNext();
    } else if (info.offset.x > swipeThreshold) {
      goPrev();
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section className={styles.gallery} id="gallery">
      <motion.div
        className={`${styles.container} section-container`}
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">{t('gallery.eyebrow')}</span>
            <h2 className="section-title">{t('gallery.title')}</h2>
            <p className={styles.description}>{t('gallery.description')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className={styles.filters}>
            {Array.isArray(categories) && categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filter} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.title + i}
                className={styles.item}
                style={{
                  aspectRatio: item.aspect || '1/1',
                  backgroundImage: `url(${item.src})`,
                }}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(i)}
              >
                <div className={styles.itemOverlay}>
                  <div className={styles.itemContent}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <span className={styles.itemView}>{t('gallery.view')} &rarr;</span>
                  </div>
                </div>
                <div className={styles.itemDecoration}>
                  <span className={styles.itemTitle}>{item.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label={t('gallery.close')}>
              <X size={22} />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label={t('gallery.previous')}>
                  <ChevronLeft size={28} />
                </button>
                <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label={t('gallery.next')}>
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <motion.div
              className={styles.lightboxContent}
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
            >
              <div
                className={styles.lightboxImage}
                style={{ backgroundImage: `url(${filteredItems[lightboxIndex].src})` }}
              >
                <div className={styles.lightboxPlaceholder}>
                  <span className={styles.lightboxLabel}>{filteredItems[lightboxIndex].title}</span>
                  <span className={styles.lightboxCategory}>{filteredItems[lightboxIndex].category}</span>
                </div>
              </div>
            </motion.div>

            <div className={styles.lightboxCounter}>
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}