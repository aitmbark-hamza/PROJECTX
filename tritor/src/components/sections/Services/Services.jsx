import { motion } from 'framer-motion';
import { Sparkles, Heart, Diamond, Wine, UtensilsCrossed, Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import { slideFromRight } from '../../../animations/variants';
import styles from './Services.module.css';

const icons = [Sparkles, Heart, Diamond, Wine, UtensilsCrossed, Calendar];

export default function Services() {
  const { t } = useTranslation();
  const services = t('services.items', { returnObjects: true });

  return (
    <section className={styles.services} id="services">
      <div className={styles.videoWrapper}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.bgVideo}
          src="/images/luxury-ambient.mp4" 
        />
        <div className={styles.videoOverlay} />
      </div>

      <motion.div
        className={`${styles.contentWrapper} section-container`}
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">{t('services.eyebrow')}</span>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {Array.isArray(services) && services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <ScrollReveal key={service.title} direction="up" delay={i * 0.1}>
                <motion.div
                  className={styles.card}
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className={styles.cardIcon}>
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <span className={styles.cardCategory}>{service.category}</span>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                  <a href="#booking" className={styles.cardLink}>
                    {t('services.learnMore')} <ArrowRight size={14} />
                  </a>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}