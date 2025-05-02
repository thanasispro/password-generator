/**
 * Options for password generation
 */
export interface PasswordOptions {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}

/**
 * Generates a random password based on the provided options and length
 * 
 * @param options - Configuration for what character types to include
 * @param length - Length of the generated password
 * @returns Generated password string
 */
export const generatePassword = (options: PasswordOptions, length: number): string | undefined => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = uppercaseChars.toLowerCase();
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

    // Build character pool based on options
    let charPool = '';
    if (options.uppercase) charPool += uppercaseChars;
    if (options.lowercase) charPool += lowercaseChars;
    if (options.numbers) charPool += numberChars;
    if (options.symbols) charPool += symbolChars;

    // Error handling: Check if any character type is selected
    if (charPool.length === 0) {
        return undefined;
    }

    // Error handling: Check if length is valid
    if (length <= 0) {
        return undefined;
    }

    let password = '';

    // Add one of each required character type
    let mandatoryChars = '';
    if (options.uppercase) mandatoryChars += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    if (options.lowercase) mandatoryChars += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    if (options.numbers) mandatoryChars += numberChars[Math.floor(Math.random() * numberChars.length)];
    if (options.symbols) mandatoryChars += symbolChars[Math.floor(Math.random() * symbolChars.length)];

    // Correct calculation - subtract mandatory chars length
    length -= mandatoryChars.length;
    
    // Generate the rest of the password
    password += Array(length)
        .fill(0)
        .map(() => charPool[Math.floor(Math.random() * charPool.length)])
        .join('');

    password = mandatoryChars + password;
    
    // Shuffle the password and return (fixed extra semicolon)
    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
}