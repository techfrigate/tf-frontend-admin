import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  rosterLocations: [],
  locationDoctors: [],
  rostersData: [],
  rosterLocationFetchStatus: 'idle',
  locationDoctorsFetchStatus: 'idle',
  rosterSaveStatus: 'idle',
  rosterFetchStatus: 'idle',
  error: null,
};
const BASE_URL = 'http://localhost:3000';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjkzNGI3MWJjYWM4MjQzYjJhZGJiM2MiLCJ1c2VyVHlwZSI6InByb3ZpZGVyIiwiaWF0IjoxNzIyMzM4MzA4LCJleHAiOjE3MjIzNDkxMDh9.FUhlT01qKBE017S1n8ckk34gcUZbhXFzYnX8z9Ry_A8';
const TENANT_ID = '667d5e70038302060ee7370f';

// Create an async thunk to fetch locations
export const fetchLocationsForRosters = createAsyncThunk(
  'locations/fetchLocationsForRosters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/locations`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          tenantId: TENANT_ID,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create an async thunk to fetch profiles of a specific location
export const profilesOfLocation = createAsyncThunk(
  'locations/profilesOfLocation',
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/profiles/location-profile`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          tenantId: TENANT_ID,
          locationId,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create an async thunk to save roster data
export const saveRoster = createAsyncThunk(
  'rosters/saveRoster',
  async (rosterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/rosters`, rosterData, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          tenantId: TENANT_ID,
        },
      });
      console.log(response.data,"response data");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);


// Create an async thunk to get rosters
export const getRosters = createAsyncThunk(
  'rosters/getRosters',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/rosters/practitioner-roster/${userId}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          tenantId: TENANT_ID,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update the slice to include the new thunk
const rosterSlice = createSlice({
  name: 'rosters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsForRosters.pending, (state) => {
        state.rosterLocationFetchStatus = 'loading';
      })
      .addCase(fetchLocationsForRosters.fulfilled, (state, action) => {
        state.rosterLocationFetchStatus = 'succeeded';
        state.rosterLocations = action.payload;
        state.error = null;
      })
      .addCase(fetchLocationsForRosters.rejected, (state, action) => {
        state.rosterLocationFetchStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(profilesOfLocation.pending, (state) => {
        state.locationDoctorsFetchStatus = 'loading';
      })
      .addCase(profilesOfLocation.fulfilled, (state, action) => {
        state.locationDoctorsFetchStatus = 'succeeded';
        state.locationDoctors = action.payload;
        state.error = null;
      })
      .addCase(profilesOfLocation.rejected, (state, action) => {
        state.locationDoctorsFetchStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(saveRoster.pending, (state) => {
        state.rosterSaveStatus = 'loading';
      })
      .addCase(saveRoster.fulfilled, (state, action) => {
        state.rosterSaveStatus = 'succeeded';
        state.rostersData.push(action.payload);
        state.error = null;
      })
      .addCase(saveRoster.rejected, (state, action) => {
        state.rosterSaveStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(getRosters.pending, (state) => {
        state.rosterLocationFetchStatus = 'loading';
      })
      .addCase(getRosters.fulfilled, (state, action) => {
        state.rosterLocationFetchStatus = 'succeeded';
        state.rostersData = action.payload;
        state.error = null;
      })
      .addCase(getRosters.rejected, (state, action) => {
        state.rosterLocationFetchStatus = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default rosterSlice.reducer;
