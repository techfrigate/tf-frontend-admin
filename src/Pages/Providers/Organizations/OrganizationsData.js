export const data = [
  {
    id: 1,
    provider: "Run12",
    location: "Port Blair, Andaman And Nicobar Islands",
    user: "--",
    userDesc: "--",
    status: "Active",
    created: "Apr 29, 2024 05:06 PM",
    modified: "Apr 29, 2024 06:24 PM",
  },
  {
    id: 2,
    provider: "VRG",
    location: "Hyderabad, Telangana",
    user: "--",
    userDesc: "--",
    status: "Active",
    created: "Mar 22, 2024 05:38 PM",
    modified: "Mar 22, 2024 05:51 PM",
  },
  {
    id: 3,
    provider: "CARE Hospitals",
    location: "Port Blair, Andaman And Nicobar Islands",
    user: "Mohan",
    userDesc: "mohan+care.provider+6@unify.digital",
    status: "Active",
    created: "Mar 22, 2024 05:38 PM",
    modified: "Mar 22, 2024 05:51 PM",
  },
  {
    id: 4,
    provider: "--",
    location: "--",
    user: "Dora Sai Teja",
    userDesc: "mohan+care.provider+6@unify.digital",
    status: "Active",
    created: "Mar 14, 2024 12:34 PM",
    modified: "Mar 18, 2024 05:00 PM",
  },
];

export const OrganizationsForm = {
  EstablishmentData: [
    {
      heading: "Organization Details",
      subHeading: "Information to be displayed on your provider's profile.",
      forminput: [
        {
          type: "text",
          label: "Legal Name",
          id: "legalName",
          placeholder: "Enter your Name",
        },
        {
          type: "text",
          label: "Display Name",
          id: "displayName",
          placeholder: "Enter your Display name",
        },
        {
          type: "file",
          label: "Upload image",
          id: "displayImage",
          placeholder: "Upload",
        },
      ],
    },
    {
      heading: "Legal Registration Data",
      subHeading:
        "Details of registered information like PAN, GST & CIN for the provider.",
      forminput: [
        {
          type: "text",
          label: "Business Tax ID",
          id: "taxId",
          placeholder: "Enter your Business ID",
        },
        {
          type: "link",
          label: "Business Tax ID File Link",
          id: "fileLink",
          placeholder: "Enter your Display name",
        },
        {
          type: "text",
          label: "CIN Number",
          id: "cinNumber",
          placeholder: "Upload",
        },
        {
          type: "text",
          label: "CIN Number File Link",
          id: "cinNumberLink",
          placeholder: "Upload",
        },
        {
          type: "text",
          label: "Corporate Goods & Services Tax ID",
          id: "gstId",
          placeholder: "Upload",
        },
        {
          type: "text",
          label: "Corporate Goods & Services Tax ID File Link",
          id: "gstIdLink",
          placeholder: "Upload",
        },
      ],
    },
    {
      heading: "Communication Information",
      subHeading: "Contact details of the provider's organization.",
      forminput: [
        {
          type: "number",
          label: "Business Phone",
          id: "phoneNumber",
          placeholder: "Enter your Name",
        },
        {
          type: "url",
          label: "Website",
          id: "website",
          placeholder: "Enter your Display name",
        },
      ],
    },
    {
      heading: "Official Organization Address",
      subHeading: "The address information of the provider's organization.",
      forminput: [
        {
          type: "text",
          label: "Address 1",
          id: "address1",
          placeholder: "Enter your Business ID",
        },
        {
          type: "text",
          label: "Address 2",
          id: "address2",
          placeholder: "Enter your Display name",
        },
        {
          type: "text",
          label: "City",
          id: "city",
          placeholder: "Upload",
        },
        {
          type: "text",
          label: "State",
          id: "state",
          placeholder: "Upload",
        },
        {
          type: "text",
          label: "Country",
          id: "country",
          placeholder: "Upload",
        },
        {
          type: "number",
          label: "Zipcode",
          id: "zipcode",
          placeholder: "Upload",
        },
      ],
    },
  ],
  AuthorizedData: [
    {
      heading: "Signatory Profile Configuration",
      subHeading: "Details of the provider's signatory profile.",
      forminput: [
        {
          type: "text",
          label: "First Name",
          id: "FName",
          placeholder: "Enter your Name",
        },
        {
          type: "text",
          label: "Last Name",
          id: "LName",
          placeholder: "Last Name",
        },
        {
          type: "text",
          label: "ID Number File Link",
          id: "NFLink",
          placeholder: "Enter Your ID Number File Link",
        },
        {
          type: "text",
          label: "Signing Authority Title",
          id: "SATitle",
          placeholder: "Enter Your Signing Authority Title",
        },
      ],
    },
  ],
  BankDetailData: [
    {
      heading: "Financial Information",
      subHeading: "Bank details of the provider's organization.",
      forminput: [
        {
          type: "text",
          label: "Account Holder Name",
          id: "AHName",
          placeholder: "Enter your Account Holder Name",
        },
        {
          type: "number",
          label: "Account Number",
          id: "ANumber",
          placeholder: "Enter your Account Number",
        },
        {
          type: "text",
          label: "Bank Name",
          id: "BName",
          placeholder: "Enter your Bank Name",
        },
        {
          type: "text",
          label: "Routing Code",
          id: "RCode",
          placeholder: "Enter Your Routing Code",
        },
        {
          type: "file",
          label: "Cancelled Cheque",
          id: "CCheque",
          placeholder: "Upload",
        },
      ],
    },
  ],
};
