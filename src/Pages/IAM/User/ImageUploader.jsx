import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

const ImageUploader = () => {
  const [image, setImage] = useState();
  ("https://t4.ftcdn.net/jpg/03/24/22/77/360_F_324227760_73JhXgDh5OFsYuymiMzn6s7FHHzf3Ef0.jpg");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        id="imageUploader"
        className="hidden"
        onChange={handleImageChange}
      />
      <label htmlFor="imageUploader" className="relative inline-block">
        <div
          className={`w-16 h-16 rounded-full ${
            image ? "" : "bg-gray-300"
          } flex items-center justify-center text-3xl text-white `}
          style={{
            backgroundImage: image ? `url(${image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!image && "DV"}
        </div>
        <MdOutlineEdit
          className="absolute -bottom-1 -right-1 bg-[#64C6B0] rounded-full p-1 border border-gray-200 cursor-pointer"
          size={25}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
