import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  addresses: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
      // state.addresses = Array.isArray(action.payload) ? action.payload : [...action.payload];
    },
    deleteAddress: (state, action) => {
      const addressId = action.payload;
      state.addresses = state.addresses.filter((address) => address._id !== addressId);
    },
    updateAddress: (state, action) => {
      const { addressId, updatedAddress } = action.payload;
      const addressIndex = state.addresses.findIndex((address) => address._id === addressId);

      if (addressIndex !== -1) {
        state.addresses[addressIndex] = { ...state.addresses[addressIndex], ...updatedAddress };
      }
    },
  },
});

export const { setAddresses,deleteAddress,updateAddress } = dashboardSlice.actions;

export default dashboardSlice.reducer;
