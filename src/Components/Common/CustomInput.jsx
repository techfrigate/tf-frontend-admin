import React from "react";

const CustomInput = ({
  type,
  id,
  label,
  placeholder,
  onchange,
  value,
  isInvalid,
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor={id} className="text-gray-800 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        className={`flex  h-10 w-full rounded-lg border ${
          isInvalid ? "border-red-500 shadow-md shadow-red-400/20" : "border-gray-300 "
        } bg-white px-4 py-2 text-sm focus:outline-none focus:shadow-md focus:border-[#64C6B0] focus:shadow-[#64C6B0]/30`}
        onChange={(e) => onchange(e)}
      />
      {isInvalid && <p className="text-[12px] text-red-700 -mt-1">{isInvalid}</p>}
    </div>
  );
};

export default CustomInput;
