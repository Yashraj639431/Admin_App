import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pCategoryService";

// Get all Products
export const getProductCategories = createAsyncThunk(
  "productCategory/get-pCategories",
  async (thunkAPI) => {
    try {
      return await pCategoryService.getProductCategory();  
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Product
export const createProductCategories = createAsyncThunk(
  "productCategory/create-pCategories",
  async (pCategoryData, thunkAPI) => {
    try {
      return await pCategoryService.createProductCategory(pCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Product
export const getAProductCategories = createAsyncThunk(
  "productCategory/get-ApCategories",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.getAProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Product
export const updateProductCategories = createAsyncThunk(
  "productCategory/update-pCategories",
  async (pCategory, thunkAPI) => {
    try {
      return await pCategoryService.updateProductCategory(pCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Product
export const deleteProductCategories = createAsyncThunk(
  "productCategory/delete-pCategories",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.deleteProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  pCategory: [],
  createdProductCategory: "",
  categoryName: "",
  updatedCategory: "",
  deletedCategory: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productCategorySlice = createSlice({
  name: "pCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategory = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProductCategory = action.payload;
      })
      .addCase(createProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getAProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productCategorySlice.reducer;
