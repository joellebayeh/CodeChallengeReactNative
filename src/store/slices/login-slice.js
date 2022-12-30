import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    accessToken: "",
    error: null,
    loading: false,
  },
  reducers: {
    logInReq(state) {
      state.loading = true;
      state.error = "";
    },
    logInSuccess(state, action) {
      state.loading = false; 
      state.error = "";
      state.accessToken = action.payload;
    },
    logInFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logOut(state, action) {
      state.accessToken = "";
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
