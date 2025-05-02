import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptionsCheckbox from './OptionCheckbox';

describe('OptionsCheckbox component', () => {
  it('renders with the provided title', () => {
    render(
      <OptionsCheckbox 
        title="Test Title" 
        checked={false} 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders checkbox with the correct checked state when unchecked', () => {
    render(
      <OptionsCheckbox 
        title="Test Title" 
        checked={false} 
        onChange={() => {}} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox with the correct checked state when checked', () => {
    render(
      <OptionsCheckbox 
        title="Test Title" 
        checked={true} 
        onChange={() => {}} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange handler when checkbox is clicked', () => {
    const handleChange = vi.fn();
    
    render(
      <OptionsCheckbox 
        title="Test Title" 
        checked={false} 
        onChange={handleChange} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('toggles checked state correctly', () => {
    const handleChange = vi.fn();
    
    const { rerender } = render(
      <OptionsCheckbox 
        title="Test Title" 
        checked={false} 
        onChange={handleChange} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
    
    // Rerender with updated props to simulate parent component changing the checked state
    rerender(
      <OptionsCheckbox 
        title="Test Title" 
        checked={true} 
        onChange={handleChange} 
      />
    );
    
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});