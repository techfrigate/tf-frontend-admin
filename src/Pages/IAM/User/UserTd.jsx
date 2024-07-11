import { useState } from "react";
import { data } from "./UserData";
import EditUser from "./EditUser";
import { MdModeEdit } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";

const UserTd = ({ offset, itemsPerPage, toggleCreateProviderForm }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleEditClick = (user) => {
    setSelectedRole(user);
    setShowEditForm(true);
  };

  const handleSave = (updatedUser) => {
    console.log("Updated User:", updatedUser);
  };
  return (
    <>
      <EditUser
        show={showEditForm}
        onClose={() => setShowEditForm(false)}
        role={selectedRole}
        onSave={handleSave}
      />
      {data?.slice(offset, offset + itemsPerPage).map((item) => (
        <tr
          key={item.id}
          className="hover:bg-gray-100 bg-gray-50 border border-gray-300 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer "
        >
          <td className="py-4 px-6 font-medium">{item.user}</td>
          <td className="py-4 px-6">{item.Organization}</td>
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
          <td className="py-4 px-6">{item.Email}</td>
          <td className="py-4 px-6 text-[13px]">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                item.status === "Pending"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-[#b8f4e8] text-[#17584b]"
              }`}
            >
              {item.Roles}
            </span>
          </td>
          <td className="text-sm text-[#1f7d68] font-semibold">
            {item.Updated}
          </td>

          <td className="flex flex-flow-col gap-6 text-xl text-[#64c6b0] py-5 px-7 text-[13px]">
            <div className="hover:bg-gray-300 rounded-full p-2">
              <FaUserLock />
            </div>
            <div
              className="hover:bg-gray-300 rounded-full p-2"
              onClick={() => handleEditClick(item)}
            >
              <MdModeEdit />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default UserTd;
