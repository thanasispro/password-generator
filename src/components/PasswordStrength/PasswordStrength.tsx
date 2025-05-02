import React from 'react';
import { useTranslation } from 'react-i18next';
import { calculateStrength } from '../../utils/passwordStrength/passwordStrength';

interface PasswordStrengthProps {
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
  label: string;
  passwordLength: number;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ options, label, passwordLength }) => {
  const { t } = useTranslation();
  const { uppercase, lowercase, numbers, symbols } = options;
  const enabledOptions = [uppercase, lowercase, numbers, symbols].filter(Boolean).length;
  
  // Define strength levels based on number of enabled options
  const strengthLevel = calculateStrength(passwordLength, enabledOptions);
  
  // Define translation keys and colors based on strength level
  const strengthLabels = [
    '', 
    t('passwordStrength.weak'),
    t('passwordStrength.medium'),
    t('passwordStrength.strong'),
    t('passwordStrength.veryStrong')
  ];
  const strengthColors = ['bg-grey-200', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  
  return (
      <div className="flex items-center justify-between px-4 py-[14px] md:px-[31.5px] md:py-[22px] bg-grey-850">
        <label className="text-preset-4 uppercase text-grey-600">
          {t(label)}
        </label>
        <div className="flex items-center gap-4">
          <div className="text-preset-3 uppercase text-grey-200" data-testid="strength-label">
            {strengthLabels[strengthLevel]}
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index}
                className={`h-[28px] w-[10px] ${
                  index <= strengthLevel ? strengthColors[strengthLevel] : 'bg-grey-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PasswordStrength;