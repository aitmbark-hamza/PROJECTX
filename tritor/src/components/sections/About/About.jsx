import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import GoldLine from '../../ui/GoldLine/GoldLine';
import Button from '../../ui/Button/Button';
import { useParallax } from '../../../hooks/useParallax';
import { slideFromLeft } from '../../../animations/variants';
import styles from './About.module.css';

export default function About() {
  const { t } = useTranslation();
  const [imageRef, offsetY] = useParallax(0.12);
  const values = t('about.values', { returnObjects: true });

  return (
    <section className={styles.about} id="about">
      <div className={styles.sectionBg} />
      <div className={styles.sectionBgOverlay} />

      <motion.div
        className={`${styles.container} section-container`}
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className={styles.grid}>
          
          <ScrollReveal direction="left" className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <div 
                ref={imageRef} 
                className={styles.imageInner}
                style={{ transform: `translateY(${offsetY}px) scale(1.12)` }}
              >
                <img 
                  src="/images/gallery-25.jpg" 
                  alt={t('about.imageAlt')}
                  className={styles.actualImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.minimalFrame} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} className={styles.content}>
            <span className="section-eyebrow">{t('about.eyebrow')}</span>
            <h2 className="section-title">{t('about.title')}</h2>

            <div className={styles.text}>
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
            </div>

            <h3 className={styles.valuesTitle}>{t('about.valuesTitle')}</h3>
            <div className={styles.values}>
              {Array.isArray(values) && values.map((value) => (
                <div key={value} className={styles.valueItem}>
                  <span className={styles.valueDot} />
                  <span className={styles.valueLabel}>{value}</span>
                </div>
              ))}
            </div>

            <GoldLine width="48px" />

            <div className={styles.footerRow}>
              <div className={styles.signature}>{t('about.signature')}</div>
              <Button variant="outline" href="#gallery">
                {t('about.cta')}
              </Button>
            </div>
          </ScrollReveal>

        </div>
      </motion.div>
    </section>
  );
}