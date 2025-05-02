import React from "react";

interface OptionsCheckboxProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const OptionsCheckbox: React.FC<OptionsCheckboxProps> = ({
  title,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="
            appearance-none
            h-[20px] w-[20px]
            border-2 border-gray-200
            bg-transparent
            checked:bg-green-200 
            checked:border-green-200
            focus:ring-0 focus:ring-offset-0
            focus:outline-none
            cursor-pointer
          "
        />
        {checked && (
          <img 
            src={"./images/icon-check.svg"} 
            alt="Checked" 
            className="absolute pointer-events-none h-3 w-3"
          />
        )}
      </div>
      <label className="block text-preset-4 text-gray-200 text-nowrap">{title}</label>
    </div>
  );
};

export default OptionsCheckbox;