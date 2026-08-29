import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setThemeFromSystem } from "@/store/themeSlice";
import type { RootState } from "@/store/store";

export function ThemeSync() {
  const dispatch = useDispatch();
  const systemScheme = useColorScheme();
  const rehydrated = useSelector(
    (state: RootState & { _persist?: { rehydrated?: boolean } }) =>
      state._persist?.rehydrated ?? false,
  );
  const userSet = useSelector((state: RootState) => state.theme.userSet);

  useEffect(() => {
    if (!rehydrated || userSet) {
      return;
    }

    if (systemScheme === "light" || systemScheme === "dark") {
      dispatch(setThemeFromSystem(systemScheme));
    }
  }, [dispatch, rehydrated, systemScheme, userSet]);

  return null;
}
