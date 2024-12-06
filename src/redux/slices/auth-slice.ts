import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { AuthState } from "@/common/interfaces/redux/state/auth-state";
import { AuthPayload } from "@/common/interfaces/redux/payloads/auth-payload";

const initialState: AuthState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth") as string)
  : {
      isLoggedIn: false,
      firstName: "",
      lastName: "",
      email: "",
      userId: "",
      token: "",
      roles: [],
    };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthPayload>) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.userId = "";
      state.token = "";
      state.roles = [];
    },
    refreshAuth: (state, action: PayloadAction<AuthPayload>) => {
      state.isLoggedIn = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
