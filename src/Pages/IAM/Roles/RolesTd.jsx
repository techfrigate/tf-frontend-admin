import React, { useState } from "react";
import EditRoles from "./EditRoles";
import { data as initialData } from "./RolesData";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";

const RolesTd = ({ offset, itemsPerPage }) => {
  const [roles, setRoles] = useState(initialData);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setShowEditForm(true);
  };

  const handleDeleteClick = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleSave = (updatedRole) => {
    console.log("Updated role:", updatedRole);
  };

  return (
    <>
      <EditRoles
        show={showEditForm}
        onClose={() => setShowEditForm(false)}
        role={selectedRole}
        onSave={handleSave}
      />
      {roles.slice(offset, offset + itemsPerPage).map((item) => (
        <tr
          key={item.id}
          className="hover:bg-gray-100 bg-gray-50 border border-gray-300 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer "
        >
          <td className="py-4 pr-6 pl-8 font-medium w-[18%]">
            {item.provider}
            <div className="text-xs text-gray-600">{item.location}</div>
          </td>

          <td className="py-4 px-6 font-medium w-[21%] ">{item.Description}</td>
          <td className="py-4 px-6">{item.user}</td>
          <td className="py-4 px-6">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                item.status === "Pending"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-[#b8f4e8] text-[#17584b]"
              }`}
            >
              {item.status}
            </span>
          </td>
          <td className="py-4 px-6 text-[13px]">{item.created}</td>
          <td className="flex flex-flow-col gap-7 text-[#64c6b0] py-3 px-7 text-[20px]">
            <div className="hover:bg-gray-300 rounded-full p-2">
              <FaUserLock size={20} />
            </div>
            <div
              className="hover:bg-gray-300 rounded-full p-2"
              onClick={() => handleEditClick(item)}
            >
              <MdEdit size={20} />
            </div>
            <div
              className="hover:bg-gray-300 rounded-full p-2"
              onClick={() => handleDeleteClick(item.id)}
            >
              <MdDelete size={20} />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default RolesTd;
