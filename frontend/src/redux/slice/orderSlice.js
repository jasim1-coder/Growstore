import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  addressId: "",
  orderStatus: "idle",
  orderMessage: "",
  orderError: "",
  orderId: "",
};

// Updated thunk for mock server
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (data, { rejectWithValue }) => {
    try {
      const isDev = process.env.NODE_ENV === "development";
      const apiUrl = isDev
        ? "http://localhost:3001/orders"
        : "/order/create"; // Replace with PRIVATE_API in prod

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({ message: errorData.message || "Order failed" });
      }

      const resData = await response.json();
      return { ...resData, orderId: resData.id || "mock_order_123" };
    } catch (error) {
      return rejectWithValue({ message: error.message || "Unknown error" });
    }
  }
);

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
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload.status;
      state.orderMessage = action.payload.message;
      state.orderError = action.payload.error;
    },
    removeOrderStatus: (state) => {
      state.orderStatus = "idle";
      state.orderMessage = "";
      state.orderError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderStatus = "loading";
        state.orderError = "";
        state.orderMessage = "Payment processed successfully. Finalizing your order.";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderStatus = "success";
        state.orderError = "";
        state.orderMessage = "Successfully placed order";
        state.orderId = action.payload.orderId;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.orderError = action.payload.message;
        state.orderMessage = "";
      });
  },
});

export const {
  setAddressId,
  removeAddressId,
  setOrderStatus,
  removeOrderStatus,
} = orderSlice.actions;

export const getAddressId = (state) => state.order.addressId;
export const getOrderId = (state) => state.order.orderId;
export const getOrderStatus = (state) => state.order.orderStatus;
export const getOrderMessage = (state) => state.order.orderMessage;
export const getOrderError = (state) => state.order.orderError;

export default orderSlice.reducer;
