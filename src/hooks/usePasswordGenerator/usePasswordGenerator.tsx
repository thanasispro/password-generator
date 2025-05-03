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

  const handlePasswordLengthChange = (newLength: number) => {
    setPasswordLength(newLength);

    if (!newLength) {
      setOptions({
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      });
    }

    // Reset password when length changes
    setPassword(undefined);
  };

  const handleOptionChange =
    (optionName: keyof PasswordOptions) => (value: boolean) => {
      setOptions((prevOptions) => {
        // Only reset the password if the option value is actually changing
        if (prevOptions[optionName] !== value) {
          setPassword(undefined);
        }

        return {
          ...prevOptions,
          [optionName]: value,
        };
      });
    };

  const generatePassword = () => {
    // Early return if no options selected and no length specified
    if (!options.uppercase && !options.lowercase && 
        !options.numbers && !options.symbols && 
        !passwordLength) {
      return undefined;
    }
    
    // Create a copy of current options
    let currentOptions = { ...options };
    
    // If no options are selected, default to uppercase
    if (!currentOptions.uppercase && !currentOptions.lowercase && 
        !currentOptions.numbers && !currentOptions.symbols) {
      currentOptions.uppercase = true;
      // Update the state for UI consistency
      setOptions(currentOptions);
    }

    const minLength = getMinimumLength(currentOptions);
    const effectiveLength = Math.max(passwordLength, minLength);

    if (effectiveLength !== passwordLength) {
      setPasswordLength(effectiveLength);
    }

    const generatedPassword = generatePasswordUtil(currentOptions, effectiveLength);
    setPassword(generatedPassword);
    return generatedPassword;
  };

  return {
    password,
    passwordLength,
    options,
    handleOptionChange,
    generatePassword,
    handlePasswordLengthChange
  };
};
