import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../Slice/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
