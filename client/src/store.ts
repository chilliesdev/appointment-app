import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';

export const store = configureStore({
  reducer: {
    accessToken: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
