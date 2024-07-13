import React, { useEffect, useState } from "react";
import CustomInput from "../Common/CustomInput";
import CustomButton from "../Common/CustomButton";
import PhoneNumberInput from "../Common/PhoneNumberInput";
import { useDispatch, useSelector } from "react-redux";
import { createLocation, updateLocation } from "../../redux/locations/locationSlice";
import toast from "react-hot-toast";
 

const LocationInfo = ({
  locationFormData,
  UserBasicInfo,
  setLocationFormData,
  toggleCreateProviderForm,
  id
}) => {
  const [invalidFields, setInvalidFields] = useState({});
  const dispatch= useDispatch()
  const{createStatus,error}  = useSelector((state)=>state.locations)

  useEffect(() => {
    if (createStatus === 'succeeded') {
      setLocationFormData({
        DisplayName: "",
        name: "",
        phoneNumber: "",
        dialCode: "+91",
        address1: "",
        address2: "",
        country: "",
        zipcode: "",
        city: "",
        state: "",
        HfrId1: "",
        HfrId2: ""
      });
      toggleCreateProviderForm();
    } else if (createStatus === 'failed' && error) {
      toast.error(error);
    }
  }, [createStatus, error,]);

  const handleChange = (name, value) => {
    setLocationFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInvalidFields((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phoneNumber);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvalidFields = {};
    let isValid = true;

    Object.keys(locationFormData).forEach((key) => {
      if (locationFormData[key] === "" && key !== "address2") {
        newInvalidFields[key] = `please enter ${key}`;
        isValid = false;
      }
    });

    if (!validatePhoneNumber(locationFormData.phoneNumber)) {
      newInvalidFields.phoneNumber = "Please enter a valid phone number";
      isValid = false;
    }

    if (locationFormData.HfrId1 !== locationFormData.HfrId2) {
      newInvalidFields.HfrId2 = "HfrId2 must be the same as HfrId1";
      isValid = false;
    }


    setInvalidFields(newInvalidFields);

    if (isValid) {
       if(id){
        dispatch(updateLocation(id,locationFormData))
       }else{
        dispatch(createLocation(locationFormData))
       }
    
    }  
  };

  const handleDialCodeChange = (value) => {
     setLocationFormData((pre)=> ({...pre, dialCode:value}))

  };
 

  return (
    <form
      className="pb-6 max-h-full px-3 customScrollbar"
      onSubmit={handleSubmit}
    >
      <div className="pl-2 pb-4 border-b-2 border-slate-100">
        <div className="px-4 mt-4 flex flex-wrap ">
          {UserBasicInfo.map((elem, index) => (
            <div key={elem.id} className="w-full sm:w-1/3 mb-3 px-2 ">
            {
              elem.id === "phoneNumber" ? 
              <PhoneNumberInput
                  type={elem.type}
                  label={elem.label}
                  id={elem.id}
                  placeholder={elem.placeholder}
                  value={locationFormData[elem.id] || ""}
                  dialCode={locationFormData.dialCode}
                  isInvalid={invalidFields[elem.id]}
                  onChangeDialCode={handleDialCodeChange}
                  onChangeNumber={(value) => handleChange(elem.id, value)}
                />

               : <CustomInput
                type={elem.type}
                label={elem.label}
                id={elem.id}
                placeholder={elem.placeholder}
                value={locationFormData[elem.id] || ""}
                isInvalid={invalidFields[elem.id]}
                onchange={(e) => handleChange(elem.id, e.target.value)}
              />
            }
             
            </div>
          ))}
        </div>
      </div>
{
  createStatus !=="loading" &&     <div className="flex justify-end  items-center mt-10 px-7 ">
        <CustomButton
          type="button"
          text="Submit"
          onclick={(e) => handleSubmit(e)}
        />
      </div>
}
   
    </form>
  );
};

export default LocationInfo;
