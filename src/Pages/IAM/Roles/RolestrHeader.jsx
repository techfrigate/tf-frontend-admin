import React from "react";
import { IoArrowUpSharp } from "react-icons/io5";

const RolestrHeader = (
  <tr className="text-white">
    <th className="py-4 px-6 text-left">
      Name
      <IoArrowUpSharp className="inline ml-1" size={16} />
    </th>
    <th className="py-4 px-6 text-left">Description</th>
    <th className="py-4 px-6 text-left">Updated By</th>
    <th className="py-4 px-6 text-left">Apps</th>
    <th className="py-4 px-6 text-left">
      Last Updated
      <IoArrowUpSharp className="inline ml-1" size={16} />
    </th>
    <th></th>
  </tr>
);

export default RolestrHeader;
