import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API, PYTHON_API } from "../../api/apiIndex";

const initialState = {
  featuredProduct: [],
  featuredError: "",
  featuredStatus: "idle",

  bestSellerProducts: [],
  bestSellerError: "",
  bestSellerStatus: "idle",

  recommendProducts: [],
  recommendError: "",
  recommendStatus: "idle",

  popularProducts: [],
  popularError: "",
  popularStatus: "idle",

  topPicks: [],
  topPicksError: "",
  topPicksStatus: "idle",

  product: "",
  productError: "",
  productStatus: "idle",
};

export const fetchFeaturedProduct = createAsyncThunk(
  "product/fetchFeaturedProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get("/product/featured");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchBestSellingProduct = createAsyncThunk(
  "product/fetchBestSellingProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get("/product/best-selling");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchRecommendation = createAsyncThunk(
  "product/fetchRecommendation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PYTHON_API.get(`/user/recommend?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchPopular = createAsyncThunk(
  "product/fetchPopular",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PYTHON_API.get(`/product/popular`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchTopPicks = createAsyncThunk(
  "product/fetchTopPicks",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PYTHON_API.get(`/product/related?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await NODE_API.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = "";
      state.productStatus = "idle";
      state.productError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // GET FEATURED Product
      .addCase(fetchFeaturedProduct.pending, (state) => {
        state.featuredStatus = "loading";
        state.featuredError = "";
      })
      .addCase(fetchFeaturedProduct.fulfilled, (state, action) => {
        state.featuredStatus = "success";
        state.featuredError = "";
        state.featuredProduct = action.payload.data;
      })
      .addCase(fetchFeaturedProduct.rejected, (state, action) => {
        state.featuredStatus = "failed";
        state.featuredError = action.payload.message;
      })
      // GET BEST SELLING Product
      .addCase(fetchBestSellingProduct.pending, (state) => {
        state.bestSellerStatus = "loading";
        state.bestSellerError = "";
      })
      .addCase(fetchBestSellingProduct.fulfilled, (state, action) => {
        state.bestSellerStatus = "success";
        state.bestSellerError = "";
        state.bestSellerProducts = action.payload.data;
      })
      .addCase(fetchBestSellingProduct.rejected, (state, action) => {
        state.bestSellerStatus = "failed";
        state.bestSellerError = action.payload.message;
      })

      // GET RECOMMENDATION FOR USER
      .addCase(fetchRecommendation.pending, (state) => {
        state.recommendStatus = "loading";
        state.recommendError = "";
      })
      .addCase(fetchRecommendation.fulfilled, (state, action) => {
        state.recommendStatus = "success";
        state.recommendError = "";
        state.recommendProducts = action.payload.data;
      })
      .addCase(fetchRecommendation.rejected, (state, action) => {
        state.recommendStatus = "failed";
        state.recommendError = action.payload.message;
      })

      // GET Popular products
      .addCase(fetchPopular.pending, (state) => {
        state.popularStatus = "loading";
        state.popularError = "";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popularStatus = "success";
        state.popularError = "";
        state.popularProducts = action.payload.data;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.popularStatus = "failed";
        state.popularError = action.payload.message;
      })

      // GET Top Picks
      .addCase(fetchTopPicks.pending, (state) => {
        state.topPicksStatus = "loading";
        state.topPicksError = "";
      })
      .addCase(fetchTopPicks.fulfilled, (state, action) => {
        state.topPicksStatus = "success";
        state.topPicksError = "";
        state.topPicks = action.payload.data;
      })
      .addCase(fetchTopPicks.rejected, (state, action) => {
        state.topPicksStatus = "failed";
        state.topPicksError = action.payload.message;
      })
      // GET Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.productStatus = "loading";
        state.productError = "";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productStatus = "success";
        state.productError = "";
        state.product = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.productStatus = "failed";
        state.productError = action.payload.message;
      });
  },
});

export const { clearProductDetails } = productSlice.actions;

export const getFeaturedProduct = (state) => state.product.featuredProduct;
export const getFeaturedProductStatus = (state) => state.product.featuredStatus;
export const getFeaturedProductError = (state) => state.product.featuredError;

export const getBestSellingProduct = (state) =>
  state.product.bestSellerProducts;
export const getBestSellingProductStatus = (state) =>
  state.product.bestSellerStatus;
export const getBestSellingProductError = (state) =>
  state.product.bestSellerError;

export const getRecommendations = (state) => state.product.recommendProducts;
export const getRecommendationsStatus = (state) =>
  state.product.recommendStatus;
export const getRecommendationsError = (state) => state.product.recommendError;

export const getPopularProducts = (state) => state.product.popularProducts;
export const getPopularProductsStatus = (state) => state.product.popularStatus;
export const getPopularProductsError = (state) => state.product.popularError;

export const getTopPicks = (state) => state.product.topPicks;
export const getTopPicksStatus = (state) => state.product.topPicksStatus;
export const getTopPicksError = (state) => state.product.topPicksError;

export const getProductDetails = (state) => state.product.product;
export const getProductStatus = (state) => state.product.productStatus;
export const getProductError = (state) => state.product.productError;

export default productSlice.reducer;
