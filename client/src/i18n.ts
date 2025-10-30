import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import deCommon from './locales/de/common.json';
import esCommon from './locales/es/common.json';
import fiCommon from './locales/fi/common.json';
import frCommon from './locales/fr/common.json';
import itCommon from './locales/it/common.json';
import nlCommon from './locales/nl/common.json';
import plCommon from './locales/pl/common.json';
import ptCommon from './locales/pt/common.json';
import daCommon from './locales/da/common.json';

const resources = {
  en: {
    common: enCommon
  },
  de: {
    common: deCommon
  },
  es: {
    common: esCommon
  },
  fi: {
    common: fiCommon
  },
  fr: {
    common: frCommon
  },
  it: {
    common: itCommon
  },
  nl: {
    common: nlCommon
  },
  pl: {
    common: plCommon
  },
  pt: {
    common: ptCommon
  },
  da: {
    common: daCommon
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'pixtolearn_selected_language'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
