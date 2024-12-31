import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import locationReducer from "./slices/locationSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
  },
});
