import { createAsyncThunk } from "@reduxjs/toolkit";
import { SigninInput, SignupInput } from "../auth/types";

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

async function authPost(url: string, data: SigninInput | SignupInput) {
  const serverUrl: string = process.env.REACT_APP_SERVER_URL!;

  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(serverUrl + url, {
    method: "post",
    headers: headers,
    body: JSON.stringify(data),
    mode: "cors",
  });

  return response.json();
}
