import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: null,
  longitude: null,
  houseNumber: '',
  street: '',
  category: 'not defined', // Enum: ['Home', 'Office', 'Friends & Family', 'not defined']
  isFavorite: false,
  ispermission: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // Set latitude and longitude
    setCoordinates: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    // Set the house number
    setHouseNumber: (state, action) => {
      state.houseNumber = action.payload;
    },
    setPermission: (state, action) => {
      console.log(action.payload)
        state.ispermission = action.payload;
      },
    // Set the street
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    // Set the category (with validation)
    setCategory: (state, action) => {
      const validCategories = ['Home', 'Office', 'Friends & Family', 'not defined'];
      if (validCategories.includes(action.payload)) {
        state.category = action.payload;
      }
    },
    // Toggle favorite status
    toggleFavorite: (state) => {
      state.isFavorite = !state.isFavorite;
    },
    // Reset location to default
    resetLocation: () => initialState,
  },
});

export const {
  setCoordinates,
  setHouseNumber,
  setStreet,
  setCategory,
  toggleFavorite,
  resetLocation,
  setPermission,
} = locationSlice.actions;

export default locationSlice.reducer;
