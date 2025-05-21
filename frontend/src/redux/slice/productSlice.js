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
  topPicksId: null,
  topPicksError: "",
  topPicksStatus: "idle",

  product: "",
  productError: "",
  productStatus: "idle",

  searchQuery: "",
  searchCategory: null,
  searchPrice: [],
  priceRange: [0, 200],
  searchBrand: [],
  searchOrder: "",
  searchPageLimit: 12,
  searchResultsCount: 0,
  searchCurrentPage: 1,

  filteredResults: [],
  filterStatus: "idle",
  filterError: "",
};



// Fetch products from local mock db.json
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      console.log(products);  // Add this to check the response
      return products;  // Return the products array
    } catch (error) {
      return rejectWithValue(error.message);  // Handle error
    }
  }
);





export const fetchBestSellingProduct = createAsyncThunk(
  "product/fetchBestSellingProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/db.json");  // Fetch from local db.json
      if (!response.ok) {
        throw new Error("Failed to fetch best-selling products");
      }

      const data = await response.json();

      // Assuming you have a `products` array in db.json with a `bestSeller` field
      const bestSellers = data.products.filter(product => product.bestSeller);

      return bestSellers;
    } catch (error) {
      return rejectWithValue(error.message); // Handle any errors
    }
  }
);


// Fetch Recommendations for a specific user (you can use mock data here as well)
export const fetchRecommendation = createAsyncThunk(
  "product/fetchRecommendation",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/products/recommendations?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product recommendations");
      }
      const recommendations = await response.json();
      return recommendations;
    } catch (error) {
      return rejectWithValue(error.message); // Handle any errors
    }
  }
);

// Fetch Popular Products
export const fetchPopular = createAsyncThunk(
  "product/fetchPopular",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/db.json"); // Fetch from local db.json
      if (!response.ok) {
        throw new Error("Failed to fetch popular products");
      }
      
      const data = await response.json();

      // Assuming products have a 'popular' field to mark them as popular
      const popularProducts = data.products.filter(product => product.popular);

      return popularProducts; // Return filtered popular products
    } catch (error) {
      return rejectWithValue(error.message); // Handle any errors
    }
  }
);


// Fetch Top Picks
export const fetchTopPicks = createAsyncThunk(
  "product/fetchTopPicks",
  async (_, { rejectWithValue }) => {  // No need for userId anymore
    try {
      const response = await fetch('http://localhost:3001/products');  // No userId here
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();

      // Filter products where topPick is true
      const topPicks = products.filter(product => product.topPick === true);
      console.log(topPicks);
      return topPicks;

    } catch (error) {
      return rejectWithValue(error.message);  // Handle errors
    }
  }
);


