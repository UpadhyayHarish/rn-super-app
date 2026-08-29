import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
  userSet: boolean;
};

const initialState: ThemeState = {
  mode: "light",
  userSet: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.userSet = true;
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    setThemeFromSystem(state, action: PayloadAction<ThemeMode>) {
      if (!state.userSet) {
        state.mode = action.payload;
      }
    },
    markThemeAsUserSet(state) {
      state.userSet = true;
    },
  },
});

export const { toggleTheme, setTheme, setThemeFromSystem, markThemeAsUserSet } =
  themeSlice.actions;
export default themeSlice.reducer;
