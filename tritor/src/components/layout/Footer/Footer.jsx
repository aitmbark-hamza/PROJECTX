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
              <h3 className={styles.logo}>TRITOR</h3>
              <p className={styles.tagline}>
                Où les moments deviennent légendaires
              </p>
              <div className={styles.social}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
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
                  <span>12 Boulevard Zerktouni, Casablanca 20100</span>
                </li>
                <li className={styles.contactItem}>
                  <Phone size={14} className={styles.contactIcon} />
                  <span>+212 6 00 00 00 00</span>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={14} className={styles.contactIcon} />
                  <span>contact@tritor.ma</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li><a href="#services" className={styles.footerLink}>Mariages</a></li>
                <li><a href="#services" className={styles.footerLink}>Fiançailles</a></li>
                <li><a href="#services" className={styles.footerLink}>Dîners Cocktails</a></li>
                <li><a href="#services" className={styles.footerLink}>Buffets de Luxe</a></li>
                <li><a href="#services" className={styles.footerLink}>Événements Corporate</a></li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>Horaires</h4>
              <ul className={styles.hoursList}>
                <li className={styles.hoursItem}>
                  <span className={styles.hoursDay}>Lun–Sam</span>
                  <span className={styles.hoursTime}>9h – 19h</span>
                </li>
                <li className={styles.hoursItem}>
                  <span className={styles.hoursDay}>Dimanche</span>
                  <span className={styles.hoursTime}>Sur RDV</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <GoldLine width="100%" height="1px" className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Tritor. Tous droits réservés.
          </p>
          <p className={styles.credit}>
            Design &amp; Création par Tritor
          </p>
        </div>
      </div>
    </footer>
  );
}
