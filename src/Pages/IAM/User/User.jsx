import React, { useState } from "react";
import UserTd from "./UserTd";
import UserteHeader from "./UserteHeader";
import ReactPaginate from "react-paginate";
import PersonalFrom from "./PersonalFrom";
import Contact from "./Contact";
// import UserServices from "./UserServices";
// import Roster from "./Roster";
import UserWork from "./UserWork";
import CustomTable from "../../../Components/Common/CustomTable";
import { data, UserFrom } from "./UserData";
// import ImageUploader from "./ImageUploader";
// , "Services", "Roster"
const tabHeaders = ["Personal", "Contact", "Work"];

const User = ({ showForm }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const [formData, setFormData] = useState({
    PersonalData: {
      organization: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      email: "",
      role: "",
      isDoctor: false,
    },
    ContactData: {
      Address1: "",
      Address2: "",
      Country: "",
      State: "",
      City: "",
      PinCode: "",
    },
    WorkData: {
      designation: "",
      specialty: "",
      superSpecialty: "",
      parentTeam: "",
      licenseNumber: "",
      hprId: "",
      reenterHprId: "",
      aboutDoctor: "",
    },
    ServiceData: {
      gracePeriod: "",
      maxFreeAppointments: "",
      teriffs: "",
      assistance: "",
    },
    RosterData: {
      Name: "",
      Email: "",
    },
  });

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const setProviderData = (section, data) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        ...data,
      },
    }));
  };

  return (
    <>
      {showForm ? (
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
          {/* <div className="flex items-center justify-start mt-2 gap-3">
            <div className="relative w-max h-14 ml-2 cursor-pointer text-white">
              <ImageUploader />
            </div>
            <div>
              <h1 className="font-semibold">Add New User</h1>
              <p className="font-thin">
                Click on the pencil icon to upload the image
              </p>
            </div>
          </div> */}
          {activeTab === 0 && (
            <PersonalFrom
              setActiveTab={setActiveTab}
              setProviderData={(data) => setProviderData("Personal", data)}
              EstablishmentData={UserFrom.PersonalData}
              EstablishmentFormValues={formData.PersonalData}
            />
          )}
          {activeTab === 1 && (
            <Contact
              setActiveTab={setActiveTab}
              setProviderData={(data) => setProviderData("Contact", data)}
              AuthorizedData={UserFrom.ContactData}
              AuthorizedFormValues={formData.ContactData}
            />
          )}
          {activeTab === 2 && (
            <UserWork
              setActiveTab={setActiveTab}
              setProviderData={(data) => setProviderData("WorkData", data)}
              AuthorizedData={UserFrom.WorkData}
              AuthorizedFormValues={formData.WorkData}
            />
          )}
          {/* {activeTab === 3 && (
            <UserServices
              setActiveTab={setActiveTab}
              setProviderData={(data) => setProviderData("ServiceData", data)}
              AuthorizedData={UserFrom.ServiceData}
              AuthorizedFormValues={formData.ServiceData}
            />
          )}
          {activeTab === 4 && (
            <Roster
              setActiveTab={setActiveTab}
              setProviderData={(data) => setProviderData("RosterData", data)}
              BankDetailData={UserFrom.RosterData}
              BankDetailFormValues={formData.RosterData}
            />
          )} */}
        </div>
      ) : (
        <div className="overflow-x-auto sm:rounded-lg ">
          <CustomTable trHeader={UserteHeader}>
            <UserTd offset={offset} itemsPerPage={itemsPerPage} />
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

export default User;
