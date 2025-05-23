import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const initialState = {
  wishlistItems: [],

  addStatus: "idle",
  addError: "",

  removeStatus: "idle",
  removeError: "",

  fetchStatus: "idle",
  fetchError: "",
};

// Fetch wishlist items by fetching the user and returning the nested wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data.wishlist || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add an item to the user's wishlist by fetching user, updating wishlist, and patching user
export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      // Get current user data
      const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
      const user = userResponse.data;

      // Add the new item to wishlist
      const updatedWishlist = [...(user.wishlist || []), item];

      // Update user with new wishlist
      const updatedUser = { ...user, wishlist: updatedWishlist };

      // PATCH the user resource with updated wishlist
      await axios.patch(`${BASE_URL}/users/${userId}`, { wishlist: updatedWishlist });

      return item; // Return the added item
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove an item from the user's wishlist by filtering and updating the user resource
export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      // Get current user data
      const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
      const user = userResponse.data;

      // Filter out the item to remove by productId
      const updatedWishlist = (user.wishlist || []).filter(
        (item) => item.productId !== productId
      );

      // PATCH user with updated wishlist
      await axios.patch(`${BASE_URL}/users/${userId}`, { wishlist: updatedWishlist });

      return productId; // Return removed productId for filtering in state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchWishlist.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      })

      // ADD
      .addCase(addWishlistItem.pending, (state) => {
        state.addStatus = "loading";
        state.addError = "";
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.addError = "";
        state.wishlistItems.push(action.payload);
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload;
      })

      // REMOVE
      .addCase(removeWishlistItem.pending, (state) => {
        state.removeStatus = "loading";
        state.removeError = "";
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.removeStatus = "success";
        state.removeError = "";
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.productId !== action.payload
        );
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.removeStatus = "failed";
        state.removeError = action.payload;
      });
  },
});

// Selectors
export const getWishlist = (state) => state.wishlist.wishlistItems;
export const getWishlistItemsLength = (state) =>
  state.wishlist.wishlistItems.length;

export const getWishlistItemAddStatus = (state) => state.wishlist.addStatus;
export const getWishlistItemFetchStatus = (state) => state.wishlist.fetchStatus;
export const getWishlistItemRemoveStatus = (state) =>
  state.wishlist.removeStatus;

export default wishlistSlice.reducer;
