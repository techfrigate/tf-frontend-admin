import React, { useRef, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import styles from "../../Css/Roaster/Roster.module.css";
import { useSelector } from "react-redux";

const lightColors = [
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-red-100",
  "bg-gray-100",
];

const DoctorSelector = ({
  doctors,
  selectedDoctors,
  showDoctors,
  setShowDoctors,
  handleFocus,
  handleSelectDoctor,
  handleRemoveDoctor,
  invalidFields,
}) => {
  const doctorsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (doctorsRef.current && !doctorsRef.current.contains(event.target)) {
        setShowDoctors(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [doctorsRef]);

 
   

  return (
    <div className="mb-4" ref={doctorsRef}>
      <label className="block mb-1 font-semibold text-sm text-gray-600">
        Practitioners
      </label>
      <div
        className={`rounded-md w-full py-2 px-2 ${
          selectedDoctors.length === 0 ? "flex" : "block"
        } gap-4 justify-between items-center text-gray-500 shadow-inner border max-h-[100px] ${
          invalidFields?.selectedDoctors
            ? "shadow-md border-red-700 shadow-red-700/30"
            : ""
        } customScrollbar ${
          showDoctors ? "shadow-md border-[#64C6B0] shadow-[#64C6B0]/30" : ""
        }`}
      >
        {selectedDoctors.length > 0 ? (
          <div className="h-full grid grid-cols-1 gap-1 gap-y-2 justify-between mb-2">
            {selectedDoctors.map((elm, index) => (
              <motion.div
                className={`flex justify-between shadow-inner items-center w-[60%] pr-1 py-1.5 text-gray-900 rounded-lg ${
                  lightColors[index % lightColors.length]
                }`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ delay: index * 0.1 }}
                key={elm._id}
              >
                <div className="flex items-center gap-1.5 w-max px-2">
                  <p className="w-[20px] h-[20px] text-[10px] rounded-full bg-[#64C6B0] text-white flex items-center justify-center">
                    {`${elm.firstName[0]} ${elm.lastName[0]}`}
                  </p>
                  <p className="text-[15px] ">{`${elm.firstName} ${elm.lastName}`}</p>
                </div>
                <RxCross1 size={12} className="cursor-pointer" onClick={() => handleRemoveDoctor(elm._id)} />
              </motion.div>
            ))}
          </div>
        ) : (
          <FaRegUser size={20} className="text-gray-500" />
        )}
        <input
          type="text"
          placeholder="Search by name, Specialization"
          className={`border-none w-[100%] outline-none bg-transparent ${styles.roster_placeholder}`}
          onFocus={handleFocus}
        />
      </div>
      {showDoctors && (
        <div className=" customScrollbar h-[100%] max-h-[150px] rounded-md rounded-tl-none rounded-tr-none shadow-xl relative z-10 overflow-hidden bg-white">
         
            {doctors.length>0&& doctors.map((elm, index) => (
              <motion.div
                className="flex justify-between items-center pr-1 cursor-pointer m-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ delay: index * 0.3 }}
                key={elm.id}
                onClick={() => handleSelectDoctor(index, elm._id)}
              >
                <div className="flex items-center gap-1.5 w-max px-2">
                  <p className="w-[28px] h-[28px] text-[12px] rounded-full bg-[#64C6B0] text-white flex items-center justify-center">
                    {`${elm.firstName[0]} ${elm.lastName[0]}`}
                  </p>
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold text-[13px] opacity-80">{`${elm.firstName} ${elm.lastName}`}</p>
                    <p className="text-[12px] text-gray-600">{elm.userType}</p>
                  </div>
                </div>
                {elm.isSelected && <IoMdCheckmark size={21} className="text-[#64C6B0]" />}
              </motion.div>
            ))}
        
        </div>
      )}
    </div>
  );
};

export default DoctorSelector;