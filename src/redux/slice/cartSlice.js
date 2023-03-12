import { createSlice } from "@reduxjs/toolkit";

const cartItems = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  cartItems: cartItems ? cartItems : [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];

      const newTotal =
        parseFloat(state.total) + parseFloat(action.payload.total);

      state.total = parseFloat(newTotal).toFixed(2);
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find(({ _id }) => _id === action.payload);

      const newTotal = parseFloat(state.total) - parseFloat(item.total);

      state.total = parseFloat(newTotal).toFixed(2);

      state.cartItems = state.cartItems.filter(
        (entry) => entry._id !== action.payload
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
});

export const { addToCart, removeFromCart, updateCartItems, clearCart } =
  cartSlice.actions;

export const getCartItems = (state) => state.cart.cartItems;
export const getCartTotal = (state) => state.cart.total;
export const getCartItemsLength = (state) => state.cart.cartItems.length;

export default cartSlice.reducer;
