import React, { useState } from "react";
import WardBedLocation from "../../../Components/Providers/Establishment";
import WardBedType from "../../../Components/Providers/Authorized";
import WardBedTags from "../../../Components/Providers/BankDetail";
import { WardForm } from "./WardData";

const tabHeaders = ["Location", "Bed Type", "Bed Tags"];

const Ward = () => {
  const [activeTab, setActiveTab] = useState(0);
  // eslint-disable-next-line
  const [animationDirection, setAnimationDirection] = useState("to right");
  const [formData, setFormData] = useState({
    bedLocation: {
      Organization: "",
      location: "",
    },
    bedType: {
      description: "",
      bedtype: "",
    },
    bedTag: {
      Bedtag: "",
      description: "",
    },
  });

  const handleTabClick = (index) => {
    const newDirection = index > activeTab ? "to left" : "to right";
    setAnimationDirection(newDirection);
    setActiveTab(index);
  };
  return (
    <>
      <div className="h-[100%] pb-14 overflow-y-hidden">
        <div className="flex gap-4 border-b-2 border-gray-200 pb-2 sticky top-0 bg-white z-10 p-3 rounded-md">
          {tabHeaders.map((header, index) => (
            <button
              key={index}
              className={` py-1 px-4 opacity-90 rounded-[4px] cursor-pointer transition duration-300 ease-in-out transform ${
                activeTab === index
                  ? "bg-[#64C6B0] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {header}
            </button>
          ))}
        </div>
        {activeTab === 0 && (
          <WardBedLocation
            setActiveTab={setActiveTab}
            setFormData={setFormData}
            EstablishmentData={WardForm.EstablishmentData}
            EstablishmentFormValues={formData.bedLocation}
          />
        )}
        {activeTab === 1 && (
          <WardBedType
            setActiveTab={setActiveTab}
            setFormData={setFormData}
            AuthorizedData={WardForm.AuthorizedData}
            AuthorizedFormValues={formData.bedType}
          />
        )}
        {activeTab === 2 && (
          <WardBedTags
            setActiveTab={setActiveTab}
            setFormData={setFormData}
            BankDetailData={WardForm.BankDetailData}
            BankDetailFormValues={formData.bedTag}
          />
        )}
      </div>
    </>
  );
};

export default Ward;
