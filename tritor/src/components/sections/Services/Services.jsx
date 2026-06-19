import { motion } from 'framer-motion';
import { Sparkles, Heart, Diamond, Wine, UtensilsCrossed, Calendar, ArrowRight } from 'lucide-react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import { slideFromRight } from '../../../animations/variants';
import styles from './Services.module.css';

const services = [
  {
    icon: Sparkles,
    title: 'Organisation des Soirées',
    description: 'Création d\'événements élégants et sur mesure pour des moments inoubliables.',
    category: 'Événements',
  },
  {
    icon: Heart,
    title: 'Fêtes de Mariage',
    description: 'Prestations complètes pour célébrer votre mariage avec raffinement et excellence.',
    category: 'Mariage',
  },
  {
    icon: Diamond,
    title: 'Fiançailles',
    description: 'Des réceptions conviviales et élégantes adaptées à vos envies.',
    category: 'Célébration',
  },
  {
    icon: Wine,
    title: 'Cocktail Dînatoire',
    description: 'Une sélection de bouchées et de mets raffinés pour vos réceptions et événements.',
    category: 'Restauration',
  },
  {
    icon: UtensilsCrossed,
    title: 'Buffets',
    description: 'Buffets variés et généreux préparés avec des produits frais et de qualité.',
    category: 'Buffet',
  },
  {
    icon: Calendar,
    title: 'Tous Types d\'Événements',
    description: 'Anniversaires, événements d\'entreprise, réceptions privées et célébrations familiales.',
    category: 'Sur Mesure',
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      {/* Background Video Elements */}
      <div className={styles.videoWrapper}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.bgVideo}
          // Replace with your actual premium background video path
          src="/images/luxury-ambient.mp4" 
        />
        <div className={styles.videoOverlay} />
      </div>

      <motion.div
        className={`${styles.contentWrapper} section-container`}
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">Nos Services</span>
            <h2 className="section-title">Des Prestations sur Mesure</h2>
            <p className="section-subtitle">
              Nous proposons une gamme complète de services traiteur adaptés à tous vos événements, alliant qualité, fraîcheur et professionnalisme.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {services.map((service, i) => {
            const Icon = service.icon;
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
                    En savoir plus <ArrowRight size={14} />
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