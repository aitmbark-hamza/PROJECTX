import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import GoldLine from '../../ui/GoldLine/GoldLine';
import Button from '../../ui/Button/Button';
import { useParallax } from '../../../hooks/useParallax';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { useCountUp } from '../../../hooks/useCountUp';
import styles from './About.module.css';

const statsData = [
  { number: '150+', label: 'Événements' },
  { number: '8', label: 'Ans d\'Expérience' },
  { number: '98%', label: 'Clients Satisfaits' },
];

function StatItem({ stat }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
  const count = useCountUp(stat.number, isVisible);
  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statNumber}>{count}</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function About() {
  const [imageRef, offsetY] = useParallax(0.12);

  return (
    <section className={styles.about} id="about">
      {/* Premium background image layout layer */}
      <div className={styles.sectionBg} />
      <div className={styles.sectionBgOverlay} />

      <div className={`${styles.container} section-container`}>
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
            <span className="section-eyebrow">Notre Histoire</span>
            <h2 className="section-title">L'Excellence comme Philosophie</h2>

            <div className={styles.text}>
              <p>
                Depuis notre création, Tritor incarne une vision unique de l'événementiel —
                où chaque détail est pensé, chaque émotion anticipée, chaque instant
                préservé comme une œuvre d'art.
              </p>
              <p>
                Nous ne concevons pas des événements. Nous créons des expériences qui
                transcendent l'ordinaire, des moments qui deviennent légendaires.
                Notre exigence est simple : faire de chaque rassemblement un souvenir
                impérissable.
              </p>
            </div>

            <div className={styles.stats}>
              {statsData.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </div>

            <GoldLine width="48px" />

            <div className={styles.footerRow}>
              <div className={styles.signature}>Tritor</div>
              <Button variant="outline" href="#gallery">
                Découvrir Notre Univers
              </Button>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}