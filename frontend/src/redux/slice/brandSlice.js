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
      const response = await fetch("/db.json");
      const data = await response.json();
      return data.brands; // return all brands
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch("/db.json");
      const data = await response.json();

      const searchTerm = params.search?.toLowerCase() || "";

      const matchedBrands = data.brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm)
      );

      return matchedBrands;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchBrandProduct = createAsyncThunk(
  "brand/fetchBrandProduct",
  async (brandId, { rejectWithValue }) => {
    try {
      const response = await fetch("/db.json");
      const data = await response.json();

      // Find brand by ID
      const brand = data.brands.find(b => b._id === brandId);
      if (!brand) throw new Error("Brand not found");

      // Find products belonging to that brand
      const brandProducts = data.products.filter(
        product => product.brand.toLowerCase() === brand.name.toLowerCase()
      );

      return {
        brand,
        products: brandProducts
      };
    } catch (error) {
      return rejectWithValue(error.message);
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
        state.allBrands = action.payload; // ← Fixed
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.allStatus = "failed";
        state.allError = action.payload;
      })

      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = "loading";
        state.brandsError = "";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = "success";
        state.brandsError = "";
        state.brands = action.payload;
        state.searchQuery = action.payload.searchQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.totalBrands = action.payload.length;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsStatus = "failed";
        state.brandsError = action.payload;
      })

      .addCase(fetchBrandProduct.pending, (state) => {
        state.productsStatus = "loading";
        state.productsError = "";
      })
      .addCase(fetchBrandProduct.fulfilled, (state, action) => {
        state.productsStatus = "success";
        state.productsError = "";
        state.products = action.payload.products;
        state.brandName = action.payload.name;
      })
      .addCase(fetchBrandProduct.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.payload;
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
