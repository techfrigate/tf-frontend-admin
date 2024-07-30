import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from "./locations/locationSlice"
import usersReducer  from "./users/userSlice"
import rostersReducer from "./rosters/rosterSlice"
const store = configureStore({
  reducer: {
    locations: locationsReducer,
    users: usersReducer,
    rosters:rostersReducer
  },
});

export default store;
