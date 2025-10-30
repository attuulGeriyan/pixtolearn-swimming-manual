import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import ManualContent from '../components/ManualContent';
import useLanguage from '../hooks/useLanguage';
import { translationApi } from '../services/api';
import { Translation } from '../types';

const Manual: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await translationApi.getTranslation(selectedLanguage);
        setTranslation(data);
      } catch (err) {
        setError('Failed to load manual content. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedLanguage) {
      fetchTranslation();
    }
  }, [selectedLanguage]);

  const handleChangeLanguage = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-gray-600 text-lg">{t('loadingContent')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !translation) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 mb-4">{error || t('failedToLoadContent')}</p>
            <button
              onClick={handleChangeLanguage}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              {t('backToLanguageSelection')}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ManualContent
        translation={translation}
        onChangeLanguage={handleChangeLanguage}
      />
    </Layout>
  );
};

export default Manual;
