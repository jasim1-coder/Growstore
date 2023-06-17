import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  data: [],
  fetchStatus: "idle",
  fetchError: "",

  nameQuery: "",
  limit: 10,
  totalProducts: 0,
  currentPage: 1,
  sortOrder: "",

  singleData: "",
  singleStatus: "idle",
  singleError: "",

  deleteStatus: "idle",
  deleteError: "",

  updateStatus: "idle",
  updateError: "",
};

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/product/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchAdminSingleProduct = createAsyncThunk(
  "adminProducts/fetchAdminSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const deleteProductAdmin = createAsyncThunk(
  "adminProducts/deleteProductAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.delete(`/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const updateProductAdmin = createAsyncThunk(
  "adminProducts/updateProductAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.put(`/product/${data.id}`, data.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const productsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    removeAdminProductsError: (state) => {
      state.fetchError = "";
      state.fetchStatus = "idle";
    },
    removeAdminSingleProduct: (state) => {
      state.singleData = "";
      state.singleStatus = "idle";
      state.singleError = "";
    },
    removeAdminDeleteProductStatus: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.data = action.payload.data;
        state.nameQuery = action.payload.nameQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      })

      .addCase(deleteProductAdmin.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = "";
      })
      .addCase(deleteProductAdmin.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.deleteError = "";
        state.singleData = "";
        state.singleStatus = "idle";
        state.singleError = "";
        state.data = state.data.filter(
          (entry) => entry._id !== action.payload.id
        );
      })
      .addCase(deleteProductAdmin.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload.message;
      })

      .addCase(fetchAdminSingleProduct.pending, (state) => {
        state.singleStatus = "loading";
        state.singleError = "";
      })
      .addCase(fetchAdminSingleProduct.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.singleError = "";
        state.singleData = action.payload.data;
      })
      .addCase(fetchAdminSingleProduct.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload.message;
      })

      .addCase(updateProductAdmin.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = "";
      })
      .addCase(updateProductAdmin.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.updateError = "";
        state.singleData = { ...state.singleData, ...action.payload.data };
      })
      .addCase(updateProductAdmin.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload.message;
      });
  },
});

export const {
  removeAdminProductsError,
  removeAdminSingleProduct,
  removeAdminDeleteProductStatus,
} = productsSlice.actions;

export const getAdminProductsData = (state) => state.adminProducts.data;
export const getAdminProductsFetchStatus = (state) =>
  state.adminProducts.fetchStatus;
export const getAdminProductsFetchError = (state) =>
  state.adminProducts.fetchError;

export const getAdminProductsNameQuery = (state) =>
  state.adminProducts.nameQuery;
export const getAdminProductsLimit = (state) => state.adminProducts.limit;
export const getAdminProductsCurrentPage = (state) =>
  state.adminProducts.currentPage;
export const getAdminProductsSortOrder = (state) =>
  state.adminProducts.sortOrder;
export const getAdminProductsTotalProducts = (state) =>
  state.adminProducts.totalProducts;

export const getAdminSingleProductData = (state) =>
  state.adminProducts.singleData;
export const getAdminSingleProductFetchStatus = (state) =>
  state.adminProducts.singleStatus;
export const getAdminSingleProductFetchError = (state) =>
  state.adminProducts.singleError;

export const getAdminDeleteProductStatus = (state) =>
  state.adminProducts.deleteStatus;
export const getAdminDeleteProductError = (state) =>
  state.adminProducts.deleteError;

export const getAdminUpdateProductStatus = (state) =>
  state.adminProducts.updateStatus;
export const getAdminUpdateProductError = (state) =>
  state.adminProducts.updateError;

export default productsSlice.reducer;
