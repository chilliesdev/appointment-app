import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SigninInput } from './types';
import { SignupInput } from './types';

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
    signin: (state, action: PayloadAction<SigninInput>) => {
      console.log(action.payload);
    },
    signup: (state, action: PayloadAction<SignupInput>) => {
      console.log(action.payload);
    },
    logout: (state) => {},
  },
});

export const { signin, signup, logout } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.accessToken.value;

export default authSlice.reducer;
