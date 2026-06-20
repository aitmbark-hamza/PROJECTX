import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import { slideFromRight, staggerContainer, cardVariants } from '../../../animations/variants';
import styles from './WhyChooseUs.module.css';

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const reasons = t('whyChooseUs.reasons', { returnObjects: true });

  return (
    <section className={styles.section} id="why-us">
      <motion.div
        className={styles.container}
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">{t('whyChooseUs.eyebrow')}</span>
            <h2 className="section-title">{t('whyChooseUs.title')}</h2>
          </div>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {Array.isArray(reasons) && reasons.map((reason, i) => (
            <ScrollReveal key={reason} direction="up" delay={i * 0.1}>
              <motion.div
                className={styles.card}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <CheckCircle2 size={24} className={styles.icon} />
                <span className={styles.text}>{reason}</span>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
