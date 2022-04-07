import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { fetchSignIn, fetchSignUp } from "../hooks/useFetchFromServer";
import { RootState } from "../redux/store";
import { SigninInput, SignupInput } from "./types";

interface AuthState {
  accessToken: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  message: string | undefined;
}

const initialState: AuthState = {
  accessToken:
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken"),
  loading: "idle",
  message: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    signUp(builder);
    signIn(builder);
  },
});

const signUp = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(fetchSignUp.pending, (state) => {
    state.loading = "pending";
  });

  builder.addCase(fetchSignUp.fulfilled, (state, action) => {
    processAccessToken(state, action);
  });

  builder.addCase(fetchSignUp.rejected, (state, action) => {
    state.loading = "failed";
    if (action.payload) state.message = action.error.message;
  });
};

const signIn = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(fetchSignIn.pending, (state) => {
    state.loading = "pending";
  });

  builder.addCase(fetchSignIn.fulfilled, (state, action) => {
    processAccessToken(state, action);
  });

  builder.addCase(fetchSignIn.rejected, (state, action) => {
    state.loading = "failed";

    if (action.payload) state.message = action.error.message;
  });
};

interface formArgs {
  email: string;
  password: string;
  rememberMe?: boolean;
  name?: string;
}

function processAccessToken(
  state: WritableDraft<AuthState>,
  action: PayloadAction<
    any,
    string,
    {
      arg: formArgs;
      requestId: string;
      requestStatus: "fulfilled";
    },
    never
  >
) {
  const { access_token } = action.payload;
  switch (action.payload?.statusCode) {
    case 403:
      state.loading = "failed";
      state.accessToken = null;
      state.message = action.payload.message;
      break;

    default:
      state.loading = "succeeded";
      state.accessToken = access_token;
      state.message = undefined;

      action.meta.arg?.rememberMe
        ? localStorage.setItem("accessToken", access_token)
        : sessionStorage.setItem("accessToken", access_token);

      break;
  }
}

export const { logout } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.authState;

export default authSlice.reducer;
