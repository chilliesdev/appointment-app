import { createAsyncThunk } from "@reduxjs/toolkit";
import { SigninInput, SignupInput } from "../auth/types";
import { GoogleSignin } from "../auth/types/GoogleSignin.type";
import { useAppSelector } from "../redux/hooks";

export const fetchSignUp = createAsyncThunk(
  "auth/signUp",
  async (data: SignupInput) => {
    return await authPost("/auth/signup", data);
  }
);

export const fetchSignIn = createAsyncThunk(
  "auth/signIn",
  async (data: SigninInput) => {
    return await authPost("/auth/signin", data);
  }
);

export const fetchGoogleSignin = createAsyncThunk(
  "auth/google",
  async (data: GoogleSignin) => {
    return await authPost("/auth/google", data);
  }
);

async function authPost(
  url: string,
  data: SigninInput | SignupInput | GoogleSignin
) {
  const serverUrl: string = process.env.REACT_APP_SERVER_URL!;

  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  try {
    const response = await fetch(serverUrl + url, {
      method: "post",
      headers: headers,
      body: JSON.stringify(data),
      mode: "cors",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
