import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/root-reducer";
import authPersistMiddleware from "../middlewares/authpersist-middleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authPersistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
