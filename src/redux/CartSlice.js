import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCarts: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
});
export const { addToCarts, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
