import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import GoldLine from '../../ui/GoldLine/GoldLine';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} section-container`}>
        <div className={styles.grid}>
          <ScrollReveal direction="up" delay={0}>
            <div className={styles.brand}>
              <img src="/images/LOGO.png" alt="La Table de la Cantine" className={styles.logo} />
              <p className={styles.tagline}>
                La Table de la Cantine est spécialisée dans les prestations traiteur et l'organisation d'événements à Casablanca. Nous mettons notre passion et notre expertise au service de vos plus beaux moments.
              </p>
              <div className={styles.social}>
                <a href="https://instagram.com/mohcine_tazi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <MapPin size={14} className={styles.contactIcon} />
                  <span>1er Étage, 36 Bd du Nil, Casablanca 20250</span>
                </li>
                <li className={styles.contactItem}>
                  <Phone size={14} className={styles.contactIcon} />
                  <span>06 50 46 09 50</span>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={14} className={styles.contactIcon} />
                  <span>latabledor5@gmail.com</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Liens Rapides</h4>
              <ul className={styles.linkList}>
                <li><a href="#hero" className={styles.footerLink}>Accueil</a></li>
                <li><a href="#services" className={styles.footerLink}>Services</a></li>
                <li><a href="#about" className={styles.footerLink}>À Propos</a></li>
                <li><a href="#gallery" className={styles.footerLink}>Galerie</a></li>
                <li><a href="#contact" className={styles.footerLink}>Contact</a></li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li><a href="#services" className={styles.footerLink}>Mariages</a></li>
                <li><a href="#services" className={styles.footerLink}>Fiançailles</a></li>
                <li><a href="#services" className={styles.footerLink}>Cocktails Dînatoires</a></li>
                <li><a href="#services" className={styles.footerLink}>Buffets</a></li>
                <li><a href="#services" className={styles.footerLink}>Organisation des Soirées</a></li>
                <li><a href="#services" className={styles.footerLink}>Événements Privés et Professionnels</a></li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <GoldLine width="100%" height="1px" className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} La Table de la Cantine. Tous droits réservés.
          </p>
          <p className={styles.credit}>
            Fait avec passion à Casablanca
          </p>
        </div>
      </div>
    </footer>
  );
}
