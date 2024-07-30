export const data = [
  {
    id: 1,
    user: "Punit",
    Organization: "Rainbow Mumbai Hospitals",
    Email: "Punit+care.provider+6@unify.digital",
    userDesc: "@Punit",
    status: "Active",
    Roles: ["Doctor HOD"],
    Updated: "Mar 14, 2024 12:34 PM",
  },
  {
    id: 2,
    user: "Dipanhsu",
    Organization: "Rainbow Mumbai Hospitals",
    userDesc: "@Dipanhsu",
    Email: "Dipanhsu+care.provider+6@unify.digital",
    status: "Pending",
    Roles: "Nurse",
    Updated: "Mar 14, 2024 12:34 PM",
  },
  {
    id: 3,
    user: "Mohan",
    Organization: "--",
    userDesc: "@mohan",
    Email: "mohan+care.provider+6@unify.digital",
    status: "Active",
    Roles: "Admin",
    Updated: "Mar 14, 2024 12:34 PM",
  },
  {
    id: 4,
    user: "Dora Sai Teja",
    Organization: "Rainbow Mumbai Hospitals",
    userDesc: "@Dora Sai Tejal",
    Email: "DoraSaiTeja+care.provider+6@unify.digital",
    status: "Active",
    Roles: "Doctor",
    Updated: "Mar 14, 2024 12:34 PM",
  },
];

// export const UserFrom = {
//   UserBasicInfo: [
//     {
//       type: "text",
//       label: "Organization",
//       id: "organization",
//       placeholder: "Select Organization",
//     },
//     {
//       type: "text",
//       label: "Email",
//       id: "Email",
//       placeholder: "Email",
//     },
//     {
//       type: "dropdown",
//       label: "Phone Number",
//       id: "PNumber",
//       placeholder: "Enter your Number",
//     },
//     {
//       type: "text",
//       label: "First Name",
//       id: "FirstName",
//       placeholder: "First Name",
//     },
//     {
//       type: "text",
//       label: "Last Name",
//       id: "LastName",
//       placeholder: "Last Name",
//     },
//     {
//       type: "text",
//       label: "Gender",
//       id: "gender",
//       placeholder: "Gender",
//       options: ["Male", "Female"],
//     },
//     {
//       type: "dropdown",
//       label: "User Profile",
//       id: "Profile",
//       placeholder: "User Profile",
//       options: ["Admin", "Doctor", "Nurse", "Staff"],
//     },
//   ],
// };

export const UserFrom = {
  PersonalData: [
    {
      forminput: [
        {
          type: "text",
          label: "First Name",
          id: "firstName",
          placeholder: "First Name",
        },
        {
          type: "text",
          label: "Last Name",
          id: "lastName",
          placeholder: "Last Name",
        },
        {
          type: "date",
          label: "Date of Birth",
          id: "dateOfBirth",
          placeholder: "DD-MM-YYYY",
        },
        {
          type: "select",
          label: "Gender",
          id: "gender",
          placeholder: "Select gender",
          options: ["Male", "Female", "Other"],
        },
        {
          type: "tel",
          label: "Phone Number",
          id: "phoneNumber",
          placeholder: "Enter your phone number",
        },
        {
          type: "email",
          label: "Email",
          id: "email",
          placeholder: "Email",
        },
        {
          type: "select",
          label: "User Type",
          id: "userType",
          placeholder: "Select Roles",
        },
      ],
    },
  ],
  ContactData: [
    {
      forminput: [
        {
          type: "text",
          label: "Address 1*",
          id: "Address1",
          placeholder: "Address 1",
        },
        {
          type: "text",
          label: "Address 2",
          id: "Address2",
          placeholder: "Address 2",
        },
        {
          type: "text",
          label: "Country",
          id: "Country",
          placeholder: "Country",
        },
        {
          type: "text",
          label: "State",
          id: "State",
          placeholder: "State",
        },
        {
          type: "text",
          label: "City",
          id: "City",
          placeholder: "City",
        },
        {
          type: "number",
          label: "Zipcode",
          id: "zipCode",
          placeholder: "zipCode",
        },
      ],
    },
  ],
  WorkData: [
    {
      forminput: [
        {
          type: "text",
          label: "Designation",
          id: "designation",
          placeholder: "Designation",
        },
        {
          type: "text",
          label: "Speciality",
          id: "speciality",
          placeholder: "Speciality",
        },
        {
          type: "number",
          label: "Experience (in months)",
          id: "experience",
          placeholder: "Experience",
        },
        {
          type: "text",
          label: "License Number",
          id: "licenseNumber",
          placeholder: "License Number",
        },
        {
          type: "text",
          label: "HPR Id",
          id: "hprId",
          placeholder: "HPR Id",
        },
        {
          type: "text",
          label: "Re-enter HPR Id",
          id: "reenterHprId",
          placeholder: "Re-enter HPR Id",
        },
        {
          type: "text",
          label: "Qualification",
          id: "qualification",
          placeholder: "qualification",
        },
        
        {
          type: "textarea",
          label: "About Doctor",
          id: "aboutDoctor",
          placeholder: "About Doctor",
        },
      ],
    },
  ],
  ServiceData: [
    {
      heading: "+ Services",
      subHeading: "+ Add Services",
      forminput: [
        {
          type: "textarea",
          label: "Teriffs",
          id: "teriffs",
          placeholder: "Teriffs",
        },
        {
          type: "text",
          label: "Grace Period",
          id: "gracePeriod",
          placeholder: "Days",
        },
        {
          type: "text",
          label: "Max Free Appointments",
          id: "maxFreeAppointments",
          placeholder: "1",
        },
        {
          type: "text",
          label: "Assistance",
          id: "assistance",
          placeholder: "Search By Name",
        },
      ],
    },
  ],
  RosterData: [
    {
      forminput: [
        {
          type: "text",
          label: "Name",
          id: "Name",
          placeholder: "Name",
        },
        {
          type: "text",
          label: "Email",
          id: "Email",
          placeholder: "Email",
        },
      ],
    },
  ],
};
