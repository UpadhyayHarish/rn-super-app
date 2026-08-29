import {
  DarkTheme,
  DefaultTheme,
  type Theme,
} from "@react-navigation/native";

import { Colors } from "@/constants/theme";

export type ThemeMode = keyof typeof Colors;

export function getNavigationTheme(mode: ThemeMode): Theme {
  const palette = Colors[mode];
  const base = mode === "dark" ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: palette.text,
      background: palette.background,
      card: palette.background,
      text: palette.text,
      border: palette.backgroundSelected,
      notification: palette.text,
    },
  };
}

export function getThemePalette(mode: ThemeMode): (typeof Colors)[ThemeMode] {
  return Colors[mode];
}
