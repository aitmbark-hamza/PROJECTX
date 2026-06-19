import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

const SUPPORTED_LANGS = ['en', 'fr', 'ar'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, fr: { translation: fr }, ar: { translation: ar } },
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnObjects: true,
  });

export function applyDirection(lang) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
}

const currentLang = i18n.language?.slice(0, 2);
applyDirection(SUPPORTED_LANGS.includes(currentLang) ? currentLang : 'fr');

i18n.on('languageChanged', (lng) => {
  applyDirection(lng);
});

export default i18n;
