import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API } from "../../api/apiIndex";

const initialState = {
  allBrands: [],
  allError: "",
  allStatus: "idle",
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

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
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
      });
  },
});

export const getAllBrands = (state) => state.brand.allBrands;
export const getAllBrandStatus = (state) => state.brand.allStatus;
export const getallBrandsError = (state) => state.brand.allError;

export default brandSlice.reducer;
