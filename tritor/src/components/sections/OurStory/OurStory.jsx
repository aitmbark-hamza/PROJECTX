import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './OurStory.module.css';

function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className={styles.statCard}>
      <div className={styles.statNumber}>
        {count}
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.divider} />
    </div>
  );
}

export default function OurStory() {
  const { t } = useTranslation();
  const timeline = t('ourStory.timeline', { returnObjects: true });
  const stats = t('ourStory.stats', { returnObjects: true });

  return (
    <section className={styles.section} id="our-story">
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">{t('ourStory.eyebrow')}</span>
            <h2 className="section-title">{t('ourStory.title')}</h2>
            <p className={styles.subtitle}>{t('ourStory.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.contentGrid}>
          <ScrollReveal direction="left" className={styles.timeline}>
            <div className={styles.timelineLine} />
            {Array.isArray(timeline) && timeline.map((item, i) => (
              <motion.div
                key={i}
                className={styles.timelineCard}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className={styles.cardIcon}>{item.icon}</span>
                {item.year && <span className={styles.cardYear}>{item.year}</span>}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.text}</p>
              </motion.div>
            ))}
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <img
                src="/images/gallery-4.webp"
                alt={t('ourStory.imageAlt')}
                className={styles.image}
                loading="lazy"
                width="600"
                height="750"
              />
              <div className={styles.imageOverlay} />
              <div className={styles.imageFrame} />
            </div>
          </ScrollReveal>
        </div>

        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {Array.isArray(stats) && stats.map((stat, i) => (
            <AnimatedStat key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
