import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  wishlistItems: [],

  addStatus: "idle",
  addError: "",

  removeStatus: "idle",
  removeError: "",

  fetchStatus: "idle",
  fetchError: "",
};

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.post("/wishlist/add", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.delete(`/wishlist/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/wishlist/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ADD TO CART FOR USER
      .addCase(addWishlistItem.pending, (state) => {
        state.addStatus = "loading";
        state.addError = "";
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.addError = "";
        state.wishlistItems = [...state.wishlistItems, action.payload.data];
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload.message;
      })
      // REMOVE FROM CART FOR USER
      .addCase(removeWishlistItem.pending, (state) => {
        state.removeStatus = "loading";
        state.removeError = "";
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.removeStatus = "success";
        state.removeError = "";
        state.wishlistItems = state.wishlistItems.filter(
          ({ _id }) => action.payload.id !== _id
        );
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.removeStatus = "failed";
        state.removeError = action.payload.message;
      })
      // FETCH CART ITEM FOR USER
      .addCase(fetchWishlist.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.wishlistItems = action.payload.data;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      });
  },
});

export const getWishlist = (state) => state.wishlist.wishlistItems;
export const getWishlistItemsLength = (state) =>
  state.wishlist.wishlistItems.length;

export const getWishlistItemAddStatus = (state) => state.wishlist.addStatus;
export const getWishlistItemFetchStatus = (state) => state.wishlist.fetchStatus;
export const getWishlistItemRemoveStatus = (state) =>
  state.wishlist.removeStatus;

export default wishlistSlice.reducer;
