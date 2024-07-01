import React from "react";
import { data } from "./OrganizationsData";

const OrganizationsTd = ({ offset, itemsPerPage }) => {
  return (
    <>
      {data?.slice(offset, offset + itemsPerPage).map((item) => (
        <tr
          key={item.id}
          className="hover:bg-gray-100 bg-gray-50 border border-gray-300 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer "
        >
          <td className="py-4 px-6 font-medium">
            {item.provider}
            <div className="text-xs text-gray-600">{item.location}</div>
          </td>
          <td className="py-4 px-6">{item.type}</td>
          <td className="py-4 px-6">
            {item.user}
            <div className="text-xs text-gray-600">{item.userDesc}</div>
          </td>
          <td className="py-4 px-6">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                item.status === "Pending"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-green-100 text-green-900"
              }`}
            >
              {item.status}
            </span>
          </td>
          <td className="py-4 px-6 text-[13px]">{item.created}</td>
          <td className="py-4 px-6 text-[13px]">{item.modified}</td>
        </tr>
      ))}
    </>
  );
};

export default OrganizationsTd;
