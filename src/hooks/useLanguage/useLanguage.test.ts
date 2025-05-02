import { renderHook, act } from '@testing-library/react';
import { useLanguageToggle } from './useLanguage';
import { useTranslation } from 'react-i18next';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

describe('useLanguageToggle', () => {
  // Setup mocks for i18n and localStorage
  const changeLanguageMock = vi.fn();
  let localStorageMock: { [key: string]: string } = {};
  
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Mock i18n
    (useTranslation as ReturnType<typeof vi.fn>).mockReturnValue({
      i18n: {
        language: 'en',
        changeLanguage: changeLanguageMock
      },
      t: (key: string) => key
    });
    
    // Mock localStorage
    localStorageMock = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key) => localStorageMock[key] || null),
        setItem: vi.fn((key, value) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key) => delete localStorageMock[key]),
        clear: vi.fn(() => (localStorageMock = {})),
      },
      writable: true
    });
  });

  afterEach(() => {
    // Clean up
    vi.restoreAllMocks();
  });

  it('should initialize with default language from i18n', () => {
    const { result } = renderHook(() => useLanguageToggle());
    
    expect(result.current.currentLanguage).toBe('en');
  });

  it('should initialize with language from localStorage if available', () => {
    // Set up localStorage with saved language
    localStorageMock['language'] = 'gr';
    
    const { result } = renderHook(() => useLanguageToggle());
    
    // Check if the language was loaded from localStorage
    expect(changeLanguageMock).toHaveBeenCalledWith('gr');
    expect(result.current.currentLanguage).toBe('gr');
  });

  it('should toggle language from English to Greek', () => {
    const { result } = renderHook(() => useLanguageToggle());
    
    // Initial language is English
    expect(result.current.currentLanguage).toBe('en');
    
    // Toggle language
    act(() => {
      result.current.toggleLanguage();
    });
    
    // Language should now be Greek
    expect(result.current.currentLanguage).toBe('gr');
    expect(changeLanguageMock).toHaveBeenCalledWith('gr');
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'gr');
  });

  it('should toggle language from Greek to English', () => {
    // Set initial language to Greek
    (useTranslation as ReturnType<typeof vi.fn>).mockReturnValue({
      i18n: {
        language: 'gr',
        changeLanguage: changeLanguageMock
      },
      t: (key: string) => key
    });
    
    const { result } = renderHook(() => useLanguageToggle());
    
    // Initial language is Greek
    expect(result.current.currentLanguage).toBe('gr');
    
    // Toggle language
    act(() => {
      result.current.toggleLanguage();
    });
    
    // Language should now be English
    expect(result.current.currentLanguage).toBe('en');
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'en');
  });
  
  it('should persist language preference to localStorage', () => {
    const { result } = renderHook(() => useLanguageToggle());
    
    act(() => {
      result.current.toggleLanguage();
    });
    
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'gr');
    
    // Toggle back
    act(() => {
      result.current.toggleLanguage();
    });
    
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'en');
  });
});