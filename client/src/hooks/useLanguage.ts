import { useState, useEffect } from 'react';
import i18n from '../i18n';

const LANGUAGE_STORAGE_KEY = 'pixtolearn_selected_language';

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    // Try to get from localStorage
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) {
      return stored;
    }

    // Try to detect from browser
    const browserLang = navigator.language.split('-')[0].toUpperCase();
    return browserLang || 'EN';
  });

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage);
  }, [selectedLanguage]);

  const changeLanguage = (languageCode: string) => {
    setSelectedLanguage(languageCode.toUpperCase());
    i18n.changeLanguage(languageCode.toLowerCase());
  };

  return {
    selectedLanguage,
    changeLanguage,
  };
};

export default useLanguage;
