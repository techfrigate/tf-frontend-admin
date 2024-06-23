import React, { useState } from "react";
// import {
//   FaTachometerAlt,
//   FaUserShield,
//   FaUsers,
//   FaUser,
//   FaTh,
//   FaCheckCircle,
//   FaHeart,
//   FaCogs,
//   FaBell,
// } from "react-icons/fa";

import {
  FaUserFriends,
  FaUserShield,
  FaUserMd,
  FaBriefcase,
  FaHandHoldingHeart,
  FaHandsHelping,
  FaFileInvoiceDollar,
  FaCogs,
  FaBell,
} from "react-icons/fa";
import { IoAppsOutline } from "react-icons/io5";
import styles from "../../Css/Sidebar/Sidebar.module.css";
import { FaRegHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
// import { FaPlus } from "react-icons/fa";
// import { button } from "@material-tailwind/react";
// import { Button, tooltip } from "@material-tailwind/react";

const sidebarLinks = [
  {
    name: "Providers",
    icon: <FaUserFriends size={21} />,
    subLink: [
      { name: "Organizations", route: "/providers/organizations" },
      { name: "Locations", route: "/providers/locations" },
      { name: "Ward", route: "/providers/ward" },
      { name: "Agreements", route: "/providers/agreements" },
    ],
  },
  {
    name: "IAM",
    icon: <FaUserShield size={21} />,
    subLink: [
      { name: "Groups", route: "/iam/groups" },
      { name: "Roles", route: "/iam/roles" },
      { name: "Users", route: "/iam/users" },
    ],
  },

  {
    name: "Patners",
    icon: <FaRegHandshake size={21} />,
    subLink: [{ name: "Agreement", route: "/patners/agreement" }],
  },
  {
    name: "Patients",
    icon: <FaUserMd size={21} />,
    route: "/patients",
  },
  {
    name: "Apps",
    icon: <IoAppsOutline size={21} />,
    subLink: [
      { name: "Practitioner", route: "/apps/practitioner/roster" },
      { name: "Admin", route: "/apps/admin" },
      { name: "Patient", route: "/apps/patient/circle" },
      { name: "Studio", route: "/apps/studio" },
    ],
  },
  {
    name: "WorkSpace",
    icon: <FaBriefcase size={21} />,
    subLink: [
      { name: "Workforms", route: "/workSpace/Workforms" },
      { name: "Workflows", route: "/workSpace/Workflows" },
      { name: "Workforms", route: "/workSpace/Workforms" },
    ],
  },
  {
    name: "Trust",
    icon: <FaHandHoldingHeart size={21} />,
    route: "/trust",
  },
  {
    name: "Support",
    icon: <FaHandsHelping size={21} />,
    route: "/support",
  },
  {
    name: "Billing",
    icon: <FaFileInvoiceDollar size={21} />,
    route: "/billing",
  },
  {
    name: "General",
    icon: <FaCogs size={21} />,
    route: "/general",
  },
  {
    name: "Notification",
    icon: <FaBell size={21} />,
    route: "/notification",
  },
];

const Sidebar = ({ setShow, show }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [subLinkindex, setSubLinkindex] = useState(null);
  const [openindex, setOpenIndex] = useState(null);

  const navigate = useNavigate();
  function handleSideClick(index, elm) {
    if (!elm.subLink) {
      setSelectedIndex(() => index);
      setOpenIndex(() => null);
      navigate(elm.route);
    } else {
      if (index !== openindex) {
        setSubLinkindex(null);
      }
      setOpenIndex(() => (openindex === index ? null : index));
    }
  }

  function handleSubLinkClick(index, subelm, elm) {
    setSubLinkindex(() => index);
    setSelectedIndex(() => null);
    navigate(subelm.route);
  }

  return (
    <div className="bg-gray-50 pl-[8px] h-[100%]">
      <div className="flex flex-col gap-5 ">
        <div className="flex items-center justify-flex-start gap-2 pt-6 pb-[10px] px-[10px]  ml-4">
          <img
            src="https://dev-central.unify.care/build/_assets/shortLogo-ZSVGBGEP.svg"
            className="w-11"
            alt=""
          />
        </div>
      </div>

      <div
        className={` pr-[5px] mt-3 h-[83%]  w-max ${styles.customScrollbar}`}
      >
        {sidebarLinks.map((elm, index) => (
          <div
            key={index}
            className={`${
              index === selectedIndex && !elm.subLink
                ? "text-[#64C6B0] bg-[#FFFFFF]"
                : "text-black font-thin opacity-50"
            } w-[190px] rounded-md mb-2 cursor-pointer ${
              !elm.subLink ? "hover:bg-gray-200" : ""
            }`}
          >
            <div
              className="flex justify-between w-full pl-6 py-[9px] hover:bg-gray-200 h-full rounded-md"
              onClick={() => handleSideClick(index, elm)}
            >
              <div className="flex gap-3 items-center ">
                {elm.icon}
                <h2 className="text-base font-semibold">{elm.name}</h2>
              </div>
              {elm.subLink && (
                <MdKeyboardArrowUp
                  className={`mr-4 mt-1 text-[1.15rem] transition-transform ${
                    index === openindex ? "" : "rotate-180"
                  }`}
                />
              )}
            </div>
            {index === openindex && elm.subLink && (
              <div className="flex flex-col gap-2 w-[75%] mt-2 box-border ml-auto ">
                {elm.subLink.map((subelm, indexlink) => (
                  <div
                    className={`py-[8px]  ${
                      indexlink === subLinkindex
                        ? "text-[#64C6B0] bg-[#FFFFFF]"
                        : "text-black  font-thin"
                    } hover:bg-gray-200 pl-4 rounded-md`}
                  >
                    <h2
                      key={indexlink}
                      onClick={() => handleSubLinkClick(indexlink, subelm, elm)}
                      className="text-base font-semibold"
                    >
                      {subelm.name}
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
