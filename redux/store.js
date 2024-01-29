import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";

// Create a Redux store using configureStore from @reduxjs/toolkit
const store = configureStore({
  reducer: {
    cart: cartReducer,  // Set the cartReducer as the reducer for the "cart" slice
  },
});

export default store;  // Export the configured Redux store
