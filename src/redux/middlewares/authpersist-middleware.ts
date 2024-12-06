import { Middleware } from "@reduxjs/toolkit";
import { login, logout } from "../slices/auth-slice";

const authPersistMiddleware: Middleware = () => (next) => (action) => {
  if (login.match(action)) {
    const authPayload = action.payload;
    localStorage.setItem(
      "auth",
      JSON.stringify({ ...authPayload, isLoggedIn: true })
    );
  } else if (logout.match(action)) {
    localStorage.removeItem("auth");
  }

  return next(action);
};

export default authPersistMiddleware;
