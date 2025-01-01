import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import locationReducer from "./slices/locationSlice"
import dashboardReducer from "./slices/dashboard"

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    dashboard:dashboardReducer
  },
});
