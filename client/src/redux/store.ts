import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import themeReducer from "../theme/themeSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    themeState: themeReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
