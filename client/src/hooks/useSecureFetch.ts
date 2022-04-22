import { SuggestionsDataType } from "../components/types";
import { store } from "../redux/store";
import { UserTypes } from "./types/User.type";

export const useFilterUsers = async (data: {
  name?: string;
  email?: string;
}): Promise<SuggestionsDataType> => {
  const state = await store.getState();

  const accessToken = state.authState.accessToken;

  return secureFetch(
    "GET",
    "/user/filter/?" + new URLSearchParams(data),
    accessToken
  );
};

export const useEditUser = async (data: UserTypes): Promise<unknown> => {
  const state = await store.getState();

  const accessToken = state.authState.accessToken;

  return await secureFetch("PATCH", "/user", accessToken, data);
};

export const useGetUser = async (): Promise<{
  email: string;
  id: number;
  name: string;
}> => {
  const state = await store.getState();

  const accessToken = state.authState.accessToken;

  return await secureFetch("GET", "/user", accessToken);
};

async function secureFetch(
  method: string,
  url: string,
  accessToken: string | null,
  body?: any
) {
  const serverUrl: string = process.env.REACT_APP_SERVER_URL!;
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  let request: RequestInit | undefined = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(serverUrl + url, request);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
