import { createSelector } from 'reselect';

//input selector
const selectCart = state => state.cart;

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

//output selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 
    0
  ) 
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (totalPrice, cartItem) => totalPrice + (cartItem.price * cartItem.quantity),
    0
  )
);