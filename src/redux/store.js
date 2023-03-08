import { combineReducers, configureStore } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({});

const rootReducer = (state, action) => {
  if (action.type === "user/logoutComplete") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
