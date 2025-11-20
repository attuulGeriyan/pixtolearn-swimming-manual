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

  // Modern Color scheme mapping
  const colorSchemes = {
    blue: {
      gradient: 'from-blue-600 to-indigo-600',
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      ring: 'focus:ring-blue-500'
    },
    grey: {
      gradient: 'from-slate-600 to-slate-800',
      text: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      icon: 'text-slate-500',
      ring: 'focus:ring-slate-500'
    },
    yellow: {
      gradient: 'from-amber-500 to-orange-500',
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'text-amber-500',
      ring: 'focus:ring-amber-500'
    },
    beige: {
      gradient: 'from-stone-500 to-stone-700',
      text: 'text-stone-600',
      bg: 'bg-stone-50',
      border: 'border-stone-200',
      icon: 'text-stone-500',
      ring: 'focus:ring-stone-500'
    }
  };

  const colors = colorSchemes[selectedPack.colorScheme as keyof typeof colorSchemes] || colorSchemes.blue;

  const renderSection = (sectionKey: string, sectionData: any) => {
    return (
      <div key={sectionKey} className="bg-white rounded-2xl shadow-soft p-8 mb-8 animate-slide-up">
        <h2 className={`text-2xl font-bold ${colors.text} mb-6 flex items-center gap-3`}>
          {sectionData.title}
          <div className={`h-1 flex-grow rounded-full bg-gradient-to-r ${colors.gradient} opacity-20`}></div>
        </h2>
        <p className="text-slate-700 mb-8 whitespace-pre-line leading-relaxed text-lg">
          {sectionData.description}
        </p>

        {/* Suggest use & Care */}
        {sectionData.suggestUseAndCare && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-emerald-900 text-lg">{t('suggestUseCare')}</h3>
            </div>
            <ul className="space-y-3">
              {sectionData.suggestUseAndCare.map((item: string, index: number) => (
                <li key={index} className="flex items-start text-emerald-800">
                  <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {sectionData.warnings && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-amber-900 text-lg">{t('warnings')}</h3>
            </div>
            <div className="text-amber-800">
              {Array.isArray(sectionData.warnings) ? (
                <ul className="space-y-3">
                  {sectionData.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                      <span className="leading-relaxed">{warning}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-relaxed">{sectionData.warnings}</p>
              )}
            </div>
          </div>
        )}

        {/* Compliance */}
        {sectionData.compliance && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              {sectionData.compliance}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Header Section with Color Scheme */}
      <div className={`relative overflow-hidden rounded-3xl shadow-xl mb-12 bg-gradient-to-br ${colors.gradient} text-white`}>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl"></div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4 border border-white/10">
                {t('instructionManual')}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                PIXTOLEARN {t('swimming')}
              </h1>
              <p className="text-xl md:text-2xl font-light opacity-90 mb-2">
                {selectedPack.packName}
              </p>
              <p className="text-white/80 max-w-xl leading-relaxed">
                {t('visualLearningSystem')}
              </p>
            </div>
            <button
              onClick={onChangeLanguage}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl transition-all duration-200 no-print flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              {t('changeLanguage')}
            </button>
          </div>
        </div>
      </div>

      {/* Pack Selection */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <label htmlFor="pack-select" className="text-lg font-bold text-slate-800">
          {t('selectPack')}
        </label>
        <div className="relative w-full md:w-72">
          <select
            id="pack-select"
            value={selectedPackType}
            onChange={(e) => setSelectedPackType(e.target.value as any)}
            className={`w-full appearance-none pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 ${colors.ring} transition shadow-sm cursor-pointer`}
          >
            <option value="fullPack">{t('fullPack')}</option>
            <option value="basicPack">{t('basicPack')}</option>
            <option value="funPack">{t('funPack')}</option>
            <option value="standsHolder">{t('standsHolder')}</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
        <h2 className={`text-2xl font-bold ${colors.text} mb-6`}>
          {t('overview')}
        </h2>
        <div className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
          {selectedPack.overview}
        </div>
      </div>

      {/* What is Included? */}
      {selectedPack.whatIsIncluded && selectedPack.whatIsIncluded.length > 0 && (
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className={`text-2xl font-bold ${colors.text} mb-6`}>{t('whatIsIncluded')}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedPack.whatIsIncluded.map((item: string, index: number) => (
              <li key={index} className="flex items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${colors.bg} ${colors.text}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-slate-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dynamic Sections */}
      {selectedPack.sections && Object.keys(selectedPack.sections).map((sectionKey) =>
        renderSection(sectionKey, selectedPack.sections[sectionKey])
      )}

      {/* Company Information */}
      <div className="bg-slate-900 rounded-2xl shadow-lg p-8 text-slate-300 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          {t('companyInformation')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-bold text-white text-lg mb-4">{content.company.name}</h3>
            <div className="space-y-2 text-slate-400">
              <p>{content.company.address.street}</p>
              <p>{content.company.address.city}, {content.company.address.postcode}</p>
              <p>{content.company.address.country}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">{t('contact')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">{t('website')}</p>
                <a
                  href={`https://${content.company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2"
                >
                  {content.company.website}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">{t('email')}</p>
                <a
                  href={`mailto:${content.company.email}`}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {content.company.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="fixed bottom-8 right-8 no-print z-40">
        <button
          onClick={() => window.print()}
          className="bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 hover:scale-110 transition-all duration-200 flex items-center justify-center group"
          title={t('printDownloadPDF')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default ManualContent;
