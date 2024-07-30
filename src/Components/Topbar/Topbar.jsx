import React, { useState, useRef, useEffect } from "react";
import { AiOutlineBell, AiOutlineQuestionCircle } from "react-icons/ai";
import styles from "../../Css/Topbar/Topbar.module.css";
import ProfileModal from "./ProfileModal";
import HelpModal from "./HelpModal";
import NotificationModal from "./NotificationModal";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../Common/CustomButton";

const Topbar = ({ toggleCreateProviderForm, showForm }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
const navigate =  useNavigate();
  const { pathname } = useLocation();

  const thanosRef = useRef();

  const handleClickOutside = (event) => {
    if (thanosRef.current && !thanosRef.current.contains(event.target)) {
      setIsNotificationModalOpen(false);
      setIsHelpModalOpen(false);
      setIsProfileModalOpen(false);
    }
  };

  const handleLocationclick = ()=>{
    navigate("/providers/locations")
    toggleCreateProviderForm();
  }

  const handleUsersBackClick = ()=>{
    navigate("/iam/users")
    toggleCreateProviderForm();
  }  
  
  useEffect(() => {
    if (isNotificationModalOpen || isHelpModalOpen || isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

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
            {"Admin > "}
            {pathSegments.map((segment, index) => (
              <span key={index}>
                {index > 0 && (
                  <span className="breadcrumb-separator"> {" > "}</span>
                )}
                <span className="capitalize">{segment}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-center gap-6 text-[#64C6B0] relative">
          {window.location.href.includes("locations") && (
            <CustomButton
              text={!showForm ? "Locations +" : "Back"}
              onclick={handleLocationclick}
            ></CustomButton>
          )}
          {window.location.href.includes("organizations") && (
            <CustomButton
              text={!showForm ? "Organizations +" : "Back"}
              onclick={toggleCreateProviderForm}
            ></CustomButton>
          )}
          {window.location.href.includes("circle") && (
            <CustomButton
              text={"Patient Circle +"}
              onclick={toggleCreateProviderForm}
            ></CustomButton>
          )}
          {window.location.href.includes("user") && (
            <CustomButton
              text={!showForm ? "User +" : "Back"}
              onclick={handleUsersBackClick}
            ></CustomButton>
          )}
          <div className="relative cursor-pointer" ref={thanosRef}>
            <AiOutlineQuestionCircle size={25} onClick={handleHelpClick} />
            {isHelpModalOpen && <HelpModal />}
          </div>
          <div ref={thanosRef}>
            <div
              className="relative cursor-pointer"
              onClick={handleNotificationClick}
            >
              <AiOutlineBell size={25} />
              <div className={`${styles.wave_dot_container}`}>
                <span className={`${styles.wave_dot}`}></span>
                <span className={`${styles.wave_animation}`}></span>
              </div>
              {isNotificationModalOpen && <NotificationModal />}
            </div>
          </div>

          <div className="relative w-8 h-8 cursor-pointer" ref={thanosRef}>
            <img
              src="https://t4.ftcdn.net/jpg/03/24/22/77/360_F_324227760_73JhXgDh5OFsYuymiMzn6s7FHHzf3Ef0.jpg"
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
