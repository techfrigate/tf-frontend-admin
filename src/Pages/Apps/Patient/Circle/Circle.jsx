import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { circleForm } from "./CircleData";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "../../../../Components/Common/CustomButton";
import CustomInput from "../../../../Components/Common/CustomInput";

const Circle = ({ showForm, setShowForm }) => {
  const [checked, setChecked] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});

  const formRef = useRef();

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const [circleData, setCircleData] = useState({
    Code: "",
    Name: "",
    Suppourting: "",
    Remarks: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvalidFields = {};

    Object.keys(circleData).forEach((key) => {
      if (circleData[key].trim() === "") {
        newInvalidFields[key] = true;
      }
    });
    const hasNonEmptyProperty = Object.values(circleData).some(
      (value) => value !== ""
    );
    if (hasNonEmptyProperty && checked) {
      setShowForm(false);
    }
    setInvalidFields(newInvalidFields);
  };

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const handleChange = (name, value) => {
    setCircleData({
      ...circleData,
      [name]: value,
    });
    setInvalidFields(() => ({ ...invalidFields, [name]: false }));
  };

  return (
    <>
      {showForm ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4  px-4 pb-20 text-center  sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[1.5px]"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              ref={formRef}
              className="inline-block align-bottom bg-white shadow-lg pb-10 pl-4 pt-2 text-left rounded-xl transform transition-all  sm:my-8 sm:align-middle w-[100%] max-w-[36rem]"
            >
              <div className="relative bg-white rounded-xl ">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-2 right-2 text-2xl text-[#64C6B0] rounded px-3 py-2"
                >
                  <AiOutlineClose />
                </button>
                <div className="h-[100%] py-5 overflow-y-hidden">
                  <div>
                    <h1 className="text-xl font-semibold ml-4">
                      Patient Circle
                    </h1>
                    <div className="px-4 mt-4 flex flex-col gap-4 ">
                      {circleForm.map((elem) => (
                        <>
                          <CustomInput
                            key={elem.id}
                            type={elem.type}
                            label={elem.label}
                            id={elem.id}
                            placeholder={elem.placeholder}
                            value={circleData[elem.id]}
                            isInvalid={invalidFields[elem.id]}
                            onchange={(e) =>
                              handleChange(elem.id, e.target.value)
                            }
                          />
                          {elem.id === "Suppourting" && (
                            <div
                              onClick={toggleCheckbox}
                              className="flex items-center space-x-2 max-w-sm  border border-gray-300 rounded-md p-2 hover:bg-gray-100"
                            >
                              <div
                                className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                                  checked
                                    ? "bg-teal-500 border-teal-500"
                                    : "border-gray-400"
                                }`}
                              >
                                {checked && (
                                  <FaCheck className="text-white text-xs" />
                                )}
                              </div>
                              <span className="text-gray-700">
                                Supporting Document Required
                              </span>
                            </div>
                          )}
                        </>
                      ))}
                    </div>

                    <div className="flex flex-end absolute -bottom-5 right-8   w-24 ">
                      <CustomButton
                        type="button"
                        text="Save"
                        width={"w-full"}
                        onclick={(e) => handleSubmit(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold ml-4">Patient Circle</h1>
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-5 mb-36">
              <div className="bg-[#89c1b5] rounded-full p-3 flex items-center justify-center">
                <CiSearch className="bg-[#60988c] rounded-full text-white text-5xl p-1" />
              </div>
              <div className="text-base font-semibold text-center">
                <h1>No Record Found</h1>
                <span className="font-thin">Please Add New Patient Circle</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Circle;
