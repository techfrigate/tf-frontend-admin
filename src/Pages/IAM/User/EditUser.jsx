import React, { useState, useRef, useEffect } from "react";
import CustomButton from "../../../Components/Common/CustomButton";
import { AiOutlineClose } from "react-icons/ai";

const EditUser = ({ show, onClose, user, onSave }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [organization, setOrganization] = useState(
    user ? user.organization : ""
  );

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleSave = () => {
    onSave({ ...user, name, organization });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[1.5px]"></div>
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-md shadow-md w-4/12 max-w-xl relative z-10"
      >
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-600 font-semibold rounded px-3 py-2"
        >
          <AiOutlineClose />
        </button>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User*
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="User"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Organization*
          </label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Organization"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <CustomButton onclick={handleSave} text={"Save"} />
          <CustomButton onclick={onClose} text={"Cancel"} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
