import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API } from "../../api/apiIndex";

const initialState = {
  allBrands: [],
  allError: "",
  allStatus: "idle",

  brands: [],
  brandsError: "",
  brandsStatus: "idle",

  products: [],
  brandName: "",
  productsError: "",
  productsStatus: "idle",

  searchQuery: "",
  limit: 20,
  totalBrands: 0,
  currentPage: 1,
};

export const fetchAllBrands = createAsyncThunk(
  "brand/fetchAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get("/brand");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (params, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get("/brand/search", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchBrandProduct = createAsyncThunk(
  "brand/fetchBrandProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get(`/brand/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    removeBrandProductData: (state) => {
      state.products = [];
      state.brandName = "";
      state.productsStatus = "idle";
      state.productsError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // GET All BRANDS
      .addCase(fetchAllBrands.pending, (state) => {
        state.allStatus = "loading";
        state.allError = "";
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.allStatus = "success";
        state.allError = "";
        state.allBrands = action.payload.data;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.allStatus = "failed";
        state.allError = action.payload.message;
      })

      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = "loading";
        state.brandsError = "";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = "success";
        state.brandsError = "";
        state.brands = action.payload.data;
        state.searchQuery = action.payload.searchQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.totalBrands = action.payload.totalBrands;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsStatus = "failed";
        state.brandsError = action.payload.message;
      })

      .addCase(fetchBrandProduct.pending, (state) => {
        state.productsStatus = "loading";
        state.productsError = "";
      })
      .addCase(fetchBrandProduct.fulfilled, (state, action) => {
        state.productsStatus = "success";
        state.productsError = "";
        state.products = action.payload.data;
        state.brandName = action.payload.title;
      })
      .addCase(fetchBrandProduct.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.payload.message;
      });
  },
});

export const { removeBrandProductData } = brandSlice.actions;

export const getAllBrands = (state) => state.brand.allBrands;
export const getAllBrandStatus = (state) => state.brand.allStatus;
export const getallBrandsError = (state) => state.brand.allError;

export const getBrandProduct = (state) => state.brand.products;
export const getBrandName = (state) => state.brand.brandName;
export const getBrandProductStatus = (state) => state.brand.productsStatus;
export const getBrandProductError = (state) => state.brand.productsError;

export const getBrandsData = (state) => state.brand.brands;
export const getBrandsStatus = (state) => state.brand.brandsStatus;
export const getBrandsError = (state) => state.brand.brandsError;

export const getBrandsSearchQuery = (state) => state.brand.searchQuery;
export const getBrandsCurrentPage = (state) => state.brand.currentPage;
export const getBrandsPageLimit = (state) => state.brand.limit;
export const getBrandsTotalLength = (state) => state.brand.totalBrands;

export default brandSlice.reducer;
