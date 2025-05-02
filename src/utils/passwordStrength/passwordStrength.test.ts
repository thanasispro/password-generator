import { describe, expect, it } from 'vitest';
import { calculateStrength } from './passwordStrength';

describe('passwordStrength', () => {
  describe('calculateStrength', () => {
    it('should return 0 when no options are enabled', () => {
      expect(calculateStrength(10, 0)).toBe(0);
    });

    it('should return 0 when length is 0', () => {
      expect(calculateStrength(0, 2)).toBe(0);
    });

    it('should return 1 (weak) for short passwords with few options', () => {
      expect(calculateStrength(2, 1)).toBe(1); // Very short with just one option
      expect(calculateStrength(4, 1)).toBe(1); // Short with just one option
    });

    it('should return 2 (medium) for medium-length passwords or moderate options', () => {
      expect(calculateStrength(8, 2)).toBe(2); // Medium length with 2 options
      expect(calculateStrength(10, 1)).toBe(2); // Longer but with only 1 option
    });

    it('should return 3 (strong) for longer passwords with good option variety', () => {
      expect(calculateStrength(12, 3)).toBe(3); // Good length with 3 options
      expect(calculateStrength(16, 2)).toBe(3); // Longer with 2 options
    });

    it('should return 4 (very strong) for long passwords with all options', () => {
      expect(calculateStrength(16, 4)).toBe(4); // Long with all options
      expect(calculateStrength(20, 3)).toBe(4); // Maximum length with 3 options
    });

    it('handles maximum password length correctly', () => {
      // Even if length > 20, it should cap at 20 for calculation purposes
      expect(calculateStrength(25, 4)).toBe(4);
    });

    it('edge cases produce expected results', () => {
      expect(calculateStrength(1, 1)).toBe(1); // Minimum non-zero values
      expect(calculateStrength(20, 4)).toBe(4); // Maximum possible values
    });
  });
});