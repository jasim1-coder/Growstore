import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API } from "../../api/apiIndex";

const initialState = {
  featuredCategory: [],
  featuredError: "",
  featuredStatus: "idle",

  allCategory: [],
  allError: "",
  allStatus: "idle",

  categories: [],
  categoriesError: "",
  categoriesStatus: "idle",

  categoryName: "",
  products: [],
  productsError: "",
  productsStatus: "idle",

  searchQuery: "",
  limit: 20,
  totalCategories: 0,
  currentPage: 1,
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

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get("/category/search", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchCategoriesProduct = createAsyncThunk(
  "categories/fetchCategoriesProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get(`/category/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    removeCategoriesProductData: (state) => {
      state.products = [];
      state.categoryName = "";
      state.productsStatus = "idle";
      state.productsError = "";
    },
  },
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
      })

      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
        state.categoriesError = "";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "success";
        state.categoriesError = "";
        state.categories = action.payload.data;
        state.searchQuery = action.payload.searchQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.totalCategories = action.payload.totalCategories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = "failed";
        state.categoriesError = action.payload.message;
      })

      .addCase(fetchCategoriesProduct.pending, (state) => {
        state.productsStatus = "loading";
        state.productsError = "";
      })
      .addCase(fetchCategoriesProduct.fulfilled, (state, action) => {
        state.productsStatus = "success";
        state.productsError = "";
        state.products = action.payload.data;
        state.categoryName = action.payload.title;
      })
      .addCase(fetchCategoriesProduct.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.payload.message;
      });
  },
});

export const { removeCategoriesProductData } = categoriesSlice.actions;

export const getFeaturedCategories = (state) =>
  state.categories.featuredCategory;
export const getFeaturedCategoriesStatus = (state) =>
  state.categories.featuredStatus;
export const getFeaturedCategoryError = (state) =>
  state.categories.featuredError;

export const getAllCategories = (state) => state.categories.allCategory;
export const getAllCategoriesStatus = (state) => state.categories.allStatus;
export const getAllCategoryError = (state) => state.categories.allError;

export const getCategoriesProduct = (state) => state.categories.products;
export const getCategoryName = (state) => state.categories.categoryName;
export const getCategoriesProductStatus = (state) =>
  state.categories.productsStatus;
export const getCategoriesProductError = (state) =>
  state.categories.productsError;

export const getCategoriesData = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.categoriesStatus;
export const getCategoriesError = (state) => state.categories.categoriesError;

export const getCategoriesSearchQuery = (state) => state.categories.searchQuery;
export const getCategoriesCurrentPage = (state) => state.categories.currentPage;
export const getCategoriesPageLimit = (state) => state.categories.limit;
export const getCategoriesTotalLength = (state) =>
  state.categories.totalCategories;

export default categoriesSlice.reducer;
