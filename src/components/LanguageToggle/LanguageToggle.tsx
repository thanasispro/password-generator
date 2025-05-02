import React from 'react';
import { useLanguageToggle } from '../../hooks/useLanguage/useLanguage';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguageToggle();

  return (
    <button
      onClick={toggleLanguage}
      className="py-1 px-2 bg-grey-200 hover:bg-grey-300 rounded-md text-sm font-medium text-grey-700 cursor-pointer"
    >
      {currentLanguage === 'en' ? 'EN 🇬🇧' : 'GR 🇬🇷'}
    </button>
  );
};

export default LanguageToggle;