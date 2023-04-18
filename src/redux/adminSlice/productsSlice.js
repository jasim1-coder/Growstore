import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",

  nameQuery: "",
  limit: 10,
  totalProducts: 0,
  currentPage: 1,
  sortOrder: "",
};

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/product/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const productsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    removeAdminProductsError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.data = action.payload.data;
        state.nameQuery = action.payload.nameQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      });
  },
});

export const { removeAdminProductsError } = productsSlice.actions;

export const getAdminProductsData = (state) => state.adminProducts.data;
export const getAdminProductsFetchStatus = (state) =>
  state.adminProducts.fetchStatus;
export const getAdminProductsFetchError = (state) =>
  state.adminProducts.fetchError;

export const getAdminProductsNameQuery = (state) =>
  state.adminProducts.nameQuery;
export const getAdminProductsLimit = (state) => state.adminProducts.limit;
export const getAdminProductsCurrentPage = (state) =>
  state.adminProducts.currentPage;
export const getAdminProductsSortOrder = (state) =>
  state.adminProducts.sortOrder;
export const getAdminProductsTotalProducts = (state) =>
  state.adminProducts.totalProducts;

export default productsSlice.reducer;
