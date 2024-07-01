import React from "react";
import { data } from "./LocationsData";
import { MdEdit } from "react-icons/md";

const LocationsTd = ({ offset, itemsPerPage, toggleCreateProviderForm }) => {
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
          <td className="flex flex-flow-col gap-8  text-[#64c6b0] py-4 px-7 text-[20px]">
            <div
              className="hover:bg-gray-300 rounded-full p-1"
              onClick={toggleCreateProviderForm}
            >
              <MdEdit size={24} />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default LocationsTd;
