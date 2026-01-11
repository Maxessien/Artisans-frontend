import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./store_slices/userAuthSlice.js";
import screenSizeReducer from "./store_slices/windowSizesSlice.js";
import productPageReducer from "./store_slices/productPageSlice.js";
import checkoutProductsReducer from './store_slices/checkoutProductsSlice';

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    screenSize: screenSizeReducer,
    productPage: productPageReducer,
    checkoutProducts: checkoutProductsReducer
  },
});

export default store;
