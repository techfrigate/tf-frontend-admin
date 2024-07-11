import React, { useEffect, useState } from "react";
import CustomInput from "../../../Components/Common/CustomInput";
import CustomButton from "../../../Components/Common/CustomButton";

const Personal = ({
  setActiveTab,
  setProviderData,
  EstablishmentData,
  EstablishmentFormValues,
}) => {
  const [formValues, setFormValues] = useState(EstablishmentFormValues);

  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    setFormValues(EstablishmentFormValues);
  }, [EstablishmentFormValues]);
  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setInvalidFields(() => ({ ...invalidFields, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvalidFields = {};
    let isValid = true;
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] === "") {
        newInvalidFields[key] = true;
        isValid = false;
      }
    });
    setInvalidFields(newInvalidFields);

    if (isValid) {
      setActiveTab(() => 1);
      setProviderData((pre) => ({
        ...pre,
        EstablishmentFormValues: { ...formValues },
      }));
    }
  };

  return (
    <form className="pb-6 h-full px-3 customScrollbar" onSubmit={handleSubmit}>
      {EstablishmentData.length > 0 &&
        EstablishmentData?.map((elm, index) => (
          <div
            key={index}
            className=" pl-2 pb-4 border-b-2 border-slate-100 mt-4"
          >
            <div className="py-1 ">
              <h1 className="text-lg font-semibold text-gray-800">
                {elm.heading}
              </h1>
              <p className="text-sm text-gray-500 opacity-90">
                {elm.subHeading}
              </p>
            </div>
            <div className="px-4 mt-4 grid grid-cols-3 gap-x-7 gap-y-4">
              {elm.forminput.map((elem) => (
                <CustomInput
                  key={elem.id}
                  type={elem.type}
                  label={elem.label}
                  id={elem.id}
                  placeholder={elem.placeholder}
                  value={formValues[elem.id]}
                  isInvalid={invalidFields[elem.id]}
                  onchange={(e) => handleChange(elem.id, e.target.value)}
                />
              ))}
            </div>
          </div>
        ))}
      <div className="flex  justify-end items-center mt-6 mr-7">
        <CustomButton type="submit" text="Next" />
      </div>
    </form>
  );
};

export default Personal;
