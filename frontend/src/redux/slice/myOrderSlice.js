import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const initialState = {
  ordersData: [],
  fetchStatus: "idle",
  fetchError: "",
  singleOrder: null,
  singleOrderStatus: "idle",
  singleOrderError: "",
  cancelStatus: "idle",
  cancelError: "",
};

// Fetch all orders of a user by userId
export const fetchMyOrders = createAsyncThunk(
  "myOrder/fetchMyOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data.orders || [];
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a single order by userId and orderId
export const fetchSingleOrder = createAsyncThunk(
  "myOrder/fetchSingleOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      const orders = response.data.orders || [];
      const order = orders.find((o) => o.orderId === orderId);
      if (!order) throw new Error("Order not found");
      return order;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Cancel order by updating order status inside user's orders and patch user
export const cancelOrder = createAsyncThunk(
  "myOrder/cancelOrder",
  async ({ userId, orderId, cancelledDate }, { rejectWithValue }) => {
    try {
      const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
      const user = userResponse.data;

      const updatedOrders = (user.orders || []).map((order) =>
        order.orderId === orderId
          ? { ...order, status: "Cancelled", cancelledDate }
          : order
      );

      await axios.patch(`${BASE_URL}/users/${userId}`, {
        orders: updatedOrders,
      });

      const cancelledOrder = updatedOrders.find((o) => o.orderId === orderId);

      return cancelledOrder;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const myOrderSlice = createSlice({
  name: "myOrder",
  initialState,
  reducers: {
    removeSingleOrderData: (state) => {
      state.singleOrder = null;
      state.singleOrderStatus = "idle";
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
        state.ordersData = action.payload;
        state.fetchError = "";
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload || "Failed to fetch orders";
      })

      .addCase(fetchSingleOrder.pending, (state) => {
        state.singleOrderStatus = "loading";
        state.singleOrderError = "";
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.singleOrderStatus = "success";
        state.singleOrder = action.payload;
        state.singleOrderError = "";
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.singleOrderStatus = "failed";
        state.singleOrderError = action.payload || "Failed to fetch order";
      })

      .addCase(cancelOrder.pending, (state) => {
        state.cancelStatus = "loading";
        state.cancelError = "";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelStatus = "success";
        state.cancelError = "";

        if (state.singleOrder?.orderId === action.payload.orderId) {
          state.singleOrder = action.payload;
        }

        state.ordersData = state.ordersData.map((order) =>
          order.orderId === action.payload.orderId ? action.payload : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelStatus = "failed";
        state.cancelError = action.payload || "Failed to cancel order";
      });
  },
});

export const { removeSingleOrderData } = myOrderSlice.actions;

export const getMyOrders = (state) => state.myOrder.ordersData;
export const getMyOrderFetchStatus = (state) => state.myOrder.fetchStatus;
export const getMyOrderFetchError = (state) => state.myOrder.fetchError;

export const getSingleMyOrder = (state) => state.myOrder.singleOrder;
export const getSingleMyOrderStatus = (state) => state.myOrder.singleOrderStatus;
export const getSingleMyOrderError = (state) => state.myOrder.singleOrderError;

export const getCancelStatus = (state) => state.myOrder.cancelStatus;
export const getCancelError = (state) => state.myOrder.cancelError;

export default myOrderSlice.reducer;
