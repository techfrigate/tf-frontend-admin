import React, { useState, useEffect } from "react";
import CustomInput from "../../../Components/Common/CustomInput";
import CustomButton from "../../../Components/Common/CustomButton";

const Contact = ({
  setActiveTab,
  setFormData,
  ContactDataForm,
  ContactDataState,
 
}) => {
  const [formValues, setFormValues] = useState(ContactDataState || {});
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    setFormValues(ContactDataState || {});
  }, [ContactDataState]);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInvalidFields((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvalidFields = {};
    let isValid = true;

    Object.keys(formValues).forEach((key) => {
      if (formValues[key] === ""  &&   key !== "Address2") {
        newInvalidFields[key] = `Please Enter ${key}`;
        isValid = false;
      }
    });

    setInvalidFields(newInvalidFields);

    if (isValid) {
      setFormData((prev) => ({
        ...prev,
        ContactData: { ...formValues },
      }));
      setActiveTab(() => 2);
    }
  };

  return (
    <form
      className="pb-6 max-h-full px-3 customScrollbar"
      onSubmit={handleSubmit}
    >
      {ContactDataForm?.map((elm, index) => (
        <div key={index} className="pl-2 pb-4 border-b-2 border-slate-100">
          <div className="py-1 ">
            <h1 className="text-lg font-semibold text-gray-800">
              {elm.heading}
            </h1>
            <p className="text-sm text-gray-500 opacity-90">{elm.subHeading}</p>
          </div>
          <div className="px-4 mt-4 grid grid-cols-3 gap-x-7 gap-y-4">
            {elm.forminput.map((elem) => (
              <div key={elem.id} className="w-full mb-2">
              <CustomInput
                key={elem.id}
                type={elem.type}
                label={elem.label}
                id={elem.id}
                placeholder={elem.placeholder}
                value={formValues[elem.id] || ""}
                isInvalid={invalidFields[elem.id]}
                onchange={(e) => handleChange(elem.id, e.target.value)}
              />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6 px-7">
        <CustomButton
          type="button"
          text="Previous"
          onclick={() => setActiveTab(0)}
        />
        <CustomButton type="submit" text="Next" />
      </div>
    </form>
  );
};

export default Contact;
