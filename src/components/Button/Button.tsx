import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  fullWidth = false,
  className = '',
  type = "button",
  disabled = false,
  icon
}) => {
  // Updated styles to prevent size changes on hover
  const baseClasses = "py-[16px] bg-green-200 text-grey-800 uppercase text-preset-4 border border-transparent";
  const hoverStyles = "hover:text-green-200 hover:bg-transparent hover:border-green-200 hover:cursor-pointer";
  const widthClass = fullWidth ? 'w-full' : '';
  const mdClasses = "md:py-[20.5px] md:text-preset-3";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${widthClass} ${hoverStyles} ${mdClasses} ${className}`}
    >
      <div className="flex items-center justify-center text-center">
        {children}
        {icon && <div className="ml-4">{icon}</div>}
      </div>
    </button>
  );
};

export default Button;