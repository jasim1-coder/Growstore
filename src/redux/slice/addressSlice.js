import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",
  addStatus: "idle",
  addError: "",
  updateStatus: "idle",
  updateError: "",
  singleAddress: "",
  singleFetchStatus: "idle",
  singleFetchError: "",
  deleteStatus: "idle",
  deleteError: "",
};

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/address/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchSingleAddress = createAsyncThunk(
  "address/fetchSingleAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get(`/address/single/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.post("/address/add", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.put(`/address/${data.id}`, data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.delete(`/address/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
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
      state.singleAddress = "";
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
        state.fetchError = "";
        state.data = action.payload.data;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      })

      .addCase(fetchSingleAddress.pending, (state) => {
        state.singleFetchStatus = "loading";
        state.singleFetchError = "";
      })
      .addCase(fetchSingleAddress.fulfilled, (state, action) => {
        state.singleFetchStatus = "success";
        state.singleFetchError = "";
        state.singleAddress = action.payload.data;
      })
      .addCase(fetchSingleAddress.rejected, (state, action) => {
        state.singleFetchStatus = "failed";
        state.singleFetchError = action.payload.message;
      })

      .addCase(addAddress.pending, (state) => {
        state.addStatus = "loading";
        state.addError = "";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.addError = "";
        state.data = [action.payload.data, ...state.data];
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload.message;
      })

      .addCase(updateAddress.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = "";
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.updateError = "";
        state.data = state.data.map((entry) =>
          entry._id === action.payload.id ? action.payload.data : entry
        );
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload.message;
      })

      .addCase(deleteAddress.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = "";
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.deleteError = "";
        state.data = state.data.filter(
          (entry) => entry._id !== action.payload.id
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload.message;
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
