import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import GoldLine from '../../ui/GoldLine/GoldLine';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const quickLinks = t('footer.links', { returnObjects: true });
  const serviceLinks = t('footer.services', { returnObjects: true });
  const quickHrefs = ['#hero', '#services', '#about', '#gallery', '#contact'];
  const serviceHrefs = ['#services', '#services', '#services', '#services', '#services', '#services'];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} section-container`}>
        <div className={styles.grid}>
          <ScrollReveal direction="up" delay={0}>
            <div className={styles.brand}>
              <img src="/images/LOGO.png" alt={t('footer.logoAlt')} className={styles.logo} />
              <p className={styles.tagline}>{t('footer.tagline')}</p>
              <div className={styles.social}>
                <a href="https://instagram.com/mohcine_tazi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={t('footer.instagram')}>
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
              <h4 className={styles.columnTitle}>{t('footer.contactTitle')}</h4>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <MapPin size={14} className={styles.contactIcon} />
                  <span>{t('footer.address')}</span>
                </li>
                <li className={styles.contactItem}>
                  <Phone size={14} className={styles.contactIcon} />
                  <span>{t('footer.phone')}</span>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={14} className={styles.contactIcon} />
                  <span>{t('footer.email')}</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>{t('footer.linksTitle')}</h4>
              <ul className={styles.linkList}>
                {Array.isArray(quickLinks) && quickLinks.map((link, i) => (
                  <li key={link}>
                    <a href={quickHrefs[i] || '#hero'} className={styles.footerLink}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className={styles.column}>
              <h4 className={styles.columnTitle}>{t('footer.servicesTitle')}</h4>
              <ul className={styles.linkList}>
                {Array.isArray(serviceLinks) && serviceLinks.map((link, i) => (
                  <li key={link}>
                    <a href={serviceHrefs[i] || '#services'} className={styles.footerLink}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <GoldLine width="100%" height="1px" className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className={styles.credit}>
            {t('footer.credit')}
          </p>
        </div>
      </div>
    </footer>
  );
}
