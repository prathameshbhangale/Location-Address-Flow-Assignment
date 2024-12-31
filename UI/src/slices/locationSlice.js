import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: 18.5204,
  longitude: 73.8567,
  address:"",
  ispermission: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },

    setaddress: (state, action) => {
      state.address = action.payload;
    },
    
    setPermission: (state, action) => {
      console.log(action.payload)
        state.ispermission = action.payload;
    },
  },
});

export const {
  setCoordinates,
  setaddress,
  setPermission,
} = locationSlice.actions;

export default locationSlice.reducer;
