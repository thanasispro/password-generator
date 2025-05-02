import React, { useRef, useEffect } from 'react';

interface PasswordSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
}

const PasswordSlider: React.FC<PasswordSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 20,
  label
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to update the slider fill
  const updateSliderFill = () => {
    if (inputRef.current) {
      const percentage = ((value - min) / (max - min)) * 100;
      inputRef.current.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
    }
  };

  // Update the fill when value changes
  useEffect(() => {
    updateSliderFill();
  }, [value, min, max]);

  // Add custom styles for the slider thumb
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 28px;
        width: 28px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
      }
      
      input[type=range]::-webkit-slider-thumb:hover {
        background: #18171F;
        border: 2px solid #A4FFAF;
      }
      
      input[type=range]::-webkit-slider-thumb:active {
        background: #18171F;
        border: 2px solid #A4FFAF;
      }
      
      input[type=range]::-moz-range-thumb {
        height: 28px;
        width: 28px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
      }
      
      input[type=range]::-moz-range-thumb:hover {
        background: #18171F;
        border: 2px solid #A4FFAF;
      }
      
      input[type=range]::-moz-range-thumb:active {
        background: #18171F;
        border: 2px solid #A4FFAF;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="flex flex-col gap-[14px] md:gap-6 mb-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor="passwordLength"
          className="text-preset-4 md:text-preset-3 text-grey-200"
        >
          {label}
        </label>
        <p className="text-preset-2 md:text-preset-1 text-green-200 font-bold mr-[14px]">{value}</p>
      </div>
        <input
          ref={inputRef}
          type="range"
          id="passwordLength"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 appearance-none cursor-pointer bg-grey-850"
        />
      </div>
  );
};

export default PasswordSlider;