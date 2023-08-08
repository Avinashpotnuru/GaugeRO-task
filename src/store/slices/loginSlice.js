import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: {
    status: true,
    helperData: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStatusHandler: (state, action) => {
      state.loginStatus.status = false;
      state.loginStatus.helperData = action.payload;
    },
  },
});

export const { loginStatusHandler } = loginSlice.actions;

export default loginSlice.reducer;
