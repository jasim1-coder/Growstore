import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const LOCAL_API_URL = "http://localhost:3001"; // Local JSON server URL

// Fetch featured categories from local server (json-server)
export const fetchFeaturedCategories = createAsyncThunk(
  "categories/fetchFeaturedCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_API_URL}/categories`);
      const data = await response.json();
      return data.filter(category => category.featured); // Assuming you have a "featured" flag
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async ({ query, page, limit }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_API_URL}/categories?page=${page}&limit=${limit}&query=${query}`);
      const data = await response.json();
      console.log('Fetched Categories:', data);  // Check data here
      return data;
    } catch (error) {
      console.error('Fetch error:', error);  // Log error to console
      return rejectWithValue(error.message);
    }
  }
);




// Fetch all categories from local server
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_API_URL}/categories`);
      const data = await response.json();
      return data;
      console.log(data)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch products of a specific category from local server
export const fetchCategoriesProduct = createAsyncThunk(
  "categories/fetchCategoriesProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_API_URL}/categories/${id}`);
      const categoryData = await response.json();
      // Assuming the category name is part of the category data
      return {
        products: categoryData.products,
        categoryName: categoryData.name, // Set category name
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Slice definition
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
        state.featuredCategory = action.payload;
      })
      .addCase(fetchFeaturedCategories.rejected, (state, action) => {
        state.featuredStatus = "failed";
        state.featuredError = action.payload;
      })

      // GET ALL CATEGORIES
      .addCase(fetchAllCategories.pending, (state) => {
        state.allStatus = "loading";
        state.allError = "";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.allStatus = "success";
        state.allError = "";
        state.allCategory = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.allStatus = "failed";
        state.allError = action.payload;
      })

      // GET PRODUCTS OF A SPECIFIC CATEGORY
.addCase(fetchCategoriesProduct.pending, (state) => {
      state.productsStatus = "loading";
      state.productsError = ""; // Reset error
    })
.addCase(fetchCategoriesProduct.fulfilled, (state, action) => {
  state.products = action.payload.products;
  state.categoryName = action.payload.categoryName; // Store category name
  state.productsStatus = "success";
  state.productsError = "";
})

    .addCase(fetchCategoriesProduct.rejected, (state, action) => {
      state.productsStatus = "failed";
      state.productsError = action.payload || "An error occurred while fetching products.";
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
  console.log("Fetched Categories Payload:", action.payload);  // Log the payload
  state.categoriesStatus = "success";
  state.categoriesError = "";
  state.categories = action.payload;
})

  },
});

export const {
  removeCategoriesProductData,
} = categoriesSlice.actions;

export const getFeaturedCategories = (state) => state.categories.featuredCategory;
export const getFeaturedCategoriesStatus = (state) => state.categories.featuredStatus;
export const getFeaturedCategoryError = (state) => state.categories.featuredError;
export const getCategoriesSearchQuery = (state) => state.categories.searchQuery;
// categoriesSlice.js

export const getCategoriesData = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.categoriesStatus;
export const getCategoriesError = (state) => state.categories.categoriesError;
export const getCategoriesPageLimit = (state) => state.categories.limit;
export const getCategoriesTotalLength = (state) => state.categories.totalCategories;
export const getCategoriesCurrentPage = (state) => state.categories.currentPage;  // Ensure this line exists
export const getCategoriesProduct = (state) => state.categories.products; // Ensure this line exists
// categoriesSlice.js

// categoriesSlice.js

export const getCategoriesProductError = (state) => state.categories.productsError;
// categoriesSlice.js

export const getCategoriesProductStatus = (state) => state.categories.productsStatus;
export const getCategoryName = (state) => state.categories.categoryName;
// Export reducer

export const getAllCategories = (state) => state.categories.allCategory;
export const getAllCategoriesStatus = (state) => state.categories.allStatus;
export const getAllCategoriesError = (state) => state.categories.allError;

export default categoriesSlice.reducer;
