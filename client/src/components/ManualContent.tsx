import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Translation, Pack } from '../types';

interface ManualContentProps {
  translation: Translation;
  onChangeLanguage: () => void;
}

const ManualContent: React.FC<ManualContentProps> = ({ translation, onChangeLanguage }) => {
  const { t } = useTranslation();
  const { content } = translation;
  const [selectedPackType, setSelectedPackType] = useState<'fullPack' | 'basicPack' | 'funPack' | 'standsHolder'>('fullPack');

  const selectedPack: Pack = content.packs[selectedPackType];

  // Color scheme mapping
  const colorSchemes = {
    blue: {
      header: 'from-blue-500 to-blue-600',
      title: 'text-blue-600',
      suggestBg: 'bg-blue-50',
      suggestText: 'text-blue-800',
      suggestIcon: 'text-blue-600',
      suggestTitle: 'text-blue-900',
      warningBg: 'bg-yellow-50',
      warningBorder: 'border-yellow-400',
      warningText: 'text-yellow-800',
      warningIcon: 'text-yellow-600',
      dropdown: 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
    },
    grey: {
      header: 'from-gray-500 to-gray-600',
      title: 'text-gray-600',
      suggestBg: 'bg-gray-50',
      suggestText: 'text-gray-800',
      suggestIcon: 'text-gray-600',
      suggestTitle: 'text-gray-900',
      warningBg: 'bg-yellow-50',
      warningBorder: 'border-yellow-400',
      warningText: 'text-yellow-800',
      warningIcon: 'text-yellow-600',
      dropdown: 'border-gray-300 focus:border-gray-500 focus:ring-gray-500'
    },
    yellow: {
      header: 'from-yellow-500 to-yellow-600',
      title: 'text-yellow-600',
      suggestBg: 'bg-yellow-50',
      suggestText: 'text-yellow-800',
      suggestIcon: 'text-yellow-600',
      suggestTitle: 'text-yellow-900',
      warningBg: 'bg-red-50',
      warningBorder: 'border-red-400',
      warningText: 'text-red-800',
      warningIcon: 'text-red-600',
      dropdown: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500'
    },
    beige: {
      header: 'from-amber-700 to-amber-800',
      title: 'text-amber-800',
      suggestBg: 'bg-amber-50',
      suggestText: 'text-amber-900',
      suggestIcon: 'text-amber-700',
      suggestTitle: 'text-amber-900',
      warningBg: 'bg-yellow-50',
      warningBorder: 'border-yellow-400',
      warningText: 'text-yellow-800',
      warningIcon: 'text-yellow-600',
      dropdown: 'border-amber-300 focus:border-amber-600 focus:ring-amber-600'
    }
  };

  const colors = colorSchemes[selectedPack.colorScheme as keyof typeof colorSchemes];

  const renderSection = (sectionKey: string, sectionData: any) => {
    return (
      <div key={sectionKey} className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className={`text-2xl font-bold ${colors.title} mb-4`}>
          {sectionData.title}
        </h2>
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          {sectionData.description}
        </p>

        {/* Suggest use & Care */}
        {sectionData.suggestUseAndCare && (
          <div className={`${colors.suggestBg} p-4 rounded-lg mb-4`}>
            <div className="flex items-center mb-3">
              <svg className={`w-6 h-6 ${colors.suggestIcon} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <h3 className={`font-semibold ${colors.suggestTitle}`}>{t('suggestUseCare')}</h3>
            </div>
            <ul className={`list-disc list-inside space-y-1 ${colors.suggestText} text-sm`}>
              {sectionData.suggestUseAndCare.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {sectionData.warnings && (
          <div className={`${colors.warningBg} border-l-4 ${colors.warningBorder} p-4 rounded flex items-start mb-4`}>
            <svg className={`w-5 h-5 ${colors.warningIcon} mr-2 mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className={`font-semibold ${colors.warningText} mb-1`}>{t('warnings')}</h3>
              {Array.isArray(sectionData.warnings) ? (
                <ul className={`list-disc list-inside space-y-1 ${colors.warningText} text-sm`}>
                  {sectionData.warnings.map((warning: string, index: number) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              ) : (
                <p className={`${colors.warningText} text-sm`}>{sectionData.warnings}</p>
              )}
            </div>
          </div>
        )}

        {/* Compliance */}
        {sectionData.compliance && (
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-700 text-sm whitespace-pre-line font-semibold">
              {sectionData.compliance}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section with Color Scheme */}
      <div className={`bg-gradient-to-r ${colors.header} text-white rounded-lg shadow-lg p-8 mb-8`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              PIXTOLEARN Swimming - {selectedPack.packName}
            </h1>
            <p className="text-lg opacity-90">Visual learning system for structured aquatic instruction</p>
          </div>
          <button
            onClick={onChangeLanguage}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition no-print font-semibold text-sm"
          >
            {t('changeLanguage')}
          </button>
        </div>
      </div>

      {/* Pack Selection Dropdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label htmlFor="pack-select" className="block text-sm font-semibold text-gray-700 mb-2">
          {t('selectPack')}
        </label>
        <select
          id="pack-select"
          value={selectedPackType}
          onChange={(e) => setSelectedPackType(e.target.value as any)}
          className={`w-full px-4 py-2 border-2 ${colors.dropdown} rounded-lg focus:outline-none focus:ring-2 transition`}
        >
          <option value="fullPack">{t('fullPack')}</option>
          <option value="basicPack">{t('basicPack')}</option>
          <option value="funPack">{t('funPack')}</option>
          <option value="standsHolder">{t('standsHolder')}</option>
        </select>
      </div>

      {/* Overview Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className={`text-2xl font-bold ${colors.title} mb-4`}>
          PIXTOLEARN Swimming - {selectedPack.packName}
        </h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {selectedPack.overview}
        </div>
      </div>

      {/* What is Included? */}
      {selectedPack.whatIsIncluded && selectedPack.whatIsIncluded.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className={`text-2xl font-bold ${colors.title} mb-4`}>{t('whatIsIncluded')}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {selectedPack.whatIsIncluded.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Dynamic Sections */}
      {selectedPack.sections && Object.keys(selectedPack.sections).map((sectionKey) =>
        renderSection(sectionKey, selectedPack.sections[sectionKey])
      )}

      {/* Company Information */}
      <div className="bg-gray-100 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('companyInformation')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">{content.company.name}</h3>
            <p className="text-gray-600 text-sm">
              {content.company.address.street}<br />
              {content.company.address.city}<br />
              {content.company.address.postcode}<br />
              {content.company.address.country}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">{t('contact')}</h3>
            <p className="text-gray-600 text-sm">
              <strong>{t('website')}</strong>{' '}
              <a
                href={`https://${content.company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                {content.company.website}
              </a>
              <br />
              <strong>{t('email')}</strong>{' '}
              <a
                href={`mailto:${content.company.email}`}
                className="text-primary-500 hover:underline"
              >
                {content.company.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-8 text-center no-print">
        <button
          onClick={() => window.print()}
          className={`bg-gradient-to-r ${colors.header} text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold shadow-md`}
        >
          {t('printDownloadPDF')}
        </button>
      </div>
    </div>
  );
};

export default ManualContent;
