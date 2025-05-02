import React from 'react';
import CopyButton from '../CopyButton/CopyButton';

interface PasswordDisplayProps {
  password?: string;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password }) => {
  return (
    <div className="w-full p-4 md:px-8 md:py-[19px] bg-grey-800 flex items-center justify-between">
      <p className="text-preset-2 md:text-preset-1 text-grey-200" id="generatedPassword">
      {password ? (
        password
      ) : (
        <span className="text-grey-700">P4$5w0rd!</span>
      )}
      </p>
      <CopyButton textToCopy={password} />
    </div>
  );
};

export default PasswordDisplay;