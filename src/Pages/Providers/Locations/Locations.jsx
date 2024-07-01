import React, { useState } from "react";
import LocationInfo from "../../../Components/Providers/LocationInfo";
import LocationsTd from "./LocationsTd";
import LocationstrHeader from "./LocationstrHeader";
import ReactPaginate from "react-paginate";
import CustomTable from "../../../Components/Common/CustomTable";
import { data, LocationFrom } from "./LocationsData";

const Locations = ({ showForm, toggleCreateProviderForm }) => {
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [besicClientInfo, setBesicClientInfo] = useState({
    organization: "",
    location: "",
    gender: "",
    PNumber: "",
    address1: "",
    address2: "",
    country: "",
    zipcode: "",
    city: "",
    state: "",
    NFLink: "",
  });

  return (
    <>
      {showForm ? (
        <div className="h-[100%] pb-14 overflow-y-hidden">
          <div className="flex gap-4 border-b-2 border-gray-200 pb-2 sticky top-0 bg-white z-10 p-3 rounded-md">
            <h1 className="text-2xl font-semibold text-[#64C6B0] ml-8">
              Add Location
            </h1>
          </div>

          <LocationInfo
            setBesicClientInfo={setBesicClientInfo}
            besicClientInfo={besicClientInfo}
            setActiveTab={setActiveTab}
            UserBasicInfo={LocationFrom.UserBasicInfo}
          />
        </div>
      ) : (
        <div className="overflow-x-auto sm:rounded-lg ">
          <CustomTable trHeader={LocationstrHeader}>
            <LocationsTd
              offset={offset}
              itemsPerPage={itemsPerPage}
              toggleCreateProviderForm={toggleCreateProviderForm}
            />
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

export default Locations;
