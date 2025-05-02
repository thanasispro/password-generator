import { useState } from "react";
import { generatePassword as generatePasswordUtil } from "../../utils/generate/generate";

interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export const usePasswordGenerator = (initialLength: number = 0) => {
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [passwordLength, setPasswordLength] = useState<number>(initialLength);
  const [options, setOptions] = useState<PasswordOptions>({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  // Calculate minimum required length based on selected options
  const getMinimumLength = (opts: PasswordOptions): number => {
    return Object.values(opts).filter(Boolean).length;
  };

  const handleOptionChange = (optionName: keyof PasswordOptions) => (value: boolean) => {
    setOptions((prevOptions) => {
      const newOptions = {
        ...prevOptions,
        [optionName]: value,
      };

      // Adjust length if new options require more characters
      const minLength = getMinimumLength(newOptions);
      if (passwordLength < minLength) {
        setPasswordLength(minLength);
      }
      
      return newOptions;
    });
  };
  
  const generatePassword = () => {
    const minLength = getMinimumLength(options);
    const effectiveLength = Math.max(passwordLength, minLength);
    
    if (effectiveLength !== passwordLength) {
      setPasswordLength(effectiveLength);
    }
    
    const generatedPassword = generatePasswordUtil(options, effectiveLength);
    setPassword(generatedPassword);
    return generatedPassword;
  };

  return {
    password,
    passwordLength,
    options,
    setPasswordLength,
    handleOptionChange,
    generatePassword,
  };
};