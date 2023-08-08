import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import loginSlice from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice,
  },
});

setupListeners(store.dispatch);
