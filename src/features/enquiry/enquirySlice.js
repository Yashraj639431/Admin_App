import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

// Get all Enquiry
export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiry();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete a Enquiry
export const deleteEnquiries = createAsyncThunk(
  "enquiry/delete-enquiries",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get a Enquiry
export const getAEnquiries = createAsyncThunk(
  "enquiry/get-a-enquiries",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getAEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update a Enquiry
export const updateEnquiries = createAsyncThunk(
  "enquiry/update-enquiries",
  async (brand, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_All");
const initialState = {
  enquiry: [],
  enquiryName: "",
  enquiryEmail: "",
  enquiryMobile: "",
  enquiryComment: "",
  enquiryStatus: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiryName = action.payload.name;
        state.enquiryEmail = action.payload.email;
        state.enquiryMobile = action.payload.mobile;
        state.enquiryComment = action.payload.comment;
        state.enquiryStatus = action.payload.status;
      })
      .addCase(getAEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
