import { motion } from 'framer-motion';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import GoldLine from '../../ui/GoldLine/GoldLine';
import Button from '../../ui/Button/Button';
import { useParallax } from '../../../hooks/useParallax';
import { slideFromLeft } from '../../../animations/variants';
import styles from './About.module.css';

const values = [
  'Excellence',
  'Produits frais et de qualité',
  'Service personnalisé',
  'Professionnalisme',
  'Respect des délais',
  'Satisfaction client',
];

export default function About() {
  const [imageRef, offsetY] = useParallax(0.12);

  return (
    <section className={styles.about} id="about">
      {/* Premium background image layout layer */}
      <div className={styles.sectionBg} />
      <div className={styles.sectionBgOverlay} />

      <motion.div
        className={`${styles.container} section-container`}
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
                  alt="Tritor Experience" 
                  className={styles.actualImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.minimalFrame} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} className={styles.content}>
            <span className="section-eyebrow">À Propos</span>
            <h2 className="section-title">Une Passion Pour l'Excellence</h2>

            <div className={styles.text}>
              <p>
                La Table de la Cantine met son savoir-faire au service de vos événements afin d'offrir une
                expérience culinaire unique. Notre équipe veille à chaque détail pour garantir qualité,
                fraîcheur et satisfaction.
              </p>
              <p>
                Grâce à notre expérience et à notre engagement, nous proposons des prestations personnalisées
                répondant aux exigences des particuliers comme des professionnels.
              </p>
            </div>

            <h3 className={styles.valuesTitle}>Nos Valeurs</h3>
            <div className={styles.values}>
              {values.map((value) => (
                <div key={value} className={styles.valueItem}>
                  <span className={styles.valueDot} />
                  <span className={styles.valueLabel}>{value}</span>
                </div>
              ))}
            </div>

            <GoldLine width="48px" />

            <div className={styles.footerRow}>
              <div className={styles.signature}>La Table de la Cantine</div>
              <Button variant="outline" href="#gallery">
                Découvrir Nos Réalisations
              </Button>
            </div>
          </ScrollReveal>

        </div>
      </motion.div>
    </section>
  );
}