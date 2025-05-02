import React from 'react';

interface ArrowIconProps {
  className?: string;
  fill?: string;
  width?: number;
  height?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ 
  className = "",
  fill = "#24232C",
  width = 12,
  height = 12
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fill={fill} 
        d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
      />
    </svg>
  );
};

export default ArrowIcon;