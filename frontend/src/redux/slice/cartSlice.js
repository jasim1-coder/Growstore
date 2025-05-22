import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NODE_API, PRIVATE_API } from "../../api/apiIndex";

const initialState = {
  cartItems: [], // Ensuring cartItems is always an array
  cartId: "",

  addStatus: "idle",
  addError: "",

  removeStatus: "idle",
  removeError: "",

  fetchStatus: "idle",
  fetchError: "",
};

// Add to Cart for a user
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`);
      const user = await res.json();

      const cart = user.cart || [];

      const index = cart.findIndex((item) => item.productId === product.productId);

      if (index !== -1) {
        // Update quantity
        cart[index].quantity += product.quantity || 1;
      } else {
        // Add new item
        cart.push({ ...product, quantity: product.quantity || 1 });
      }

      const updateRes = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const updatedUser = await updateRes.json();
      return updatedUser.cart || [];  // Ensure it's always an array
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add to cart");
    }
  }
);

// Remove from Cart for a user
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`);
      const user = await res.json();

      const updatedCart = (user.cart || []).filter(
        (item) => item.productId !== productId
      );

      const patchRes = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }),
      });

      const updatedUser = await patchRes.json();
      return updatedUser.cart || []; // Ensure it's always an array
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove item");
    }
  }
);

// Fetch Cart Items for a user
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`);
      const user = await res.json();
      return user.cart || []; // Ensure it's always an array
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

// Fetch Cart Items without user login (based on productIds list)
export const fetchCartItemsNOUSER = createAsyncThunk(
  "cart/fetchCartItemsNOUSER",
  async (productIds, { rejectWithValue }) => {
    try {
      const query = productIds.map((id) => `productId=${id}`).join("&");
      const { data } = await NODE_API.get(`/cart?${query}`);
      return data || []; // Ensure it's always an array
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
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
        state.cartItems = action.payload || [];  // Ensures cartItems is always an array
        state.cartId = action.payload.cartId || "";
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
        state.cartItems = action.payload || [];  // Ensures cartItems is always an array
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
        state.cartItems = action.payload || [];  // Ensures cartItems is always an array
        state.cartId = action.payload.cartId || "";
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
        state.cartItems = action.payload || [];  // Ensures cartItems is always an array
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
  let total = 0;
  // Ensure cartItems is always an array before iteration
  (state.cart.cartItems || []).forEach((item) => {
    const price = parseFloat(item.price);
    total += price;
  });
  return total;
};
export const getCartItemsLength = (state) => state.cart.cartItems.length;

export const getCartItemAddStatus = (state) => state.cart.addStatus;
export const getCartItemFetchStatus = (state) => state.cart.fetchStatus;
export const getCartItemRemoveStatus = (state) => state.cart.removeStatus;

export default cartSlice.reducer;
