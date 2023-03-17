import { createSlice } from "@reduxjs/toolkit";

const initialState = { homepageData: [], isLoading: true };

export const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setHomepageData: (state, action) => {
      state.homepageData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;
