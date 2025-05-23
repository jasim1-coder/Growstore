// UPDATED REDUX SLICE (addressSlice.js)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",
  addStatus: "idle",
  addError: "",
  updateStatus: "idle",
  updateError: "",
  singleAddress: null,
  singleFetchStatus: "idle",
  singleFetchError: "",
  deleteStatus: "idle",
  deleteError: "",
};

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      return response.data.addresses || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleAddress = createAsyncThunk(
  "address/fetchSingleAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      const address = response.data.addresses.find((addr) => addr._id === addressId);
      return address || null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ userId, newAddress }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${userId}`);
      const updatedUser = {
        ...res.data,
        addresses: [...res.data.addresses, { ...newAddress, _id: Date.now() }],
      };
      await axios.put(`http://localhost:3001/users/${userId}`, updatedUser);
      return updatedUser.addresses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userId, updatedAddress }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${userId}`);
      const updatedAddresses = res.data.addresses.map((addr) =>
        addr._id === updatedAddress._id ? updatedAddress : addr
      );
      const updatedUser = { ...res.data, addresses: updatedAddresses };
      await axios.put(`http://localhost:3001/users/${userId}`, updatedUser);
      return updatedAddresses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${userId}`);
      const filteredAddresses = res.data.addresses.filter((addr) => addr._id !== addressId);
      const updatedUser = { ...res.data, addresses: filteredAddresses };
      await axios.put(`http://localhost:3001/users/${userId}`, updatedUser);
      return filteredAddresses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    removeAddErrorMessage: (state) => {
      state.addStatus = "idle";
      state.addError = "";
    },
    removeDeleteErrorMessage: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = "";
    },
    removeSingleAddress: (state) => {
      state.singleAddress = null;
      state.singleFetchStatus = "idle";
      state.singleFetchError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.data = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      .addCase(fetchSingleAddress.pending, (state) => {
        state.singleFetchStatus = "loading";
      })
      .addCase(fetchSingleAddress.fulfilled, (state, action) => {
        state.singleFetchStatus = "success";
        state.singleAddress = action.payload;
      })
      .addCase(fetchSingleAddress.rejected, (state, action) => {
        state.singleFetchStatus = "failed";
        state.singleFetchError = action.payload;
      })

      .addCase(addAddress.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.data = action.payload;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload;
      })

      .addCase(updateAddress.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.data = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })

      .addCase(deleteAddress.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.data = action.payload;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });
  },
});

export const {
  removeAddErrorMessage,
  removeDeleteErrorMessage,
  removeSingleAddress,
} = addressSlice.actions;

export const getAllAddress = (state) => state.address.data;
export const getFetchAddressStatus = (state) => state.address.fetchStatus;
export const getFetchAddressError = (state) => state.address.fetchError;

export const getSingleAddress = (state) => state.address.singleAddress;
export const getSingleFetchStatus = (state) => state.address.singleFetchStatus;
export const getSingleFetchError = (state) => state.address.singleFetchError;

export const getAddAddressStatus = (state) => state.address.addStatus;
export const getAddAddressError = (state) => state.address.addError;

export const getUpdateAddressStatus = (state) => state.address.updateStatus;
export const getUpdateAddressError = (state) => state.address.updateError;

export const getDeleteAddressStatus = (state) => state.address.deleteStatus;
export const getDeleteAddressError = (state) => state.address.deleteError;

export default addressSlice.reducer;
