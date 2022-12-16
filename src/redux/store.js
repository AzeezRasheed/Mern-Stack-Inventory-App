import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import productReducer from "../redux/product/productSlice";
import filterReducer from "../redux/product/filterSlice";
import inputBooleanReducer from "../redux/inputBoolean/inputBooleanSlice";
const store = configureStore({
  reducer: { auth: authReducer, product: productReducer, filter: filterReducer, inputBoolean:inputBooleanReducer  },
});

export default store;
