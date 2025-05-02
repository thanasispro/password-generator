import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordSlider from './PasswordSlider';
import '@testing-library/jest-dom';

describe('PasswordSlider', () => {
  it('renders with provided props', () => {
    const onChange = vi.fn();
    render(<PasswordSlider value={10} onChange={onChange} label="Password Length" />);
    
    expect(screen.getByText('Password Length')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    const onChange = vi.fn();
    render(<PasswordSlider value={10} onChange={onChange} label="Custom Label" />);
    
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('sets the min, max and value attributes on the slider', () => {
    const onChange = vi.fn();
    render(
      <PasswordSlider 
        value={15} 
        onChange={onChange} 
        min={5} 
        max={30} 
        label="Password Length" 
      />
    );
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '5');
    expect(slider).toHaveAttribute('max', '30');
    expect(slider).toHaveAttribute('value', '15');
  });

  it('uses default min and max when not provided', () => {
    const onChange = vi.fn();
    render(<PasswordSlider value={10} onChange={onChange} label="Password Length" />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '20');
  });

  it('displays the current value', () => {
    const onChange = vi.fn();
    render(<PasswordSlider value={12} onChange={onChange} label="Password Length" />);
    
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('calls onChange when slider value changes', () => {
    const onChange = vi.fn();
    render(<PasswordSlider value={10} onChange={onChange} label="Password Length" />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '15' } });
    
    expect(onChange).toHaveBeenCalledWith(15);
  });
});