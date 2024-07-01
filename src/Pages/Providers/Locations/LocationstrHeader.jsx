import React from "react";
import { IoArrowUpSharp } from "react-icons/io5";

const LocationstrHeader = (
  <tr className="text-white">
    <th className="py-4 px-6 text-left">
      Provider
      <IoArrowUpSharp className="inline ml-1" size={16} />
    </th>
    <th className="py-4 px-6">Type</th>
    <th className="py-4 px-6 text-left">User</th>
    <th className="py-4 px-6 text-left">Status</th>
    <th className="py-4 px-6 text-left">
      Created
      <IoArrowUpSharp className="inline ml-1" size={16} />
    </th>
    <th className="py-4 px-6 text-left">
      Last Modified
      <IoArrowUpSharp className="inline ml-1" size={16} />
    </th>
    <th></th>
  </tr>
);

export default LocationstrHeader;
