import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API } from "../../api/apiIndex";

const initialState = {
  featuredCategory: [],
  featuredError: "",
  featuredStatus: "idle",
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
      });
  },
});

export const getFeaturedCategories = (state) =>
  state.categories.featuredCategory;
export const getFeaturedCategoriesStatus = (state) =>
  state.categories.featuredStatus;
export const getFeaturedCategoryError = (state) =>
  state.categories.featuredError;

export default categoriesSlice.reducer;
