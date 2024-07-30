import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  users: [],
  singleUser: null,
  createProfileStatus: "idle",
  getProfilesStatus: "idle",
  getSingleProfileStatus: "idle",
  editProfileStatus:"idle",
  error: null,
  totalPages: 0,
};

const PROFILE_URL = "http://localhost:3000/profiles";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjkzNGI3MWJjYWM4MjQzYjJhZGJiM2MiLCJ1c2VyVHlwZSI6InByb3ZpZGVyIiwiaWF0IjoxNzIyMzM4MzA4LCJleHAiOjE3MjIzNDkxMDh9.FUhlT01qKBE017S1n8ckk34gcUZbhXFzYnX8z9Ry_A8";
const TENANT_ID = "667d5e70038302060ee7370f";

// Create profile async thunk
export const createProfile = createAsyncThunk(
  "users/createProfile",
  async (profileData, { rejectWithValue }) => {
    const { dateOfBirth, dialCode, firstName, lastName, email, gender, phoneNumber, userType } = profileData.PersonalData;
    const { Address1, Address2, City, Country, PinCode, State } = profileData.ContactData;
    const { aboutDoctor, designation, hprId, licenseNumber, speciality, experience, qualification } = profileData.WorkData;

    const body = {
      firstName,
      lastName,
      email,
      gender,
      phoneNumber: {
        dialCode,
        value: phoneNumber,
      },
      address: {
        addressLine1: Address1,
        addressLine2: Address2,
        city: City,
        state: State,
        zipCode: PinCode,
        country: Country,
      },
      userType,
      tenantId: TENANT_ID,
      dob: dateOfBirth,
      work: {
        designation,
        speciality,
        licenseNumber,
        hprId,
        about: aboutDoctor,
        qualification,
        experience,
      },
    };

    try {
      const response = await axios.post(PROFILE_URL, body, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get profiles async thunk
export const getProfiles = createAsyncThunk(
  "users/getProfiles",
  async ({currentPage,sortBy,order,itemsPerPage}, { rejectWithValue }) => {
    try {
      const response = await axios.get(PROFILE_URL, {
            params: {page:currentPage, limit:itemsPerPage, sortBy, order},

            headers: {
                Authorization:`Bearer ${AUTH_TOKEN}`,
                'tenantid': TENANT_ID,
                                     },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSingleProfile = createAsyncThunk(
  "users/getSingleProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROFILE_URL}/${id}`, {
            headers: {
                Authorization:`Bearer ${AUTH_TOKEN}`},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const editProfile =  createAsyncThunk(
  "users/editProfile",
  async({profileData,id,userId},{rejectWithValue})=>{
    const { dateOfBirth, dialCode, firstName, lastName, email, gender, phoneNumber, userType } = profileData.PersonalData;
    const { Address1, Address2, City, Country, PinCode, State } = profileData.ContactData;
    const { aboutDoctor, designation, hprId, licenseNumber, speciality, experience, qualification } = profileData.WorkData;

    const body = {
      firstName,
      lastName,
      email,
      gender,
      phoneNumber: {
        dialCode,
        value: phoneNumber,
      },
      address: {
        addressLine1: Address1,
        addressLine2: Address2,
        city: City,
        state: State,
        zipCode: PinCode,
        country: Country,
      },
      userType,
      tenantId: TENANT_ID,
      dob: dateOfBirth,
      work: {
        designation,
        speciality,
        licenseNumber,
        hprId,
        about: aboutDoctor,
        qualification,
        experience,
      },
    };
    try {
      const response = await axios.patch(`${PROFILE_URL}/${id}/${userId}`,body, {
        headers: {
            Authorization:`Bearer ${AUTH_TOKEN}`},
  });
  console.log(response);
      return {id,profile:response.data};
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)



// Create a slice for users
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create profile
      .addCase(createProfile.pending, (state) => {
        state.createProfileStatus = "loading";
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.createProfileStatus = "succeeded";
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.createProfileStatus = "failed";
        state.error = action.payload;
      })
      // Get profiles
      .addCase(getProfiles.pending, (state) => {
        state.getProfilesStatus = "loading";
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.getProfilesStatus = "succeeded";
        state.users = action.payload.profiles;
        state.totalPages =  action.payload.totalPages
        state.error = null;
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.getProfilesStatus = "failed";
        state.error = action.payload;
      })
       // Get single profile
       .addCase(getSingleProfile.pending, (state) => {
        state.getSingleProfileStatus = "loading";
      })
      .addCase(getSingleProfile.fulfilled, (state, action) => {
        state.getSingleProfileStatus = "succeeded";
        state.singleUser = action.payload;
        state.error = null;
      })
      .addCase(getSingleProfile.rejected, (state, action) => {
        state.getSingleProfileStatus = "failed";
        state.error = action.payload;
      })
      //edit prifile 
      .addCase(editProfile.pending, (state) => {
        state.editProfileStatus = "loading";
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.editProfileStatus = "succeeded";
        const filteredData =  state.users.map((elm)=>elm._id===action.payload.id?action.payload.profile:elm)
        state.users = filteredData;
        state.error = null;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.editProfileStatus = "failed";
        state.error = action.payload;
      })

  },
});

// Export the reducer
export default usersSlice.reducer;
