import React, { useState } from "react";
import Establishment from "../../../Components/Providers/Establishment";
import Authorized from "../../../Components/Providers/Authorized";
import BankDetail from "../../../Components/Providers/BankDetail";
import OrganizationsTd from "./OrganizationsTd";
import OrganizationstrHeader from "./OrganizationstrHeader";
import ReactPaginate from "react-paginate";
import CustomTable from "../../../Components/Common/CustomTable";
import { data, OrganizationsForm } from "./OrganizationsData";

const formHeaders = [
  "Business Information",
  "Official Representative",
  "Financial Information",
];

const Organizations = ({ showForm }) => {
  const [activeTab, setActiveTab] = useState(0);
  // eslint-disable-next-line
  const [colorAnimation, setColorAnimation] = useState("to right");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const [providerData, setProviderData] = useState({
    EstablishmentFormValues: {
      legalName: "",
      displayName: "",
      displayImage: "",
      taxId: "",
      fileLink: "",
      cinNumber: "",
      cinNumberLink: "",
      gstId: "",
      gstIdLink: "",
      phoneNumber: "",
      website: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    AuthorizedFormValues: {
      FName: "",
      LName: "",
      NFLink: "",
      SATitle: "",
    },
    BankDetailFormValues: {
      AHName: "",
      ANumber: "",
      BName: "",
      RCode: "",
      CCheque: "",
    },
  });

  const handleTabClick = (index) => {
    const newDirection = index > activeTab ? "to left" : "to right";
    setColorAnimation(newDirection);
    setActiveTab(() => index);
  };

  return (
    <>
      {showForm ? (
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
              EstablishmentData={OrganizationsForm.EstablishmentData}
              EstablishmentFormValues={providerData.EstablishmentFormValues}
            />
          )}
          {activeTab === 1 && (
            <Authorized
              setActiveTab={setActiveTab}
              setProviderData={setProviderData}
              AuthorizedData={OrganizationsForm.AuthorizedData}
              AuthorizedFormValues={providerData.AuthorizedFormValues}
            />
          )}
          {activeTab === 2 && (
            <BankDetail
              setActiveTab={setActiveTab}
              setProviderData={setProviderData}
              BankDetailData={OrganizationsForm.BankDetailData}
              BankDetailFormValues={providerData.BankDetailFormValues}
            />
          )}
        </div>
      ) : (
        <div className="overflow-x-auto sm:rounded-lg ">
          <CustomTable trHeader={OrganizationstrHeader}>
            <OrganizationsTd offset={offset} itemsPerPage={itemsPerPage} />
          </CustomTable>
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-6 mb-0"}
            pageClassName={"mx-1"}
            pageLinkClassName={
              "block px-4 py-2 rounded hover:bg-[#4cb59c] hover:text-white"
            }
            previousClassName={"mx-1"}
            previousLinkClassName={
              "block px-3 py-2 rounded bg-slate-100 hover:bg-[#4cb59c] hover:text-white"
            }
            nextClassName={"mx-1"}
            nextLinkClassName={
              "block px-3 py-2 rounded bg-slate-100 hover:bg-[#4cb59c] hover:text-white"
            }
            activeClassName={"bg-[#64c6b0] text-white rounded"}
            activeLinkClassName={"border-none"}
          />
        </div>
      )}
    </>
  );
};

export default Organizations;
