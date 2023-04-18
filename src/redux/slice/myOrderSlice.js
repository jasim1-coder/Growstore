import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  ordersData: [],
  fetchStatus: "idle",
  fetchError: "",
  singleOrder: "",
  singleOrderStatus: "idle",
  singleOrderError: "",
  cancelStatus: "idle",
  cancelError: "",
};

export const fetchMyOrders = createAsyncThunk(
  "myOrder/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/order/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchSingleOrder = createAsyncThunk(
  "myOrder/fetchSingleOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get(`/order/single/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "myOrder/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.put(`/order/cancel/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const myOrderSlice = createSlice({
  name: "myOrder",
  initialState,
  reducers: {
    removeSingleOrderData: (state) => {
      (state.singleOrder = ""), (state.singleOrderStatus = "idle");
      state.singleOrderError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.ordersData = action.payload.data;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      })

      .addCase(fetchSingleOrder.pending, (state) => {
        state.singleOrderStatus = "loading";
        state.singleOrderError = "";
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.singleOrderStatus = "success";
        state.singleOrderError = "";
        state.singleOrder = action.payload.data;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.singleOrderStatus = "failed";
        state.singleOrderError = action.payload.message;
      })

      .addCase(cancelOrder.pending, (state) => {
        state.cancelStatus = "loading";
        state.cancelError = "";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelStatus = "success";
        state.cancelError = "";
        state.singleOrder = {
          ...state.singleOrder,
          status: action.payload.status,
          cancelledDate: action.payload.cancelledDate,
        };
        state.ordersData = state.ordersData.map((entry) =>
          entry._id === action.payload.id
            ? { ...entry, status: action.payload.status }
            : entry
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelStatus = "failed";
        state.cancelError = action.payload.message;
      });
  },
});

export const { removeSingleOrderData } = myOrderSlice.actions;

export const getMyOrders = (state) => state.myOrder.ordersData;
export const getMyOrderFetchStatus = (state) => state.myOrder.fetchStatus;
export const getMyOrderFetchError = (state) => state.myOrder.fetchError;

export const getSingleMyOrder = (state) => state.myOrder.singleOrder;
export const getSingleMyOrderStatus = (state) =>
  state.myOrder.singleOrderStatus;
export const getSingleMyOrderError = (state) => state.myOrder.singleOrderError;

export const getCancelStatus = (state) => state.myOrder.cancelStatus;
export const getCancelError = (state) => state.myOrder.cancelError;

export default myOrderSlice.reducer;
