import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",

  orderIdQuery: "",
  limit: 10,
  totalOrders: 0,
  currentPage: 1,
  sortOrder: "",
};

export const fetchAdminOrders = createAsyncThunk(
  "adminOrder/fetchAdminOrders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/order/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const ordersSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    removeAdminOrdersError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.data = action.payload.data;
        state.orderIdQuery = action.payload.orderIdQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      });
  },
});

export const { removeAdminOrdersError } = ordersSlice.actions;

export const getAdminOrdersData = (state) => state.adminOrder.data;
export const getAdminOrderFetchStatus = (state) => state.adminOrder.fetchStatus;
export const getAdminOrderFetchError = (state) => state.adminOrder.fetchError;

export const getAdminOrderIdQuery = (state) => state.adminOrder.orderIdQuery;
export const getAdminOrderLimit = (state) => state.adminOrder.limit;
export const getAdminOrderCurrentPage = (state) => state.adminOrder.currentPage;
export const getAdminOrderSortOrder = (state) => state.adminOrder.sortOrder;
export const getAdminOrderTotalOrders = (state) => state.adminOrder.totalOrders;

export default ordersSlice.reducer;
