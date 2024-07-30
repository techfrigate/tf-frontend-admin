import React, { useEffect, useState } from "react";
import UserTd from "./UserTd";
import UserteHeader from "./UserteHeader";
import ReactPaginate from "react-paginate";
import PersonalFrom from "./PersonalFrom";
import Contact from "./Contact";
import { format } from 'date-fns';
import UserWork from "./UserWork";
import CustomTable from "../../../Components/Common/CustomTable";
import { data, UserFrom } from "./UserData";
import { useDispatch, useSelector } from "react-redux";
import { useDomEvent } from "framer-motion";
import { getProfiles, getSingleProfile } from "../../../redux/users/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
// import ImageUploader from "./ImageUploader";
// , "Services", "Roster"
const tabHeaders = ["Personal", "Contact", "Work"];

const User = ({ showForm,toggleCreateProviderForm }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const[sortBy,setSortBy] =  useState("createdAt")
  const[order,setOrder] =  useState("ASC")
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    PersonalData: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      dialCode:"+91",
      phoneNumber: "",
      email: "",
      userType: "",
    },
    ContactData: {
      Address1: "",
      Address2: "",
      Country: "",
      State: "",
      City: "",
      zipCode: "",
    },
    WorkData: {
      designation: "",
      speciality: "",
      experience: "",
      licenseNumber: "",
      hprId: "",
      reenterHprId: "",
      aboutDoctor: "",
      qualification:""
    },
    // ServiceData: {
    //   gracePeriod: "",
    //   maxFreeAppointments: "",
    //   teriffs: "",
    //   assistance: "",
    // },
    // RosterData: {
    //   Name: "",
    //   Email: "",
    // },
  });

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected+1);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const dispatch= useDispatch()
  useEffect(()=>{
dispatch(getProfiles({currentPage,sortBy,order,itemsPerPage}))
  },[sortBy,order,currentPage,itemsPerPage])
   
  const {editProfileStatus,totalPages,singleUser} = useSelector((state)=>state.users)
 console.log(singleUser);


  
 const [searchParams] = useSearchParams();
 const ProId = searchParams.get("ProId");

 useEffect(()=>{
  dispatch(getSingleProfile(ProId))
 },[ProId])

 useEffect(() => {
  if (singleUser) {
    const { address = {}, work = {},phoneNumber={} } = singleUser;
    
    let editFormData = {
      PersonalData: {
        firstName: singleUser.firstName || "",
        lastName: singleUser.lastName || "",
        dateOfBirth: singleUser.dob?format(new Date(singleUser.dob), 'yyyy-MM-dd'): "",
        gender: singleUser.gender || "",
        dialCode:phoneNumber?.dialCode || "+91",
        phoneNumber: phoneNumber?.value || "",
        email: singleUser.email || "",
        userType: singleUser.userType || "",
      },
      ContactData: {
        Address1: address.addressLine1 || "",
        Address2: address.addressLine2 || "",
        Country: address.country || "",
        State: address.state || "",
        City: address.city || "",
        zipCode: address.zipCode || "",
      },
      WorkData: {
        designation: work.designation || "",
        speciality: work.speciality || "",
        experience: work.experience || "",
        licenseNumber: work.licenseNumber || "",
        hprId: work.hprId || "",
        reenterHprId: work.hprId || "",
        aboutDoctor: work.about || "",
        qualification: work.qualification || ""
      },
    };

    setFormData(editFormData);
  }
}, [singleUser]);


useEffect(()=>{
  if(editProfileStatus==="succeeded"){
    navigate("/iam/users")
    toggleCreateProviderForm();
    setFormData(()=>({
      PersonalData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        dialCode:"+91",
        phoneNumber: "",
        email: "",
        userType: "",
      },
      ContactData: {
        Address1: "",
        Address2: "",
        Country: "",
        State: "",
        City: "",
        zipCode: "",
      },
      WorkData: {
        designation: "",
        speciality: "",
        experience: "",
        licenseNumber: "",
        hprId: "",
        reenterHprId: "",
        aboutDoctor: "",
        qualification:""
  }
}
)
)
  }

},[editProfileStatus])

