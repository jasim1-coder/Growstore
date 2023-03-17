import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API } from "../../api/apiIndex";

const initialState = {
  featuredCategory: [],
  featuredError: "",
  featuredStatus: "idle",

  allCategory: [],
  allError: "",
  allStatus: "idle",
};

export const fetchFeaturedCategories = createAsyncThunk(
  "categories/fetchFeaturedCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get("/category/featured");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get("/category");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET FEATURED CATEGORIES
      .addCase(fetchFeaturedCategories.pending, (state) => {
        state.featuredStatus = "loading";
        state.featuredError = "";
      })
      .addCase(fetchFeaturedCategories.fulfilled, (state, action) => {
        state.featuredStatus = "success";
        state.featuredError = "";
        state.featuredCategory = action.payload.data;
      })
      .addCase(fetchFeaturedCategories.rejected, (state, action) => {
        state.featuredStatus = "failed";
        state.featuredError = action.payload.message;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.allStatus = "loading";
        state.allError = "";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.allStatus = "success";
        state.allError = "";
        state.allCategory = action.payload.data;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.allStatus = "failed";
        state.allError = action.payload.message;
      });
  },
});

export const getFeaturedCategories = (state) =>
  state.categories.featuredCategory;
export const getFeaturedCategoriesStatus = (state) =>
  state.categories.featuredStatus;
export const getFeaturedCategoryError = (state) =>
  state.categories.featuredError;

export const getAllCategories = (state) => state.categories.allCategory;
export const getAllCategoriesStatus = (state) => state.categories.allStatus;
export const getAllCategoryError = (state) => state.categories.allError;

export default categoriesSlice.reducer;
