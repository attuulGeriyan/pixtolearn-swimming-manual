import React from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import useLanguage from '../hooks/useLanguage';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { changeLanguage } = useLanguage();

  const handleSelectLanguage = (languageCode: string) => {
    changeLanguage(languageCode);
    navigate('/manual');
  };

  return (
    <LanguageSelector
      onSelectLanguage={handleSelectLanguage}
    />
  );
};

export default Home;
