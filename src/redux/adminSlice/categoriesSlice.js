import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",

  searchQuery: "",
  limit: 10,
  totalCategories: 0,
  currentPage: 1,
  sortOrder: "",
};

export const fetchAdminCategories = createAsyncThunk(
  "adminCategories/fetchAdminCategories",
  async (params, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/category/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "adminCategories",
  initialState,
  reducers: {
    removeAdminCategoriesError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCategories.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchAdminCategories.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.data = action.payload.data;
        state.searchQuery = action.payload.searchQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalCategories = action.payload.totalCategories;
      })
      .addCase(fetchAdminCategories.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      });
  },
});

export const { removeAdminCategoriesError } = categoriesSlice.actions;

export const getAdminCategoriesData = (state) => state.adminCategories.data;
export const getAdminCategoriesFetchStatus = (state) =>
  state.adminCategories.fetchStatus;
export const getAdminCategoriesFetchError = (state) =>
  state.adminCategories.fetchError;

export const getAdminCategoriesSearchQuery = (state) =>
  state.adminCategories.searchQuery;
export const getAdminCategoriesLimit = (state) => state.adminCategories.limit;
export const getAdminCategoriesCurrentPage = (state) =>
  state.adminCategories.currentPage;
export const getAdminCategoriesSortOrder = (state) =>
  state.adminCategories.sortOrder;
export const getAdminCategoriesTotalCategories = (state) =>
  state.adminCategories.totalCategories;

export default categoriesSlice.reducer;
