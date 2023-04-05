import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAddressId: (state, action) => {
      state.addressId = action.payload;
    },
    removeAddressId: (state) => {
      state.addressId = "";
    },
  },
  extraReducers: {},
});

export const { setAddressId, removeAddressId } = orderSlice.actions;

export const getAddressId = (state) => state.order.addressId;

export default orderSlice.reducer;
