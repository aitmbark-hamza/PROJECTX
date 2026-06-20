import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../ui/LanguageSwitcher/LanguageSwitcher';
import styles from './Navbar.module.css';

const navLinkKeys = [
  { key: 'home', href: '#hero' },
  { key: 'services', href: '#services' },
  { key: 'about', href: '#about' },
  { key: 'gallery', href: '#gallery' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar({ onBookingClick }) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const sectionIds = useRef(navLinkKeys.map(l => l.href.replace('#', '')));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = sectionIds.current;
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = navLinkKeys.map((link) => ({
    label: t(`navbar.links.${link.key}`),
    href: link.href,
  }));

  const staggerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
    exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.container}>
          <motion.a
            href="#hero"
            className={styles.logo}
            custom={0}
            variants={staggerVariants}
          >
            <img src="/images/LOGO.webp" alt="La Table de la Cantine" className={styles.logoImg} width="120" height="110" />
          </motion.a>

          <div className={styles.links}>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`${styles.link} ${activeSection === link.href.replace('#', '') ? styles.active : ''}`}
                custom={i + 1}
                variants={staggerVariants}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              className={styles.bookingBtn}
              custom={navLinks.length + 1}
              variants={staggerVariants}
              onClick={onBookingClick}
            >
              {t('navbar.booking')}
            </motion.button>
            <motion.div custom={navLinks.length + 2} variants={staggerVariants}>
              <LanguageSwitcher />
            </motion.div>
          </div>

          <motion.button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            custom={navLinks.length + 1}
            variants={staggerVariants}
            aria-label={t('navbar.toggleMenu')}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`${styles.mobileLink} ${activeSection === link.href.replace('#', '') ? styles.active : ''}`}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  className={styles.mobileBookingBtn}
                  custom={navLinks.length}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => { onBookingClick(); }}
                >
                  {t('navbar.booking')}
                </motion.button>
              </div>

              <motion.div
                className={styles.mobileFooter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className={styles.mobileLang}>
                  <LanguageSwitcher />
                </div>
                <p className={styles.mobileTagline}>{t('navbar.tagline')}</p>
                <div className={styles.mobileGoldLine} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
