import React, { useEffect, useState } from "react";
import CustomInput from "../../../Components/Common/CustomInput";
import CustomButton from "../../../Components/Common/CustomButton";
import PhoneNumberInput from "../../../Components/Common/PhoneNumberInput";
import CustomSelect from "../../../Components/Common/CustomSelect";


const Personal = ({
  setActiveTab,
  setFormData,
  PersonalDataForm,
  PersonalDataState,
 
}) => {
  const [formValues, setFormValues] = useState(PersonalDataState);
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    setFormValues(PersonalDataState);
  }, [PersonalDataState]);

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setInvalidFields(() => ({ ...invalidFields, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvalidFields = {};
    let isValid = true;
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] === "") {
        newInvalidFields[key] = `Please Enter ${key}`;
        isValid = false;
      }
    });
    setInvalidFields(newInvalidFields);

    if (isValid) {
      setActiveTab(() => 1);
      setFormData((pre) => ({
        ...pre,
        PersonalData: { ...formValues },
      }));
     

    }
  };

  const handleDialCodeChange = (value) => {
    setFormValues((pre)=> ({...pre, dialCode:value}))
  };

  console.log(formValues);
  return (
    <form className="pb-6 h-full px-3 customScrollbar" onSubmit={handleSubmit}>
      {PersonalDataForm.length > 0 &&
        PersonalDataForm?.map((elm, index) => (
          <div
            key={index}
            className="pl-2 pb-4 border-b-2 border-slate-100"
          >
            <div className="py-1">
              <h1 className="text-lg font-semibold text-gray-800">{elm.heading}</h1>
              <p className="text-sm text-gray-500 opacity-90">{elm.subHeading}</p>
            </div>
            <div className="px-4 mt-4 grid grid-cols-3 gap-x-7 gap-y-4">
              {elm.forminput.map((elem) => (
                <div key={elem.id} className="w-full mb-2">
                  {elem.id === "gender" ? (
                    <CustomSelect
                      id={elem.id}
                      label={elem.label}
                      value={formValues[elem.id]}
                      options={["male", "female", "other"]}
                      isInvalid={invalidFields[elem.id]}
                      onChange={handleChange}
                    />
                  ) : elem.id === "userType" ? (
                    <CustomSelect
                      id={elem.id}
                      label={elem.label}
                      value={formValues[elem.id]}
                      options={["doctor", "provider", "staff", "patient"]}
                      isInvalid={invalidFields[elem.id]}
                      onChange={handleChange}
                    />
                  ) : elem.id === "phoneNumber" ? (
                    <PhoneNumberInput
                      type={elem.type}
                      label={elem.label}
                      id={elem.id}
                      placeholder={elem.placeholder}
                      value={formValues[elem.id]}
                      dialCode={formValues.dialCode}
                      isInvalid={invalidFields[elem.id]}
                      onChangeDialCode={handleDialCodeChange}
                      onChangeNumber={(value) => handleChange(elem.id, value)}
                    />
                  ) : (
                    <CustomInput
                      type={elem.type}
                      label={elem.label}
                      id={elem.id}
                      placeholder={elem.placeholder}
                      value={formValues[elem.id]}
                      isInvalid={invalidFields[elem.id]}
                      onchange={(e) => handleChange(elem.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      <div className="flex justify-end items-center mt-6 mr-7">
        <CustomButton type="submit" text="Next" />
      </div>
    </form>
  );
};

export default Personal;
