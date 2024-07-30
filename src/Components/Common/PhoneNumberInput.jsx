import React from "react";

const PhoneNumberInput = ({
    type,
  label,
  id,
  placeholder,
  value,
  dialCode,
  isInvalid,
  onChangeDialCode,
  onChangeNumber,
}) => {
  const dialCodes = ["+91", "+1", "+44", "+61", "+81"]; // Add more as needed

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label> 
      <div className="flex  flex-col mt-1.5">
      <div className="flex">

     
        <select
          className={`block w-1/5 px-3 py-[7px] border ${
            isInvalid ? "border-red-500 shadow-md shadow-red-400/30" : "border-gray-300"
          } rounded-l-lg focus:outline-none focus:shadow-md focus:border-[#64C6B0] focus:shadow-[#64C6B0]/30`}
          value={dialCode}
          onChange={(e) => onChangeDialCode(e.target.value)}
        >
          {dialCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <input
          type={type}
          id={id}
          className={`block w-4/5 px-3 py-[7px] border-t border-b border-r ${
            isInvalid ? "border-red-500 shadow-md shadow-red-400/30" : "border-gray-300"
          } rounded-r-lg focus:outline-none focus:shadow-md focus:border-[#64C6B0] focus:shadow-[#64C6B0]/30`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeNumber(e.target.value)}
        />
         </div>
       {isInvalid && <p className="mt-[2px] text-[12px] text-red-700">{isInvalid}</p>}
        
      </div>
    </div>
  );
};

export default PhoneNumberInput;
