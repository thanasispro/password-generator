import { describe, it, expect } from "vitest";
import { generatePassword, PasswordOptions } from "./generate";

describe("generatePassword", () => {
  it("should return undefined when no character types are selected", () => {
    const options: PasswordOptions = {
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    };
    expect(generatePassword(options, 10)).toBeUndefined();
  });

  it("should return undefined when length is 0 or negative", () => {
    const options: PasswordOptions = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    };
    expect(generatePassword(options, 0)).toBeUndefined();
    expect(generatePassword(options, -5)).toBeUndefined();
  });

  it("should generate password with correct length", () => {
    const options: PasswordOptions = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    };
    expect(generatePassword(options, 10)?.length).toBe(10);
    expect(generatePassword(options, 20)?.length).toBe(20);
  });

  it("should contain at least one of each selected character type", () => {
    const options: PasswordOptions = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    };
    const password = generatePassword(options, 10);

    expect(password).toBeDefined();
    if (password) {
      expect(/[A-Z]/.test(password)).toBe(true); // Contains uppercase
      expect(/[a-z]/.test(password)).toBe(true); // Contains lowercase
      expect(/[0-9]/.test(password)).toBe(true); // Contains numbers
      expect(/[!@#$%^&*()-_=+[\]{}|;:,.<>?/]/.test(password)).toBe(true); // Contains symbols
    }
  });

  it("should contain only selected character types", () => {
    const options: PasswordOptions = {
      uppercase: true,
      lowercase: false,
      numbers: true,
      symbols: false,
    };
    const password = generatePassword(options, 10);

    expect(password).toBeDefined();
    if (password) {
      expect(/[A-Z]/.test(password)).toBe(true); // Contains uppercase
      expect(/[0-9]/.test(password)).toBe(true); // Contains numbers
      expect(/[a-z]/.test(password)).toBe(false); // No lowercase
      expect(/[!@#$%^&*()\-\_=+\[\]{}|;:,.<>?\/]/.test(password)).toBe(false);
    }
  });

  it("should generate different passwords on subsequent calls", () => {
    const options: PasswordOptions = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    };
    const password1 = generatePassword(options, 15);
    const password2 = generatePassword(options, 15);

    expect(password1).not.toBe(password2);
  });

  it("should handle minimum length edge cases", () => {
    // Test when length equals exactly the number of mandatory characters
    const options: PasswordOptions = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    };
    // Length 4 means we'll have exactly one of each type
    const password = generatePassword(options, 4);
    expect(password?.length).toBe(4);
  });

  it("should handle specific character type combinations", () => {
    // Only uppercase
    const onlyUppercase = generatePassword(
      {
        uppercase: true,
        lowercase: false,
        numbers: false,
        symbols: false,
      },
      10
    );
    expect(onlyUppercase).toBeDefined();
    expect(onlyUppercase?.length).toBe(10);
    expect(/^[A-Z]+$/.test(onlyUppercase!)).toBe(true);

    // Only numbers
    const onlyNumbers = generatePassword(
      {
        uppercase: false,
        lowercase: false,
        numbers: true,
        symbols: false,
      },
      10
    );
    expect(onlyNumbers).toBeDefined();
    expect(onlyNumbers?.length).toBe(10);
    expect(/^[0-9]+$/.test(onlyNumbers!)).toBe(true);
  });
});
