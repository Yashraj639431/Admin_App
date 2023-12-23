import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import productCategoryReducer from "../features/pCategory/pCategorySlice";
import blogCategoryReducer from "../features/bCategory/bCategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";
import couponReduer from "../features/coupon/couponSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    customer: customerReducer,
    brand: brandReducer,
    pCategory: productCategoryReducer,
    bCategory: blogCategoryReducer,
    color: colorReducer,
    blog: blogReducer,
    coupon: couponReduer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
  },
});
