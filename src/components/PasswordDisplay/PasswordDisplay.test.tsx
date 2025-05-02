import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordDisplay from './PasswordDisplay';
import '@testing-library/jest-dom';

// Mock the CopyButton component
vi.mock('../CopyButton/CopyButton', () => ({
  default: ({ textToCopy }: { textToCopy: string }) => (
    <button data-testid="mock-copy-button" data-copy-text={textToCopy}>
      Copy
    </button>
  ),
}));

describe('PasswordDisplay Component', () => {
  it('renders the password text correctly', () => {
    const testPassword = 'Test-P4$$w0rd';
    render(<PasswordDisplay password={testPassword} />);
    
    expect(screen.getByText(testPassword)).toBeInTheDocument();
  });

  it('passes the password to the CopyButton component', () => {
    const testPassword = 'Test-P4$$w0rd';
    render(<PasswordDisplay password={testPassword} />);
    
    const copyButton = screen.getByTestId('mock-copy-button');
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveAttribute('data-copy-text', testPassword);
  });
});