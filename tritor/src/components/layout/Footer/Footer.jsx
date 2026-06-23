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
  const quickHrefs = ['#hero', '#services', '#about', '#our-story', '#gallery', '#contact'];
  const serviceHrefs = ['#services', '#services', '#services', '#services', '#services', '#services'];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} section-container`}>
        <div className={styles.grid}>
          <ScrollReveal direction="up" delay={0}>
            <div className={styles.brand}>
              <img src="/images/LOGO.webp" alt={t('footer.logoAlt')} className={styles.logo} width="70" height="64" loading="lazy" />
              <p className={styles.tagline}>{t('footer.tagline')}</p>
              <div className={styles.social}>
                <a href="https://instagram.com/mohcine_tazi" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} ${styles.socialInstagram}`} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a href="https://wa.me/212650460950" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} ${styles.socialWhatsapp}`} aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.132.554 4.14 1.526 5.88L0 24l6.26-1.5A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6c-2.023 0-3.916-.547-5.547-1.497l-.398-.238-3.718.994 1.008-3.634-.26-.422A9.538 9.538 0 0 1 2.4 12c0-5.302 4.298-9.6 9.6-9.6s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6z" />
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
                  <a href={t('footer.whatsapp')} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>{t('footer.phone')}</a>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={14} className={styles.contactIcon} />
                  <a href={`mailto:${t('footer.email')}`} className={styles.contactLink}>{t('footer.email')}</a>
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

       
      </div>
    </footer>
  );
}
