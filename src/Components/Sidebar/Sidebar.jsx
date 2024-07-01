import React, { useState } from "react";
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
    name: "Partners",
    icon: <FaRegHandshake size={21} />,
    subLink: [{ name: "Agreement", route: "/partners/agreement" }],
  },
  {
    name: "Patients",
    icon: <FaUserMd size={21} />,
    route: "/Patients",
  },
  {
    name: "Apps",
    icon: <IoAppsOutline size={21} />,
    subLink: [
      {
        name: "Practitioner",
        subLink: [{ name: "Roster", route: "/apps/practitioner/roster" }],
      },
      { name: "Admin", route: "/apps/admin" },
      {
        name: "Patient",
        subLink: [{ name: "Circle", route: "/apps/patient/circle" }],
      },
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

    subLink: [
      { name: "Departments", route: "/general/departments" },
      { name: "Services", route: "/general/services" },
      { name: "Tariff", route: "/general/tariff" },
      { name: "Appointments", route: "/general/appointments" },
      { name: "Medicines", route: "/general/medicines" },
      { name: "Diagnostic", route: "/general/diagnostic" },
      { name: "Vitals", route: "/general/vitals" },
    ],
  },
  {
    name: "Notification",
    icon: <FaBell size={21} />,
    route: "/notification",
  },
];

const Sidebar = ({ setShow, show }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [subLinkIndex, setSubLinkIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [subSubLinkIndex, setSubSubLinkIndex] = useState(null);

  const navigate = useNavigate();

  function handleSideClick(index, elm) {
    if (!elm.subLink) {
      setSelectedIndex(() => index);
      setOpenIndex(() => null);
      navigate(elm.route);
    } else {
      if (index !== openIndex) {
        setSubLinkIndex(null);
        setSubSubLinkIndex(null);
      }
      setOpenIndex(() => (openIndex === index ? null : index));
    }
  }

  function handleSubLinkClick(index, subelm, elm) {
    if (!subelm.subLink) {
      setSubLinkIndex(() => index);
      setSelectedIndex(() => null);
      navigate(subelm.route);
    } else {
      if (index !== subLinkIndex) {
        setSubSubLinkIndex(null);
      }
      setSubLinkIndex(() => (subLinkIndex === index ? null : index));
    }
  }

  function handleSubSubLinkClick(index, subSubelm, subelm) {
    setSubSubLinkIndex(() => index);
    navigate(subSubelm.route);
  }

  return (
    <div className="bg-gray-50 pl-[8px] h-[100%]">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-flex-start gap-2 pt-6 pb-[10px] px-[10px] ml-4">
          <img
            src="https://dev-central.unify.care/build/_assets/shortLogo-ZSVGBGEP.svg"
            className="w-11"
            alt=""
          />
        </div>
      </div>

      <div className={`pr-[5px] mt-3 h-[83%] w-max ${styles.customScrollbar}`}>
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
              className="flex justify-between w-full pl-6 py-[9px] h-full rounded-md hover:bg-gray-200"
              onClick={() => handleSideClick(index, elm)}
            >
              <div className="flex gap-3 items-center ">
                {elm.icon}
                <h2 className="text-base font-semibold">{elm.name}</h2>
              </div>
              {elm.subLink && (
                <MdKeyboardArrowUp
                  className={`mr-4 mt-1 text-[1.15rem] transition-transform ${
                    index === openIndex ? "" : "rotate-180"
                  }`}
                />
              )}
            </div>
            {index === openIndex && elm.subLink && (
              <div className="flex flex-col gap-2 w-[80%] mt-2 box-border ml-auto">
                {elm.subLink.map((subelm, subIndex) => (
                  <div
                    key={subIndex}
                    className={`${
                      subIndex === subLinkIndex && !subelm.subLink
                        ? "text-[#64C6B0] bg-[#FFFFFF]"
                        : "text-black font-thin "
                    } pl-4 rounded-md ${
                      subelm.subLink ? "" : "hover:bg-gray-200 "
                    }`}
                  >
                    <div
                      className="flex justify-between w-full py-[10px] rounded-md px-1 hover:bg-gray-200"
                      onClick={() => handleSubLinkClick(subIndex, subelm, elm)}
                    >
                      <h2 className="text-base font-semibold">{subelm.name}</h2>
                      {subelm.subLink && (
                        <MdKeyboardArrowUp
                          className={`mr-4 mt-1 text-[1.15rem] transition-transform ${
                            subIndex === subLinkIndex ? "" : "rotate-180"
                          }`}
                        />
                      )}
                    </div>
                    {subIndex === subLinkIndex && subelm.subLink && (
                      <div className="flex flex-col gap-2 w-[80%] mt-2 box-border ml-auto">
                        {subelm.subLink.map((subSubelm, subSubIndex) => (
                          <div
                            key={subSubIndex}
                            className={`${
                              subSubIndex === subSubLinkIndex
                                ? "text-[#64C6B0] bg-[#FFFFFF]"
                                : "text-black font-thin"
                            } pl-4 rounded-md ${
                              subSubelm.subLink ? "" : "hover:bg-gray-200"
                            }`}
                          >
                            <h2
                              onClick={() =>
                                handleSubSubLinkClick(
                                  subSubIndex,
                                  subSubelm,
                                  subelm
                                )
                              }
                              className="text-base font-semibold py-[8px]"
                            >
                              {subSubelm.name}
                            </h2>
                          </div>
                        ))}
                      </div>
                    )}
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
