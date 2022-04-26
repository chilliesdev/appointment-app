import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import {
  fetchGoogleSignin,
  fetchSignIn,
  fetchSignUp,
} from "../hooks/useFetchFromServer";
import { RootState } from "../redux/store";
import { GoogleSignin, SigninInput, SignupInput } from "./types";

interface userType {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  accessToken: string | null;
  user: userType | undefined;
  loading: "idle" | "pending" | "succeeded" | "failed";
  message: string | undefined;
}

const initialState: AuthState = {
  accessToken:
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken"),
  user: undefined,
  loading: "idle",
  message: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = undefined;
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    signUp(builder);
    signIn(builder);
    googleSignin(builder);
  },
});

const googleSignin = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(fetchGoogleSignin.pending, (state) => {
    state.loading = "pending";
  });

  builder.addCase(fetchGoogleSignin.fulfilled, (state, action) => {
    processAccessToken(state, action);
  });

  builder.addCase(fetchGoogleSignin.rejected, (state, action) => {
    state.loading = "failed";
    if (action.payload) state.message = action.error.message;
  });
};

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

function processAccessToken(
  state: WritableDraft<AuthState>,
  action: PayloadAction<
    any,
    string,
    {
      arg: SigninInput | SignupInput | GoogleSignin;
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
      // state.user =

      if ("rememberMe" in action.meta.arg)
        action.meta.arg.rememberMe
          ? localStorage.setItem("accessToken", access_token)
          : sessionStorage.setItem("accessToken", access_token);
      else sessionStorage.setItem("accessToken", access_token);
      break;
  }
}

export const { logout, setUserData } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.authState;

export default authSlice.reducer;
