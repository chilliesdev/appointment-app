import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  value: string;
}

const initialState: AuthState = {
  value: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {},
    signup: (state) => {},
    logout: (state) => {},
  },
});

export const { login, signup, logout } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.accessToken.value;

export default authSlice.reducer;
