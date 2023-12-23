import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

// Get all Coupons
export const getCoupons = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupon();  
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Coupon
export const createCoupons = createAsyncThunk(
  "coupon/create-coupons",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Coupon
export const getACoupon = createAsyncThunk(
  "coupon/get-a-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getACoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Brand
export const updateCoupons = createAsyncThunk(
  "coupon/update-coupons",
  async (coupon, thunkAPI) => {
    try {
      return await couponService.updateCoupon(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Coupon
export const deleteCoupons = createAsyncThunk(
  "coupon/delete-coupons",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponName = action.payload[0].name;
        state.couponDiscount = action.payload[0].discount;
        state.couponExpiry = action.payload[0].expiry;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponName = action.payload[0].name;
        state.couponDiscount = action.payload[0].discount;
        state.couponExpiry = action.payload[0].expiry;
      })
      .addCase(updateCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
