import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/users/userSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/blog/blogSlice";
import contactReducer from "../features/contect/contactSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact:contactReducer
  },
});
