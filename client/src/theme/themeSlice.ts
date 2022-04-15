import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

interface ThemeState {
  theme: "light" | "dark";
}

const setTypedStorageItem = <T extends keyof ThemeState>(
  key: T,
  value: ThemeState["theme"]
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getTypedStorageItem = <T extends keyof ThemeState>(
  key: T
): ThemeState[T] | null => {
  return JSON.parse(localStorage.getItem(key) as ThemeState[T]);
};

function getInitialTheme(): ThemeState["theme"] {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = getTypedStorageItem("theme");

    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      const root = window.document.documentElement;
      const isDark = state.theme === "dark";

      root.classList.remove(isDark ? "light" : "dark");
      root.classList.add(state.theme);

      setTypedStorageItem("theme", state.theme);

      state.theme = isDark ? "light" : "dark";
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.themeState;

export default themeSlice.reducer;
