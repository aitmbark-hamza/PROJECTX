import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: 'Tritor a transformé notre mariage en un conte de fées. Chaque invité a été émerveillé par le raffinement des moindres détails.',
    author: 'Leila & Karim',
    event: 'Mariage',
  },
  {
    quote: 'Un professionnalisme rare, une créativité sans limite. Notre gala a dépassé toutes nos attentes.',
    author: 'Directeur Marketing',
    event: 'Royal Air Maroc',
  },
  {
    quote: 'Une équipe d\'une sensibilité exceptionnelle. Ils ont su capturer l\'essence de notre histoire dans chaque élément.',
    author: 'Nadia B.',
    event: 'Fiançailles',
  },
  {
    quote: 'Nos invités en parlent encore six mois après. Une expérience qui a marqué les esprits et les cœurs.',
    author: 'Ahmed R.',
    event: 'Gala Corporatif',
  },
  {
    quote: 'L\'excellence à chaque instant. Tritor ne fait pas que organiser des événements, ils créent des légendes.',
    author: 'Sara & Mehdi',
    event: 'Mariage',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goTo = (index) => setCurrent(index);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  return (
    <section
      className={styles.testimonials}
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`${styles.container} section-container`}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">Témoignages</span>
            <h2 className="section-title">Ce Que Nos Clients Disent</h2>
          </div>
        </ScrollReveal>

        <div className={styles.carousel}>
          <button className={styles.navButton} onClick={goPrev} aria-label="Précédent">
            <ChevronLeft size={20} />
          </button>

          <div className={styles.slideContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.slide}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={styles.quoteIcon}>
                  <Quote size={48} />
                </div>
                <blockquote className={styles.quote}>
                  "{testimonials[current].quote}"
                </blockquote>
                <div className={styles.author}>
                  <span className={styles.authorName}>{testimonials[current].author}</span>
                  <span className={styles.authorEvent}>{testimonials[current].event}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={styles.navButton} onClick={goNext} aria-label="Suivant">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
