import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
