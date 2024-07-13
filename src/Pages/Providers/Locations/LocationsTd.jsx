import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { deleteLocation } from "../../../redux/locations/locationSlice";

const LocationsTd = ({ toggleCreateProviderForm }) => {
  const { locations } = useSelector((state) => state.locations);
  const navigate = useNavigate();

  function formatDate(date) {
    return format(parseISO(date), 'MMM dd, yyyy hh:mm aa');
  }

  const dispatch =  useDispatch()
  const handleEditClick = (id) => {
    navigate(`/providers/locations?id=${id}`);
    toggleCreateProviderForm();
  };

  const handleDeleteClick= (id)=>{
dispatch(deleteLocation(id))
  }
  return (
    <>
      {locations.length > 0 && locations.slice(0, 5).map((item) => (
        <tr
          key={item.id}
          className="hover:bg-gray-100 bg-gray-50 border border-gray-300 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer "
        >
          <td className="py-4 px-6 font-medium">
            {item?.tenantDisplayName}
          </td>
          <td className="py-4 px-6">
            {item.address.addressLine1}
            <div className="text-xs text-gray-600">{`${item.address.city}, ${item.address.state}`}</div>
          </td>
          <td className="py-4 px-6">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                item.status === "Pending"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-green-100 text-green-900"
              }`}
            >
              Active
            </span>
          </td>
          <td className="py-4 px-6 text-[13px]">{formatDate(item.createdAt)}</td>
          <td className="py-4 px-6 text-[13px]">{formatDate(item.updatedAt)}</td>
          <td className=" py-4 px-6 text-[#64c6b0] text-[20px]">
            <div
              className="hover:bg-gray-300 rounded-full flex items-center justify-center w-max py-1 px-1"
              onClick={() => handleEditClick(item._id)}
            >
              <MdEdit size={24} />
            </div>
          </td>

          <td className=" py-4 px-6 ">
            <div
              className="text-red-400 hover:bg-gray-300 rounded-full flex items-center justify-center w-max py-1 px-1"
              onClick={() => handleDeleteClick(item._id)}
            >
              <MdDelete size={24} />
            </div>
          </td>

        </tr>
      ))}
    </>
  );
};

export default LocationsTd;
