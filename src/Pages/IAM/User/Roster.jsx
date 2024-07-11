import React, { useEffect, useState } from "react";
import CustomInput from "../../../Components/Common/CustomInput";
import CustomButton from "../../../Components/Common/CustomButton";

const Roster = ({
  setActiveTab,
  setProviderData,
  BankDetailData,
  BankDetailFormValues,
}) => {
  const [formValues, setFormValues] = useState(BankDetailFormValues || {});
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    setFormValues(BankDetailFormValues);
  }, [BankDetailFormValues]);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({
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

    Object.keys(formValues).forEach((key) => {
      if (formValues[key] === "") {
        newInvalidFields[key] = true;
        isValid = false;
      }
    });

    setInvalidFields(newInvalidFields);

    if (isValid) {
      setProviderData((prev) => ({
        ...prev,
        BankDetailFormValues: { ...formValues },
      }));
      alert("Form submitted successfully.");
    }
  };

  return (
    <form
      className={`pb-6 max-h-full px-3 customScrollbar`}
      onSubmit={handleSubmit}
    >
      {BankDetailData?.map((elm, index) => (
        <div key={index} className="pl-2 pb-4 border-b-2 border-slate-100">
          <div className="py-1">
            <h1 className="text-lg font-semibold text-gray-800">
              {elm.heading}
            </h1>
            <p className="text-sm text-gray-500 opacity-90">{elm.subHeading}</p>
          </div>
          <div className="px-4 mt-4 grid grid-cols-3 gap-x-7 gap-y-4">
            {elm.forminput.map((elem) => (
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
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6 px-7">
        <CustomButton
          type="button"
          text="Previous"
          onclick={() => setActiveTab(3)}
        />
        <CustomButton type="submit" text="Submit" />
      </div>
    </form>
  );
};

export default Roster;
