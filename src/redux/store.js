import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import categoriesReducer from "./slice/categoriesSlice";
import brandReducer from "./slice/brandSlice";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";
import addressReducer from "./slice/addressSlice";
import orderReducer from "./slice/orderSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  brand: brandReducer,
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  address: addressReducer,
  order: orderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout/fulfilled") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
