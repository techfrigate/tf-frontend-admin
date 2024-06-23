import React, { useState } from 'react'
import CustomInput from "../../Components/Common/CustomInput"
import CustomButton from "../../Components/Common/CustomButton"


const BesicInfo = ({besicClientInfo,setActiveTab,UserBasicInfo,setBesicClientInfo}) => {
    const [invalidFields, setInvalidFields] = useState({});

 
    const handleChange = (name, value) => {
        setBesicClientInfo((prev) => ({
          ...prev,
          [name]: value,
        }));
        setInvalidFields((prev) => ({
          ...prev,
          [name]: false,
        }));
      };
   
      const handleSubmit = (e) => {
        e.preventDefault();
        const newInvalidFields = {};
        let isValid = true;
       
        Object.keys(besicClientInfo).forEach((key) => {
          if (besicClientInfo[key] === "") {
            newInvalidFields[key] = true;
            isValid = false;
          }
        });
    
        setInvalidFields(newInvalidFields);
    
        if (isValid) {
            setBesicClientInfo(() => (besicClientInfo));
           
        }else{
          setActiveTab(()=>1)
        }
      };
  return (
    <form className="pb-6 max-h-full px-3 customScrollbar" onSubmit={handleSubmit}>
      <div className="pl-2 pb-4 border-b-2 border-slate-100">
        <div className="px-4 mt-4 grid grid-cols-3 gap-x-7 gap-y-4">
          {UserBasicInfo.map((elem) => (
            <CustomInput
              key={elem.id}
              type={elem.type}
              label={elem.label}
              id={elem.id}
              placeholder={elem.placeholder}
              value={besicClientInfo[elem.id] || ""}
              isInvalid={invalidFields[elem.id]}
              onchange={(e) => handleChange(elem.id, e.target.value)}
            />
          ))}
        </div>
      </div>
   
    <div className="flex justify-end  items-center mt-10 px-7 ">
      <CustomButton type="button" text="Submit"   onclick={(e)=>handleSubmit(e)} />
    
       
    </div>
  </form>
  )
}

export default BesicInfo