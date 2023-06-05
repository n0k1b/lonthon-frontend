import { createSlice } from "@reduxjs/toolkit";

const initialState = { homepageData: [], isLoading: true, contentByCat: [] };

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
    setContentByCat: (state, action) => {
      state.contentByCat = action.payload;
    },
  },
});

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;
