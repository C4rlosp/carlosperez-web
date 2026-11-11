import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';
import en from './en.json';

// Each URL has its own prerendered language. The first client render uses that URL language.
i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: typeof window !== 'undefined' && /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;
