import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",

  searchQuery: "",
  limit: 10,
  totalBrands: 0,
  currentPage: 1,
  sortOrder: "",
};

export const fetchAdminBrands = createAsyncThunk(
  "adminBrands/fetchAdminBrands",
  async (params, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/brand/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const brandsSlice = createSlice({
  name: "adminBrands",
  initialState,
  reducers: {
    removeAdminBrandsError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminBrands.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchAdminBrands.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.data = action.payload.data;
        state.searchQuery = action.payload.searchQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalBrands = action.payload.totalBrands;
      })
      .addCase(fetchAdminBrands.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      });
  },
});

export const { removeAdminBrandsError } = brandsSlice.actions;

export const getAdminBrandsData = (state) => state.adminBrands.data;
export const getAdminBrandsFetchStatus = (state) =>
  state.adminBrands.fetchStatus;
export const getAdminBrandsFetchError = (state) => state.adminBrands.fetchError;

export const getAdminBrandsSearchQuery = (state) =>
  state.adminBrands.searchQuery;
export const getAdminBrandsLimit = (state) => state.adminBrands.limit;
export const getAdminBrandsCurrentPage = (state) =>
  state.adminBrands.currentPage;
export const getAdminBrandsSortOrder = (state) => state.adminBrands.sortOrder;
export const getAdminBrandsTotalBrands = (state) =>
  state.adminBrands.totalBrands;

export default brandsSlice.reducer;
