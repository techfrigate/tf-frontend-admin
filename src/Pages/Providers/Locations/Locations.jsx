import React from "react";
import { FaPlus } from "react-icons/fa";

const Locations = () => {
  return (
    <div className="flex items-center justify-between pl-[8px]">
      {window.location.href.includes("locations") && (
        <div className="text-xs font-bold px-6 py-1.5 rounded-md text-white bg-[#64C6B0] box-border ">
          <button className="flex items-center gap-2">
            <FaPlus />
            New Location
          </button>
        </div>
      )}
    </div>
  );
};

export default Locations;
