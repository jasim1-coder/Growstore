// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PRIVATE_API } from "../../api/apiIndex";

// const initialState = {
//   data: [],
//   fetchStatus: "idle",
//   fetchError: "",

//   searchQuery: "",
//   limit: 10,
//   totalBrands: 0,
//   currentPage: 1,
//   sortOrder: "",

//   singleData: {},
//   singleStatus: "idle",
//   singleError: "",

//   editStatus: "idle",
//   editError: "",

//     products: [],
//   fetchProdStatus: "idle", // idle, loading, success, failed
//   fetchProdError: "",


//     searchQuery: "",
//   brand: "",
// }; 


// // Async thunk to fetch products by brand from db.json
// export const fetchProductsByBrand = createAsyncThunk(
//   "products/fetchProductsByBrand",
//   async (brand, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:3001/products");
//       if (!response.ok) throw new Error("Failed to fetch products");

//       const data = await response.json();
      
//       // Filter products based on the brand
//       const filteredProducts = data.filter(product => product.brand === brand);

//       return filteredProducts; // Return the filtered products
//     } catch (error) {
//       return rejectWithValue(error.message || error);
//     }
//   }
// );



// // Fetch all brands with optional query parameters
// export const fetchAdminBrands = createAsyncThunk(
//   "adminBrands/fetchAdminBrands",
//   async (params, { rejectWithValue }) => {
//     try {
//       const queryString = new URLSearchParams(params).toString();
//       const response = await fetch(`http://localhost:3001/brands?${queryString}`, {
//         method: "GET",
//       });

//       if (!response.ok) throw new Error("Failed to fetch brands");

//       const data = await response.json();
//       return data; // Returns array of brands
//     } catch (error) {
//       return rejectWithValue(error.message || error);
//     }
//   }
// );

// // Fetch a single brand by ID
// export const fetchAdminSingleBrand = createAsyncThunk(
//   "adminBrands/fetchAdminSingleBrand",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://localhost:3001/brands?&_id=${id}`, {
//         method: "GET",
//       });

//       if (!response.ok) throw new Error("Failed to fetch brand");

//       const data = await response.json();
//       console.log("brands successfully fetched",data)
//       return data[0];
//     } catch (error) {
//       return rejectWithValue(error.message || error);
//     }
//   }
// );

// // Update a brand (multipart/form-data or JSON)
// export const updateAdminBrand = createAsyncThunk(
//   "adminBrands/updateAdminBrand",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       for (let key in data) {
//         formData.append(key, data[key]);
//       }

//       const response = await fetch(`http://localhost:3001/brands/${id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to update brand");

//       const updatedData = await response.json();
//       return updatedData;
//     } catch (error) {
//       return rejectWithValue(error.message || error);
//     }
//   }
// );

// // Delete a brand by ID
// export const deleteAdminBrand = createAsyncThunk(
//   "adminBrands/deleteAdminBrand",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://localhost:3001/{id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) throw new Error("Failed to delete brand");

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message || error);
//     }
//   }
// );


// const brandsSlice = createSlice({
//   name: "adminBrands",
//   initialState,
//   reducers: {
//     removeAdminBrandsError: (state) => {
//       state.fetchError = "";
//       state.fetchStatus = "idle";
//     },
//     removeAdminSingleBrand: (state) => {
//       state.singleData = {};
//       state.singleStatus = "idle";
//       state.singleError = "";
//       state.editStatus = "idle";
//       state.editError = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAdminBrands.pending, (state) => {
//         state.fetchStatus = "loading";
//         state.fetchError = "";
//       })
//       .addCase(fetchAdminBrands.fulfilled, (state, action) => {
//         state.fetchStatus = "success";
//         state.fetchError = "";
//         state.data = action.payload;
//         state.searchQuery = action.payload.searchQuery;
//         state.limit = action.payload.limit;
//         state.currentPage = action.payload.currentPage;
//         state.sortOrder = action.payload.sortOrder;
//         state.totalBrands = action.payload.length;
//       })
//       .addCase(fetchAdminBrands.rejected, (state, action) => {
//         state.fetchStatus = "failed";
//         state.fetchError = action.payload.message;
//       })

