import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageToggle from './LanguageToggle';
import { useLanguageToggle } from '../../hooks/useLanguage/useLanguage';

// Mock the useLanguageToggle hook
vi.mock('../../hooks/useLanguage/useLanguage', () => ({
    useLanguageToggle: vi.fn()
}));


describe('LanguageToggle component', () => {
    it('renders with English language correctly', () => {
        const mockToggleLanguage = vi.fn();
        (useLanguageToggle as any).mockReturnValue({
            currentLanguage: 'en',
            toggleLanguage: mockToggleLanguage
        });
        
        render(<LanguageToggle />);
        
        expect(screen.getByText('EN 🇬🇧')).toBeInTheDocument();
    });
    
    it('renders with Greek language correctly', () => {
        const mockToggleLanguage = vi.fn();
        (useLanguageToggle as any).mockReturnValue({
            currentLanguage: 'gr',
            toggleLanguage: mockToggleLanguage
        });
        
        render(<LanguageToggle />);
        
        expect(screen.getByText('GR 🇬🇷')).toBeInTheDocument();
    });
    
    it('calls toggleLanguage when button is clicked', () => {
        const mockToggleLanguage = vi.fn();
        (useLanguageToggle as any).mockReturnValue({
            currentLanguage: 'en',
            toggleLanguage: mockToggleLanguage
        });
        
        render(<LanguageToggle />);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(mockToggleLanguage).toHaveBeenCalledTimes(1);
    });
    
    it('shows correct button text based on current language', () => {
        let currentLanguage = 'en';
        const mockToggleLanguage = vi.fn(() => {
            currentLanguage = currentLanguage === 'en' ? 'gr' : 'en';
            
            // Update the mock return value after toggling
            (useLanguageToggle as any).mockReturnValue({
                currentLanguage,
                toggleLanguage: mockToggleLanguage
            });
        });
        
        // Set up the mock before rendering
        (useLanguageToggle as any).mockReturnValue({
            currentLanguage,
            toggleLanguage: mockToggleLanguage
        });
        
        render(<LanguageToggle />);
        
        expect(screen.getByText('EN 🇬🇧')).toBeInTheDocument();
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        // Re-render to get the updated component with new language
        render(<LanguageToggle />);
        
        expect(screen.getByText('GR 🇬🇷')).toBeInTheDocument();
    });
});