import React from "react";
import { IoArrowUpSharp } from "react-icons/io5";

const UserteHeader = (
  <tr className="text-white">
    <th className="py-4 px-6 text-left">
      User
      <IoArrowUpSharp className="inline ml-1" size={16} />
    </th>
    <th className="py-4 px-6 text-left">Organization</th>
    <th className="py-4 px-6 text-left">Status</th>
    <th className="py-4 px-6 text-left">
      Email Id
      <IoArrowUpSharp className="inline ml-1" size={16} />
    </th>
    <th className="py-4 px-6 text-left">Roles Assigned</th>
    <th className="py-4 px-6 text-left">Last Updated</th>
    <th></th>
  </tr>
);

export default UserteHeader;
