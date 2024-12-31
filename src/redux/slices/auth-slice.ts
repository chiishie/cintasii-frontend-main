import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { AuthState } from "@/common/interfaces/redux/state/auth-state";
import { AuthPayload } from "@/common/interfaces/redux/payloads/auth-payload";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Token validation error:", error.message);
    }
    return false;
  }
};

const storedAuth = localStorage.getItem("auth");
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;
const initialState: AuthState =
  parsedAuth && isTokenValid(parsedAuth.token)
    ? parsedAuth
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
