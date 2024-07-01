import React, { useState } from "react";
import RolesTd from "./RolesTd";
import RolestrHeader from "./RolestrHeader";
import ReactPaginate from "react-paginate";
import CustomTable from "../../../Components/Common/CustomTable";
import { data } from "./RolesData";

const Roles = ({ showForm, toggleCreateProviderForm }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="overflow-x-auto sm:rounded-lg ">
        <CustomTable trHeader={RolestrHeader}>
          <RolesTd
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
    </>
  );
};

export default Roles;
