import { useMemo } from "react";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAppSelector } from "@/store/hooks";

export function useTheme() {
  const mode = useAppSelector((state) => state.theme.mode);
  return Colors[mode];
}

export function useThemeMode() {
  return useAppSelector((state) => state.theme.mode);
}

export function useSystemThemeMode() {
  const scheme = useColorScheme();
  return scheme === "dark" ? "dark" : "light";
}

export function useThemeColors() {
  const mode = useThemeMode();
  return useMemo(() => Colors[mode], [mode]);
}
