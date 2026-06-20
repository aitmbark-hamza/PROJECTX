import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className={styles.switcher}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          className={`${styles.btn} ${i18n.language?.slice(0, 2) === lang.code ? styles.active : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-label={lang.label}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
