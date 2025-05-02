import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import PasswordStrength from './PasswordStrength';
import { calculateStrength } from '../../utils/passwordStrength/passwordStrength';

// Mock the i18n library
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'passwordStrength.weak': 'WEAK',
        'passwordStrength.medium': 'MEDIUM',
        'passwordStrength.strong': 'STRONG',
        'passwordStrength.veryStrong': 'VERY STRONG',
        'strength': 'STRENGTH'
      };
      return translations[key] || key;
    }
  })
}));

// Mock the calculateStrength function to control the test scenarios
vi.mock('../../utils/passwordStrength/passwordStrength', () => ({
  calculateStrength: vi.fn()
}));

describe('PasswordStrength Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders the strength label correctly', () => {
    vi.mocked(calculateStrength).mockReturnValue(1);
    
    render(
      <PasswordStrength
        options={{ uppercase: true, lowercase: false, numbers: false, symbols: false }}
        label="strength"
        passwordLength={5}
      />
    );
    
    expect(screen.getByText('STRENGTH')).toBeDefined();
    expect(screen.getByTestId('strength-label').textContent).toBe('WEAK');
  });

  test('shows correct strength indicators for weak password', () => {
    vi.mocked(calculateStrength).mockReturnValue(1);
    
    const { container } = render(
      <PasswordStrength
        options={{ uppercase: true, lowercase: false, numbers: false, symbols: false }}
        label="strength"
        passwordLength={5}
      />
    );
    
    // Check that one bar is colored and the rest are grey
    const bars = container.querySelectorAll('div.flex.space-x-2 > div');
    expect(bars.length).toBe(4);
    expect(bars[0].className).includes('bg-red-500');
    expect(bars[1].className).includes('bg-grey-200');
    expect(bars[2].className).includes('bg-grey-200');
    expect(bars[3].className).includes('bg-grey-200');
  });

  test('shows correct strength indicators for medium password', () => {
    vi.mocked(calculateStrength).mockReturnValue(2);
    
    const { container } = render(
      <PasswordStrength
        options={{ uppercase: true, lowercase: true, numbers: false, symbols: false }}
        label="strength"
        passwordLength={8}
      />
    );
    
    expect(screen.getByTestId('strength-label').textContent).toBe('MEDIUM');
    
    const bars = container.querySelectorAll('div.flex.space-x-2 > div');
    expect(bars[0].className).includes('bg-orange-500');
    expect(bars[1].className).includes('bg-orange-500');
    expect(bars[2].className).includes('bg-grey-200');
    expect(bars[3].className).includes('bg-grey-200');
  });

  test('shows correct strength indicators for strong password', () => {
    vi.mocked(calculateStrength).mockReturnValue(3);
    
    const { container } = render(
      <PasswordStrength
        options={{ uppercase: true, lowercase: true, numbers: true, symbols: false }}
        label="strength"
        passwordLength={12}
      />
    );
    
    expect(screen.getByTestId('strength-label').textContent).toBe('STRONG');
    
    const bars = container.querySelectorAll('div.flex.space-x-2 > div');
    expect(bars[0].className).includes('bg-yellow-500');
    expect(bars[1].className).includes('bg-yellow-500');
    expect(bars[2].className).includes('bg-yellow-500');
    expect(bars[3].className).includes('bg-grey-200');
  });

  test('shows correct strength indicators for very strong password', () => {
    vi.mocked(calculateStrength).mockReturnValue(4);
    
    const { container } = render(
      <PasswordStrength
        options={{ uppercase: true, lowercase: true, numbers: true, symbols: true }}
        label="strength"
        passwordLength={16}
      />
    );
    
    expect(screen.getByTestId('strength-label').textContent).toBe('VERY STRONG');
    
    const bars = container.querySelectorAll('div.flex.space-x-2 > div');
    expect(bars[0].className).includes('bg-green-500');
    expect(bars[1].className).includes('bg-green-500');
    expect(bars[2].className).includes('bg-green-500');
    expect(bars[3].className).includes('bg-green-500');
  });

  test('calls calculateStrength with correct parameters', () => {
    render(
      <PasswordStrength
        options={{ uppercase: true, lowercase: true, numbers: false, symbols: true }}
        label="strength"
        passwordLength={10}
      />
    );
    
    // We expect 3 enabled options (uppercase, lowercase, symbols)
    expect(calculateStrength).toHaveBeenCalledWith(10, 3);
  });

  test('handles no options enabled case', () => {
    vi.mocked(calculateStrength).mockReturnValue(0);
    
    const { container } = render(
      <PasswordStrength
        options={{ uppercase: false, lowercase: false, numbers: false, symbols: false }}
        label="strength"
        passwordLength={5}
      />
    );
    
    expect(screen.getByTestId('strength-label').textContent).toBe('');
    
    const bars = container.querySelectorAll('div.flex.space-x-2 > div');
    expect(bars[0].className).includes('bg-grey-200');
    expect(bars[1].className).includes('bg-grey-200');
    expect(bars[2].className).includes('bg-grey-200');
    expect(bars[3].className).includes('bg-grey-200');
  });
});