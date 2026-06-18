import { motion } from 'framer-motion';
import { Heart, Diamond, Wine, UtensilsCrossed, Building2, ArrowRight } from 'lucide-react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './Services.module.css';

const services = [
  {
    icon: Heart,
    title: 'Mariages',
    description: 'Célébrez votre union avec raffinement absolu, dans des lieux d\'exception.',
    category: 'Cérémonie',
  },
  {
    icon: Diamond,
    title: 'Fianiailles',
    description: 'Une déclaration inoubliable, sublimée par une mise en scène unique.',
    category: 'Célébration',
  },
  {
    icon: Wine,
    title: 'Dîners Cocktails',
    description: 'L\'élégance liquide d\'une soirée parfaite, entre saveurs et lumière.',
    category: 'Réception',
  },
  {
    icon: UtensilsCrossed,
    title: 'Buffets de Luxe',
    description: 'Gastronomie et mise en scène d\'exception pour vos convives.',
    category: 'Restoration',
  },
  {
    icon: Building2,
    title: 'Événements Corp.',
    description: 'Impressionnez, fédérez, inspirez — des événements à votre image.',
    category: 'Professionnel',
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

      <div className={`${styles.contentWrapper} section-container`}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">Notre Savoir-Faire</span>
            <h2 className="section-title">Des Prestations d'Exception</h2>
            <p className="section-subtitle">
              Chaque service est conçu sur mesure, alliant créativité, rigueur et une
              attention infinie aux détails les plus subtils.
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
      </div>
    </section>
  );
}