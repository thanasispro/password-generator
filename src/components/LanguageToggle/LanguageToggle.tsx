import React from 'react';
import { useLanguageToggle } from '../../hooks/useLanguage/useLanguage';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguageToggle();

  return (
    <button
      onClick={toggleLanguage}
      className="py-1 px-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium text-gray-700 cursor-pointer"
    >
      {currentLanguage === 'en' ? 'EN 🇬🇧' : 'GR 🇬🇷'}
    </button>
  );
};

export default LanguageToggle;