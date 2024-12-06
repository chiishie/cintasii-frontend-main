import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/redux/slices/auth-slice";

export const rootReducer = combineReducers({
  auth: authSlice,
});
