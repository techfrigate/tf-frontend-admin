import React, { useState } from "react";
import { AiOutlineBell, AiOutlineQuestionCircle } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import styles from "../../Css/Topbar/Topbar.module.css";
import ProfileModal from "./ProfileModal";
import HelpModal from "./HelpModal";
import NotificationModal from "./NotificationModal";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((x) => x);
  const handleProfileClick = () => {
    setIsProfileModalOpen(() => !isProfileModalOpen);
    setIsHelpModalOpen(() => false);
    setIsNotificationModalOpen(() => false);
  };

  const handleHelpClick = () => {
    setIsHelpModalOpen(() => !isHelpModalOpen);
    setIsProfileModalOpen(() => false);
    setIsNotificationModalOpen(() => false);
  };

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(() => !isNotificationModalOpen);
    setIsProfileModalOpen(() => false);
    setIsHelpModalOpen(() => false);
  };

  return (
    <div className="w-full p-2">
      <div className="bg-white rounded-md px-10 py-2 flex justify-between items-center">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-2xl font-bold mb-1 text-gray-800">Hospital</h1>

          <p className="breadcrumb">
            {pathSegments.map((segment, index) => (
              <span key={index}>
                {index > 0 && (
                  <span className="breadcrumb-separator">{" > "}</span>
                )}
                <span className="capitalize">{segment}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-center gap-6 text-[#64C6B0] relative">
          <div className="relative cursor-pointer">
            <AiOutlineQuestionCircle size={25} onClick={handleHelpClick} />
            {isHelpModalOpen && <HelpModal />}
          </div>
          <div className="relative cursor-pointer">
            <AiOutlineBell size={25} onClick={handleNotificationClick} />
            <div className={`${styles.wave_dot_container}`}>
              <span className={`${styles.wave_dot}`}></span>
              <span className={`${styles.wave_animation}`}></span>
            </div>
            {isNotificationModalOpen && <NotificationModal />}
          </div>
          <div className="relative w-8 h-8 cursor-pointer">
            <img
              src="https://t4.ftcdn.net/jpg/03/24/22/77/360_F_324227760_73JhXgDh5OFsYuymiMzn6s7FHHzf3Ef0.jpg" // Make sure the path to your image is correct
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 border-[#64C6B0] shadow-lg"
              onClick={handleProfileClick}
            />
            {isProfileModalOpen && <ProfileModal />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
