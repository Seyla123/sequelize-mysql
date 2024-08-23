import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "../thunk/signUp";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    signUpSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.signUpSuccess = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.signUpSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.signUpSuccess = false;
    });
  },
});

export const authReducer = authSlice.reducer;