//       .addCase(fetchAdminSingleBrand.pending, (state) => {
//         state.singleStatus = "loading";
//         state.singleError = "";
//       })
//       .addCase(fetchAdminSingleBrand.fulfilled, (state, action) => {
//         state.singleStatus = "success";
//         state.singleError = "";
//         state.singleData = action.payload;
//       })
//       .addCase(fetchAdminSingleBrand.rejected, (state, action) => {
//         state.singleStatus = "failed";
//         state.singleError = action.payload.message;
//       })

//       .addCase(updateAdminBrand.pending, (state) => {
//         state.editStatus = "loading";
//         state.editError = "";
//       })
//       .addCase(updateAdminBrand.fulfilled, (state, action) => {
//         state.editStatus = "success";
//         state.editError = "";
//         state.singleData = { ...state.singleData, ...action.payload.data };
//         state.data = state.data.map((entry) =>
//           entry._id === action.payload.id
//             ? { ...entry, ...action.payload.data }
//             : entry
//         );
//       })
//       .addCase(updateAdminBrand.rejected, (state, action) => {
//         state.editStatus = "failed";
//         state.editError = action.payload.message;
//       })

//       .addCase(deleteAdminBrand.pending, (state) => {
//         state.singleStatus = "loading";
//         state.singleError = "";
//       })
//       .addCase(deleteAdminBrand.fulfilled, (state, action) => {
//         state.singleStatus = "success";
//         state.singleError = "";
//         state.singleData = "";
//         state.data = state.data.filter(
//           (entry) => entry._id !== action.payload.id
//         );
//       })
//       .addCase(deleteAdminBrand.rejected, (state, action) => {
//         state.singleStatus = "failed";
//         state.singleError = action.payload.message;
//       });
//   },
// });

// export const { removeAdminBrandsError, removeAdminSingleBrand } =
//   brandsSlice.actions;

// export const getAdminBrandsData = (state) => state.adminBrands.data;
// export const getAdminBrandsFetchStatus = (state) =>
//   state.adminBrands.fetchStatus;
// export const getAdminBrandsFetchError = (state) => state.adminBrands.fetchError;

// export const getAdminBrandsSearchQuery = (state) =>
//   state.adminBrands.searchQuery;
// export const getAdminBrandsLimit = (state) => state.adminBrands.limit;
// export const getAdminBrandsCurrentPage = (state) =>
//   state.adminBrands.currentPage;
// export const getAdminBrandsSortOrder = (state) => state.adminBrands.sortOrder;
// export const getAdminBrandsTotalBrands = (state) =>
//   state.adminBrands.totalBrands;

// export const getAdminSingleBrandData = (state) => state.adminBrands.singleData;
// export const getAdminSingleBrandFetchStatus = (state) =>
//   state.adminBrands.singleStatus;
// export const getAdminSingleBrandFetchError = (state) =>
//   state.adminBrands.singleError;

// export const getAdminSingleBrandEditStatus = (state) =>
//   state.adminBrands.editStatus;
// export const getAdminSingleBrandEditError = (state) =>
//   state.adminBrands.editError;

// export default brandsSlice.reducer;
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

  singleData: {},
  singleStatus: "idle",
  singleError: "",

  editStatus: "idle",
  editError: "",

  products: [],
  fetchProdStatus: "idle", // idle, loading, success, failed
  fetchProdError: "",

  brand: "", // Filter by brand
}; 

