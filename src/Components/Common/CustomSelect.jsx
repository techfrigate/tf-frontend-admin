import React from "react";

const CustomSelect = ({ id, label, value, options, isInvalid, onChange }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className={`block w-full pl-3 pr-10 py-2 text-base border ${
          isInvalid ? "border-red-500 shadow-md shadow-red-400/30" : "border-gray-300"
        } rounded-md focus:outline-none focus:shadow-md focus:border-[#64C6B0] focus:shadow-[#64C6B0]/30`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      {isInvalid && <p className="mt-[2px] text-[12px] text-red-700">{isInvalid}</p>}
    </div>
  );
};

export default CustomSelect;
