import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  addressId: "",
  orderStatus: "idle",
  orderMessage: "",
  orderError: "",
  orderId: "",
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.post("/order/create", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
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
        state.orderMessage =
          "Payment processed successfully. Finalizing your order.";
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
