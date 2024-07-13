import React, { useEffect, useState } from "react";
import LocationInfo from "../../../Components/Providers/LocationInfo";
import LocationsTd from "./LocationsTd";
import LocationstrHeader from "./LocationstrHeader";
import ReactPaginate from "react-paginate";
import CustomTable from "../../../Components/Common/CustomTable";
import { data, LocationFrom } from "./LocationsData";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, getLocation } from "../../../redux/locations/locationSlice";
import { useLocation, useSearchParams } from "react-router-dom";

const Locations = ({ showForm, toggleCreateProviderForm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const[sortBy,setSortBy] = useState("createdAt")
  const[order,setOrder] =  useState('ASC')
  const {location,locations,totalPages} = useSelector((state)=>state.locations)

  const dispatch =  useDispatch();
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected+1);
  };

  const [locationFormData, setLocationFormData] = useState({
    DisplayName: "",
    name: "",
    phoneNumber:"",
    dialCode:"+91",
    address1: "",
    address2: "",
    country: "",
    zipcode: "",
    city: "",
    state: "",
    HfrId1:"",
    HfrId2:""
  });
 

  useEffect(()=>{
    dispatch(fetchLocations({currentPage,itemsPerPage,sortBy,order}));
  },[currentPage,itemsPerPage,sortBy,order])


 
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(()=>{
    dispatch(getLocation(id))
  },[id])


  useEffect(()=>{
    
      const locationfind =  locations?.find((elm)=>elm._id===id)
      if(locationfind){
        console.log(locationfind,"location");
        const{name,address:{addressLine1,addressLine2,country,city,zipCode,state},phoneNumber:{dialCode,value},tenantDisplayName,HfrId}  = locationfind
        setLocationFormData({
          name,
          phoneNumber:value,
          dialCode:dialCode,
          DisplayName:tenantDisplayName,
          address1:addressLine1,
          address2:addressLine2,
          country,
          city,
          zipcode:zipCode,
          state,
          HfrId1:HfrId,
          HfrId2:HfrId,
        })
    }

  },[location])

  return (
    <>
      {showForm ? (
        <div className="h-[100%] pb-14 overflow-y-hidden">
          <div className="flex gap-4 border-b-2 border-gray-200 pb-2 sticky top-0 bg-white z-10 p-3 rounded-md">
            <h1 className="text-2xl font-semibold text-[#64C6B0] ml-8">
              Add Location
            </h1>
          </div>
          <LocationInfo
            setLocationFormData={setLocationFormData}
            locationFormData={locationFormData}
            UserBasicInfo={LocationFrom.UserBasicInfo}
            toggleCreateProviderForm={toggleCreateProviderForm}
            id={id}
          />
        </div>
      ) : (
        <div className="overflow-x-auto sm:rounded-lg">
          <CustomTable trHeader={<LocationstrHeader setSortBy={setSortBy} setOrder={setOrder}/>}>
            <LocationsTd
              offset={offset}
              itemsPerPage={itemsPerPage}
              toggleCreateProviderForm={toggleCreateProviderForm}
            />
          </CustomTable>
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            breakLabel={"..."}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-end mt-6 pr-8 mb-0"}
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

export default Locations;