// Async thunk to fetch products by brand from db.json
export const fetchProductsByBrand = createAsyncThunk(
  "products/fetchProductsByBrand",
  async (brand, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      console.log("brand name:",brand)
      console.log("prducts in brands:",data)
      
      // Filter products based on the brand
      const filteredProducts = data.filter(product => product.brand === brand);
      console.log("Products of specific brands:",filteredProducts)
      return filteredProducts; // Return the filtered products
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);

// Fetch all brands with optional query parameters
export const fetchAdminBrands = createAsyncThunk(
  "adminBrands/fetchAdminBrands",
  async (params, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`http://localhost:3001/brands?${queryString}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch brands");

      const data = await response.json();
      return data; // Returns array of brands
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);

// Fetch a single brand by ID
export const fetchAdminSingleBrand = createAsyncThunk(
  "adminBrands/fetchAdminSingleBrand",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/brands?&_id=${id}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch brand");

      const data = await response.json();
      console.log("brands successfully fetched",data)
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);

// Update a brand (multipart/form-data or JSON)
export const updateAdminBrand = createAsyncThunk(
  "adminBrands/updateAdminBrand",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }

      const response = await fetch(`http://localhost:3001/brands/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update brand");

      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);

// Delete a brand by ID
export const deleteAdminBrand = createAsyncThunk(
  "adminBrands/deleteAdminBrand",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/{id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete brand");

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || error);
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
    removeAdminSingleBrand: (state) => {
      state.singleData = {};
      state.singleStatus = "idle";
      state.singleError = "";
      state.editStatus = "idle";
      state.editError = "";
      state.brand = "";
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
        state.data = action.payload;
        state.searchQuery = action.payload.searchQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalBrands = action.payload.length;
      })
      .addCase(fetchAdminBrands.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      })

      .addCase(fetchAdminSingleBrand.pending, (state) => {
        state.singleStatus = "loading";
        state.singleError = "";
      })
      .addCase(fetchAdminSingleBrand.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singleError = "";
        state.singleData = action.payload;
        state.brand = action.payload.name;
      })
      .addCase(fetchAdminSingleBrand.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload.message;
      })

      .addCase(updateAdminBrand.pending, (state) => {
        state.editStatus = "loading";
        state.editError = "";
      })
      .addCase(updateAdminBrand.fulfilled, (state, action) => {
        state.editStatus = "success";
        state.editError = "";
        state.singleData = { ...state.singleData, ...action.payload.data };
        state.data = state.data.map((entry) =>
          entry._id === action.payload.id
            ? { ...entry, ...action.payload.data }
            : entry
        );
      })
      .addCase(updateAdminBrand.rejected, (state, action) => {
        state.editStatus = "failed";
        state.editError = action.payload.message;
      })

      .addCase(deleteAdminBrand.pending, (state) => {
        state.singleStatus = "loading";
        state.singleError = "";
      })
      .addCase(deleteAdminBrand.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singleError = "";
        state.singleData = "";
        state.data = state.data.filter(
          (entry) => entry._id !== action.payload.id
        );
      })
      .addCase(deleteAdminBrand.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload.message;
      })
      
      // Product Fetch by Brand Handling
      .addCase(fetchProductsByBrand.pending, (state) => {
        state.fetchProdStatus = "loading";
        state.fetchProdError = "";
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.fetchProdStatus = "success";
        state.fetchProdError = "";
        state.products = action.payload; // Set the filtered products
      })
      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.fetchProdStatus = "failed";
        state.fetchProdError = action.payload; // Set the error message
      });
  },
});

export const { removeAdminBrandsError, removeAdminSingleBrand } =
  brandsSlice.actions;

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

export const getAdminSingleBrandData = (state) => state.adminBrands.singleData;
export const getAdminSingleBrandFetchStatus = (state) =>
  state.adminBrands.singleStatus;
export const getAdminSingleBrandFetchError = (state) =>
  state.adminBrands.singleError;

export const getAdminSingleBrandEditStatus = (state) =>
  state.adminBrands.editStatus;
export const getAdminSingleBrandEditError = (state) =>
  state.adminBrands.editError;

export const getProducts = (state) => state.adminBrands.products;
export const getFetchProdStatus = (state) => state.adminBrands.fetchProdStatus;
export const getFetchProdError = (state) => state.adminBrands.fetchProdError;

export default brandsSlice.reducer;