useEffect(()=>{
  if(!showForm){
    setActiveTab(()=>0)
    setFormData(()=>({
      PersonalData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        dialCode:"+91",
        phoneNumber: "",
        email: "",
        userType: "",
      },
      ContactData: {
        Address1: "",
        Address2: "",
        Country: "",
        State: "",
        City: "",
        zipCode: "",
      },
      WorkData: {
        designation: "",
        speciality: "",
        experience: "",
        licenseNumber: "",
        hprId: "",
        reenterHprId: "",
        aboutDoctor: "",
        qualification:""
  }
}
)
)

  }

},[showForm])


  return (
    <>
      {showForm ? (
        <div className="h-[100%] pb-14 overflow-y-hidden">
          <div className="flex gap-4 border-b-2 border-gray-200 pb-2 sticky top-0 bg-white z-10 p-3 rounded-md">
            {tabHeaders.map((header, index) => (
              <button
                key={index}
                className={` py-1 px-4 opacity-90 rounded-[4px] cursor-pointer transition duration-300 ease-in-out transform ${
                  activeTab === index
                    ? "bg-[#64C6B0] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {header}
              </button>
            ))}
          </div>
          {/* <div className="flex items-center justify-start mt-2 gap-3">
            <div className="relative w-max h-14 ml-2 cursor-pointer text-white">
              <ImageUploader />
            </div>
            <div>
              <h1 className="font-semibold">Add New User</h1>
              <p className="font-thin">
                Click on the pencil icon to upload the image
              </p>
            </div>
          </div> */}
          {activeTab === 0 && (
            <PersonalFrom
              setActiveTab={setActiveTab}
              setFormData={setFormData}
              PersonalDataForm={UserFrom.PersonalData}
              PersonalDataState={formData.PersonalData}
             
            />
          )}
          {activeTab === 1 && (
            <Contact
              setActiveTab={setActiveTab}
              setFormData={setFormData}
              ContactDataForm={UserFrom.ContactData}
              ContactDataState={formData.ContactData}
             
            />
          )}
          {activeTab === 2 && (
            <UserWork
              setActiveTab={setActiveTab}
              setFormData={setFormData}
              WorkDataStateForm={UserFrom.WorkData}
              WorkDataState={formData.WorkData}
              formData={formData}
              ProId={ProId}

            />
          )}
          {/* {activeTab === 3 && (
            <UserServices
              setActiveTab={setActiveTab}
              setProviderData={(data) => setProviderData("ServiceData", data)}
              AuthorizedData={UserFrom.ServiceData}
              AuthorizedFormValues={formData.ServiceData}
            />
          )}
          {activeTab === 4 && (
            <Roster
              setActiveTab={setActiveTab}
              setProviderData={(data) => setProviderData("RosterData", data)}
              BankDetailData={UserFrom.RosterData}
              BankDetailFormValues={formData.RosterData}
            />
          )} */}
        </div>
      ) : (
        <div className="overflow-x-auto sm:rounded-lg ">
          <CustomTable trHeader={<UserteHeader setSortBy={setSortBy} setOrder={setOrder}/>}>
            <UserTd  toggleCreateProviderForm={toggleCreateProviderForm} />
          </CustomTable>
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            breakLabel={"..."}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-6 mb-0"}
            pageClassName={"mx-1"}
            pageLinkClassName={
              "block px-4 py-2 rounded hover:bg-[#4cb59c] hover:text-white"
            }
            previousClassName={"mx-1"}
            previousLinkClassName={
              "block px-3 py-2 rounded bg-slate-100 hover:bg-[#4cb59c] hover:text-white"
            }
            nextClassName={"mx-1"}
            nextLinkClassName={
              "block px-3 py-2 rounded bg-slate-100 hover:bg-[#4cb59c] hover:text-white"
            }
            activeClassName={"bg-[#64c6b0] text-white rounded"}
            activeLinkClassName={"border-none"}
          />
        </div>
      )}
    </>
  );
};

export default User;
