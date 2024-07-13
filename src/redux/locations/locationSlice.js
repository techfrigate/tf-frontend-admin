import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  locations: [],
  location: {},
  totalPages:1,
  fetchLocationStatus: 'idle',
  fetchStatus: 'idle', // Separate status for fetching locations
  createStatus: 'idle', // Separate status for creating locations
  error: null,
};

const BASE_URL = 'http://localhost:3000/locations';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBTbWl0aCIsInN1YiI6IjY2N2Q1ZGFhMDM4MzAyMDYwZWU3MzcwZCIsInVzZXJUeXBlIjoicHJvdmlkZXIiLCJpYXQiOjE3MjA3ODg4MzQsImV4cCI6MTcyMDc5OTYzNH0.jD7zPG6YNAb3NQnXTqxLBMbdl93mB_eD66FnsExIb10';

// Create an async thunk to fetch locations
export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async ({currentPage,itemsPerPage,sortBy,order}, { rejectWithValue }) => {
    console.log(currentPage,itemsPerPage,sortBy,order);
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
        page:currentPage,
        limit:itemsPerPage,
        sortBy,
        order,
      },

        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create location async thunk
export const createLocation = createAsyncThunk(
  'locations/createLocation',
  async (newLocation, { rejectWithValue }) => {
    const {
      DisplayName, name, HrfId1, address1, address2, city, state, zipCode, country, dialCode, phoneNumber
    } = newLocation;

    const locationData = {
      tenantId: "667d5e70038302060ee7370f",
      tenantDisplayName: DisplayName,
      name: name,
      HfrId: HrfId1,
      address: {
        addressLine1: address1,
        addressLine2: address2,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country
      },
      phoneNumber: {
        dialCode: dialCode,
        value: phoneNumber
      }
    };

    try {
      const response = await axios.post(BASE_URL, locationData, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create getLocation async thunk
export const getLocation = createAsyncThunk(
  'locations/getLocation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateLocation = createAsyncThunk(
  'locations/updateLocation',
  async (id, newLocation,{ rejectWithValue }) => {

    const {
      DisplayName, name, HrfId1, address1, address2, city, state, zipCode, country, dialCode, phoneNumber
    } = newLocation;

    const locationData = {
      tenantId: "667d5e70038302060ee7370f",
      tenantDisplayName: DisplayName,
      name: name,
      HfrId: HrfId1,
      address: {
        addressLine1: address1,
        addressLine2: address2,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country
      },
      phoneNumber: {
        dialCode: dialCode,
        value: phoneNumber
      }
    };

    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, locationData,{
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      });
      return {locationData,id};
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const deleteLocation  = createAsyncThunk(
  'locations/deleteLocation',
  async (id,{ rejectWithValue })=>{
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      });

      return id;
      
    }catch(error){
      return rejectWithValue(error.response.data.message);
      
    }
  }

)

// Create a slice for locations
const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch locations
      .addCase(fetchLocations.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.locations = action.payload.data;
        state.totalPages=action.payload.totalPages
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload;
      })
      // Create location
      .addCase(createLocation.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.locations.push(action.payload);
        state.error = null;
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload;
      })
      // Get single location
      .addCase(getLocation.pending, (state) => {
        state.fetchLocationStatus = 'loading';
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.fetchLocationStatus = 'succeeded';
        state.location = action.payload;
         state.error=null
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.fetchLocationStatus = 'failed';
        state.error = action.payload;
      })
       // updateLocation location
       .addCase(updateLocation.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';    
         const{id,locationData}  = action.payload
         const{address,HfrId,name,tenantDisplayName,phoneNumber} = locationData
         const updatedLocations =  state.locations.map((elm)=>elm._id ===id?{...elm,address:address,HfrId:HfrId,name,tenantDisplayName:tenantDisplayName,phoneNumber:phoneNumber}:elm)

        state.locations = updatedLocations;
         state.error=null
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload;
      })
      //delete location 
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter((elm)=>elm._id !== action.payload);
        state.error=null
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.error = action.payload;
      })

  },
});

// Export the reducer
export default locationsSlice.reducer;