import React, { useState } from "react";
import { IoArrowUpSharp, IoArrowDownSharp } from "react-icons/io5";


const LocationstrHeader = ({ setSortBy, setOrder }) => {
  const [createClick, setCreateClick] = useState(false);
  const [modifyClick, setModifyClick] = useState(false);
 
  function handleCreateClick() {
    if (!createClick) {
      setOrder(() => "desc");
      setCreateClick(() => true);
    } else {
      setOrder(() => "asc");
      setCreateClick(() => false);
    }
    setSortBy(() => "createdAt");
    setModifyClick(false);
  }

  function handleModifyClick() {
    if (!modifyClick) {
      setOrder(() => "desc");
      setModifyClick(() => true);
    } else {
      setOrder(() => "asc");
      setModifyClick(() => false);
    }
    setSortBy(() => "updatedAt");
    setCreateClick(false);
  }

  return (
    <tr className="text-white">
      <th className="py-4 px-6 text-left">Name</th>
      <th className="py-4 px-6 text-left w-1/4">Address</th>
      <th className="py-4 px-6 text-left">Status</th>
      <th className="py-4 px-6 text-left cursor-pointer" onClick={handleCreateClick}>
        Created
        <IoArrowUpSharp
          className={`inline ml-1 transition-transform duration-200 ${createClick ? "rotate-180" : ""}`}
          size={16}
        />
      </th>
      <th className="py-4 px-6 text-left cursor-pointer" onClick={handleModifyClick}>
        Last Modified
        <IoArrowUpSharp
          className={`inline ml-1 transition-transform duration-200 ${modifyClick ? "rotate-180" : ""}`}
          size={16}
        />
      </th>
      <th className="py-4 px-6 text-left">Edit</th>
      <th className="py-4 px-6 text-left">Delete</th>
    </tr>
  );
};

export default LocationstrHeader;
