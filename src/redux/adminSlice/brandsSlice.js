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

  singleData: "",
  singleStatus: "idle",
  singleError: "",

  editStatus: "idle",
  editError: "",
};

export const fetchAdminBrands = createAsyncThunk(
  "adminBrands/fetchAdminBrands",
  async (params, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/brand/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchAdminSingleBrand = createAsyncThunk(
  "adminBrands/fetchAdminSingleBrand",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get(`/brand/single/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const updateAdminBrand = createAsyncThunk(
  "adminBrands/updateAdminBrand",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.put(`/brand/${data.id}`, data.data, {
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

export const deleteAdminBrand = createAsyncThunk(
  "adminBrands/deleteAdminBrand",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.delete(`/brand/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
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
      state.singleData = "";
      state.singleStatus = "idle";
      state.singleError = "";
      state.editStatus = "idle";
      state.editError = "";
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
        state.data = action.payload.data;
        state.searchQuery = action.payload.searchQuery;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
        state.sortOrder = action.payload.sortOrder;
        state.totalBrands = action.payload.totalBrands;
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
        state.singleData = action.payload.data;
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

export default brandsSlice.reducer;
