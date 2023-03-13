import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API, PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  cartItems: [],
  cartId: "",

  addStatus: "idle",
  addError: "",

  removeStatus: "idle",
  removeError: "",

  fetchStatus: "idle",
  fetchError: "",
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.post("/cart/add", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.delete(`/cart/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_API.get("/cart/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchCartItemsNOUSER = createAsyncThunk(
  "cart/fetchCartItemsNOUSER",
  async (data, { rejectWithValue }) => {
    try {
      const response = await NODE_API.post("/cart/by-productIds", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartNOUSER: (state, action) => {
      const existItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === existItem.id ? action.payload : item
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeFromCartNOUSER: (state, action) => {
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (entry) => entry.id !== action.payload
      );
    },
    updateCartItems: (state, action) => {
      state.cartItems = state.cartItems.map((entry) =>
        entry._id === action.payload._id ? action.payload : entry
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD TO CART FOR USER
      .addCase(addToCart.pending, (state) => {
        state.addStatus = "loading";
        state.addError = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.addError = "";
        state.cartItems = action.payload.data;
        state.cartId = action.payload.cartId;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload.message;
      })
      // REMOVE FROM CART FOR USER
      .addCase(removeFromCart.pending, (state) => {
        state.removeStatus = "loading";
        state.removeError = "";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.removeStatus = "success";
        state.removeError = "";
        state.cartItems = action.payload.data;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.removeStatus = "failed";
        state.removeError = action.payload.message;
      })
      // FETCH CART ITEM FOR USER
      .addCase(fetchCartItems.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.cartItems = action.payload.data;
        state.cartId = action.payload.cartId;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      })
      // FETCH CART ITEM FOR NOT LOGGED IN USER
      .addCase(fetchCartItemsNOUSER.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = "";
      })
      .addCase(fetchCartItemsNOUSER.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.fetchError = "";
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItemsNOUSER.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload.message;
      });
  },
});

export const {
  addToCartNOUSER,
  removeFromCartNOUSER,
  updateCartItems,
  clearCart,
} = cartSlice.actions;

export const getCartItems = (state) => state.cart.cartItems;
export const getCartId = (state) => state.cart.cartId;
export const getCartTotal = (state) => {
  var total = 0;

  state.cart.cartItems.forEach((item) => {
    const price = parseFloat(item.total);
    total += price;
  });
  return parseFloat(total).toFixed(2);
};
export const getCartItemsLength = (state) => state.cart.cartItems.length;

export const getCartItemAddStatus = (state) => state.cart.addStatus;
export const getCartItemFetchStatus = (state) => state.cart.fetchStatus;
export const getCartItemRemoveStatus = (state) => state.cart.removeStatus;

export default cartSlice.reducer;
