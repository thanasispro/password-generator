import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CopyButton from './CopyButton';
import '@testing-library/jest-dom';

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'copy': 'Copy',
        'copied': 'Copied!',
      };
      return translations[key] || key;
    },
  }),
}));

describe('CopyButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the copy button with correct aria-label', () => {
    render(<CopyButton textToCopy="test-password" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Copy');
  });

  it('copies text to clipboard when clicked', async () => {
    render(<CopyButton textToCopy="test-password" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test-password');
  });

});