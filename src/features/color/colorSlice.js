import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

// Get all Colors
export const getColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getColor();  
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create a Color
export const createColors = createAsyncThunk(
  "color/create-colors",
  async (colorData, thunkAPI) => {
    try {
      return await colorService.createColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Color
export const getAColors = createAsyncThunk(
  "color/get-acolors",
  async (id, thunkAPI) => {
    try {
      return await colorService.getAColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Color
export const updateColors = createAsyncThunk(
  "color/update-colors",
  async (color, thunkAPI) => {
    try {
      return await colorService.updateColor(color);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Color
export const deleteColors = createAsyncThunk(
  "color/delete-colors",
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload.title;
      })
      .addCase(getAColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
      })
      .addCase(deleteColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
