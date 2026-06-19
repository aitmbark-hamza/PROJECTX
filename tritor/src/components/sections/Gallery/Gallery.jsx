import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import { slideFromLeft } from '../../../animations/variants';
import styles from './Gallery.module.css';

const categories = ['Tout', 'Buffets', 'Cocktails', 'Événements'];

const galleryItems = [
  { id: 1, src: '/images/gallery-1.jpg', category: 'Buffets', title: 'Buffet de Réception', aspect: '3/4' },
  { id: 2, src: '/images/gallery-2.jpg', category: 'Cocktails', title: 'Cocktail DINatoire', aspect: '1/1' },
  { id: 3, src: '/images/gallery-3.jpg', category: 'Événements', title: "Gala d'Entreprise", aspect: '4/3' },
  { id: 4, src: '/images/gallery-4.jpg', category: 'Buffets', title: 'Buffet de Luxe', aspect: '3/4' },
  { id: 5, src: '/images/gallery-5.jpg', category: 'Cocktails', title: 'Soirée Cocktail', aspect: '1/1' },
  { id: 6, src: '/images/gallery-6.jpg', category: 'Événements', title: "Séminaire d'Entreprise", aspect: '4/3' },
  { id: 7, src: '/images/gallery-7.jpg', category: 'Buffets', title: 'Buffet de Mariage', aspect: '3/4' },
  { id: 8, src: '/images/gallery-8.jpg', category: 'Cocktails', title: 'Bar à Cocktails', aspect: '1/1' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'Tout'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

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

  const getItemStyle = (aspect) => {
    switch (aspect) {
      case '3/4': return { aspectRatio: '3/4' };
      case '1/1': return { aspectRatio: '1/1' };
      case '4/3': return { aspectRatio: '4/3' };
      default: return { aspectRatio: '1/1' };
    }
  };

  return (
    <section className={styles.gallery} id="gallery">
      <motion.div
        className={`${styles.container} section-container`}
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">Notre Portfolio</span>
            <h2 className="section-title">Nos Réalisations</h2>
            <p className={styles.description}>
              Découvrez en images quelques-unes de nos créations et événements réalisés avec passion et savoir-faire.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className={styles.filters}>
            {categories.map((cat) => (
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
                key={item.id}
                className={styles.item}
                style={{
                  ...getItemStyle(item.aspect),
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
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
                    <span className={styles.itemView}>Voir &rarr;</span>
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
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Fermer">
              <X size={24} />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Précédent">
                  <ChevronLeft size={32} />
                </button>
                <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Suivant">
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <motion.div
              className={styles.lightboxContent}
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={styles.lightboxImage}
                style={{
                  backgroundImage: `url(${filteredItems[lightboxIndex].src})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
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
