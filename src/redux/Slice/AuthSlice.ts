import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

interface UserLogin {
  email: string;
  password: string;
  [key: string]: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: UserLogin | null | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserLogin>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
