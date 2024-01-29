import { createSlice } from "@reduxjs/toolkit";

// Define a slice of the Redux store for managing the shopping cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],  // Array to store individual products in the cart
    quantity: 0,   // Total quantity of items in the cart
    total: 0,      // Total cost of items in the cart
  },

  reducers: {
    // Reducer function to add a product to the cart
    addProduct: (state, action) => {
      state.products.push(action.payload);  // Add the new product to the products array
      state.quantity += 1;  // Increase the total quantity
      const productTotal = action.payload.price * action.payload.quantity;
      state.total += productTotal;  // Increase the total cost
    },

    // Reducer function to delete a product from the cart
    deleteProduct: (state, action) => {
      const productIdToDelete = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === productIdToDelete
      );

      // Check if the product to delete is in the cart
      if (productIndex !== -1) {
        const deletedProduct = state.products.splice(productIndex, 1)[0];
        state.quantity -= 1;  // Decrease the total quantity
        state.total -= deletedProduct.price * deletedProduct.quantity;  // Decrease the total cost
      }
    },

    // Reducer function to reset the cart to its initial state
    reset: (state) => {
      state.products = [];  // Empty the products array
      state.quantity = 0;   // Reset the total quantity
      state.total = 0;      // Reset the total cost
    },
  },
});

// Export action creators and the reducer from the slice
export const { addProduct, deleteProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
