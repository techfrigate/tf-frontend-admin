import React, { useState } from "react";
import Establishment from "../../../Components/Providers/Establishment";
import Authorized from "../../../Components/Providers/Authorized";
import BankDetail from "../../../Components/Providers/BankDetail";
import { WardForm } from "./WardData";

const formHeaders = ["Location", "Bed Type", "Bed Tags"];

const Ward = () => {
  const [activeTab, setActiveTab] = useState(0);
  // eslint-disable-next-line
  const [colorAnimation, setColorAnimation] = useState("to right");

  const [providerData, setProviderData] = useState({
    EstablishmentFormValues: {
      Organization: "",
      location: "",
    },
    AuthorizedFormValues: {
      description: "",
      bedtype: "",
    },
    BankDetailFormValues: {
      Bedtag: "",
      description: "",
    },
  });

  const handleTabClick = (index) => {
    const newDirection = index > activeTab ? "to left" : "to right";
    setColorAnimation(newDirection);
    setActiveTab(() => index);
  };

  return (
    <>
      <div className="h-[100%] pb-14 overflow-y-hidden">
        <div className="flex gap-4 border-b-2 border-gray-200 pb-2 sticky top-0 bg-white z-10 p-3 rounded-md">
          {formHeaders?.map((elm, index) => (
            <button
              key={index}
              className={` py-1 px-4 opacity-90 rounded-[4px] cursor-pointer transition duration-300 ease-in-out transform ${
                activeTab === index
                  ? "bg-[#64C6B0] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {elm}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <Establishment
            setActiveTab={setActiveTab}
            setProviderData={setProviderData}
            EstablishmentData={WardForm.EstablishmentData}
            EstablishmentFormValues={providerData.EstablishmentFormValues}
          />
        )}
        {activeTab === 1 && (
          <Authorized
            setActiveTab={setActiveTab}
            setProviderData={setProviderData}
            AuthorizedData={WardForm.AuthorizedData}
            AuthorizedFormValues={providerData.AuthorizedFormValues}
          />
        )}
        {activeTab === 2 && (
          <BankDetail
            setActiveTab={setActiveTab}
            setProviderData={setProviderData}
            BankDetailData={WardForm.BankDetailData}
            BankDetailFormValues={providerData.BankDetailFormValues}
          />
        )}
      </div>
    </>
  );
};

export default Ward;