// Assuming you have an action like this for fetching product details
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/products?&_id=${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      console.log(data);
      return data[0]; // return product data
    } catch (error) {
      return rejectWithValue(error.message); // reject with the error message
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "product/fetchFilteredProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch("/db.json");

      if (!response.ok) {
        throw new Error("Failed to load products from local db.json");
      }

      const data = await response.json();
      const allProducts = data.products;

      // Apply filters from params (e.g., category, brand, minPrice, maxPrice)
      const filteredProducts = allProducts.filter(product => {
        const matchesCategory = params.category
          ? product.category.toLowerCase() === params.category.toLowerCase()
          : true;

        const matchesBrand = params.brand
          ? product.brand.toLowerCase() === params.brand.toLowerCase()
          : true;

        const matchesMinPrice = params.minPrice
          ? product.price >= parseFloat(params.minPrice)
          : true;

        const matchesMaxPrice = params.maxPrice
          ? product.price <= parseFloat(params.maxPrice)
          : true;

        return matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice;
      });

      return filteredProducts;
    } catch (error) {
      return rejectWithValue(error.message);
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
    clearSearchFilter: (state) => {
      state.searchBrand = [];
      state.searchCategory = [];
      state.searchPrice = state.priceRange;
    },
    setTopPicksId: (state, action) => {
      state.topPicksId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Featured Products
      .addCase(fetchProducts.pending, (state) => {
        state.featuredStatus = "loading";
        state.featuredError = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.featuredStatus = "succeeded";
        state.featuredError = "";
        state.featuredProduct = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.featuredStatus = "failed";
        state.featuredError = action.payload;
      })

      // Fetch Best Selling Products
      .addCase(fetchBestSellingProduct.pending, (state) => {
        state.bestSellerStatus = "loading";
        state.bestSellerError = "";
      })
      .addCase(fetchBestSellingProduct.fulfilled, (state, action) => {
        state.bestSellerStatus = "succeeded";
        state.bestSellerError = "";
        state.bestSellerProducts = action.payload;
      })
      .addCase(fetchBestSellingProduct.rejected, (state, action) => {
        state.bestSellerStatus = "failed";
        state.bestSellerError = action.payload;
      })

      // Fetch Recommendations
      .addCase(fetchRecommendation.pending, (state) => {
        state.recommendStatus = "loading";
        state.recommendError = "";
      })
      .addCase(fetchRecommendation.fulfilled, (state, action) => {
        state.recommendStatus = "succeeded";
        state.recommendError = "";
        state.recommendProducts = action.payload;
      })
      .addCase(fetchRecommendation.rejected, (state, action) => {
        state.recommendStatus = "failed";
        state.recommendError = action.payload;
      })

      // Fetch Popular Products
      .addCase(fetchPopular.pending, (state) => {
        state.popularStatus = "loading";
        state.popularError = "";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popularStatus = "succeeded";
        state.popularError = "";
        state.popularProducts = action.payload;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.popularStatus = "failed";
        state.popularError = action.payload;
      })

      // Fetch Top Picks
      .addCase(fetchTopPicks.pending, (state) => {
        state.topPicksStatus = "loading";
        state.topPicksError = "";
      })
      .addCase(fetchTopPicks.fulfilled, (state, action) => {
        state.topPicksStatus = "succeeded";
        state.topPicksError = "";
        state.topPicks = action.payload;
      })
      .addCase(fetchTopPicks.rejected, (state, action) => {
        state.topPicksStatus = "failed";
        state.topPicksError = action.payload;
      })

      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.productStatus = "loading";
        state.productError = "";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productStatus = "succeeded";
        state.productError = "";
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.productStatus = "failed";
        state.productError = action.payload;
      })

      // Fetch Filtered Products
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.filterStatus = "loading";
        state.filterError = "";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.filterStatus = "succeeded";
        state.filterError = "";
        state.filteredResults = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.filterStatus = "failed";
        state.filterError = action.payload;
      });
  },
});


export const { clearProductDetails, clearSearchFilter, setTopPicksId } = productSlice.actions;

// export const getFeaturedProduct = (state) => state.product.featuredProduct;
// export const getFeaturedProductStatus = (state) => state.product.featuredStatus;
// export const getFeaturedProductError = (state) => state.product.featuredError;
export const getFeaturedProduct = (state) => state.product.featuredProduct;
export const getFeaturedProductStatus = (state) => state.product.featuredStatus;
export const getFeaturedProductError = (state) => state.product.featuredError;


export const getBestSellingProduct = (state) =>state.product.bestSellerProducts;
export const getBestSellingProductStatus = (state) =>state.product.bestSellerStatus;
export const getBestSellingProductError = (state) =>state.product.bestSellerError;

export const getRecommendations = (state) => state.product.recommendProducts;
export const getRecommendationsStatus = (state) =>state.product.recommendStatus;
export const getRecommendationsError = (state) => state.product.recommendError;

export const getPopularProducts = (state) => state.product.popularProducts;
export const getPopularProductsStatus = (state) => state.product.popularStatus;
export const getPopularProductsError = (state) => state.product.popularError;

export const getTopPicks = (state) => state.product.topPicks;
export const getTopPicksId = (state) => state.product.topPicksId;
export const getTopPicksStatus = (state) => state.product.topPicksStatus;
export const getTopPicksError = (state) => state.product.topPicksError;

export const getProductDetails = (state) => state.product.product;
export const getProductStatus = (state) => state.product.productStatus;
export const getProductError = (state) => state.product.productError;

export const getSearchQuery = (state) => state.product.searchQuery;
export const getSearchCategory = (state) => state.product.searchCategory;
export const getSearchPrice = (state) => state.product.searchPrice;
export const getSearchBrand = (state) => state.product.searchBrand;
export const getSearchOrder = (state) => state.product.searchOrder;
export const getSearchPageLimit = (state) => state.product.searchPageLimit;
export const getsearchResultsCount = (state) =>state.product.searchResultsCount;
export const getSearchCurrentPage = (state) => state.product.searchCurrentPage;
export const getPriceRange = (state) => state.product.priceRange;

export const getFilteredProducts = (state) => state.product.filteredResults;
export const getFilterStatus = (state) => state.product.filterStatus;
export const getFilterError = (state) => state.product.filterError;

export default productSlice.reducer;
