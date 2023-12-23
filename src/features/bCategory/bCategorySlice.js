import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryService";

// Get all Blogs Category
export const getCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategories();  
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Blogs Category
export const createBlogCategories = createAsyncThunk(
  "blogCategory/create-category",
  async (bCategoryData, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(bCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Blog Category
export const getABlogCategories = createAsyncThunk(
  "blogCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Blog Category
export const updateBlogCategories = createAsyncThunk(
  "blogCategory/update-category",
  async (blogCat, thunkAPI) => {
    try {
      return await bCategoryService.updateBlogCategory(blogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Blog Category
export const deleteBlogCategories = createAsyncThunk(
  "blogCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bcategoryName = action.payload.title;
      })
      .addCase(getABlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedbCategory = action.payload;
      })
      .addCase(updateBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedbCategory = action.payload;
      })
      .addCase(deleteBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
