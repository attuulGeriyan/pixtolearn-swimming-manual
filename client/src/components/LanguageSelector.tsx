import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../types';
import { translationApi } from '../services/api';

interface LanguageSelectorProps {
  onSelectLanguage: (languageCode: string) => void;
  selectedLanguage?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onSelectLanguage,
  selectedLanguage,
}) => {
  const { t } = useTranslation();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const data = await translationApi.getLanguages();
        setLanguages(data);
        setError(null);
      } catch (err) {
        setError(t('failedToLoadLanguages'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const euLanguages = languages.filter((lang) => lang.isEUOfficial);
  const otherLanguages = languages.filter((lang) => !lang.isEUOfficial);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">{t('loadingLanguages')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-8 relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{t('selectYourLanguage')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* EU Official Languages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-primary-500">
              {t('euOfficialLanguages')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {euLanguages.map((lang) => (
                <button
                  key={lang.languageCode}
                  onClick={() => onSelectLanguage(lang.languageCode)}
                  className={`text-left px-3 py-2 rounded transition-colors ${
                    selectedLanguage === lang.languageCode
                      ? 'bg-primary-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="font-semibold">{lang.languageCode}</span>{' '}
                  <span className="text-sm">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Other Languages */}
          {otherLanguages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-primary-500">
                Other languages
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {otherLanguages.map((lang) => (
                  <button
                    key={lang.languageCode}
                    onClick={() => onSelectLanguage(lang.languageCode)}
                    className={`text-left px-3 py-2 rounded transition-colors ${
                      selectedLanguage === lang.languageCode
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="font-semibold">{lang.languageCode}</span>{' '}
                    <span className="text-sm">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>{t('selectLanguageDescription')}</p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
