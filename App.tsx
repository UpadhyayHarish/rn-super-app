import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { ThemeSync } from "@/components/theme-sync";
import { useThemeMode } from "@/hooks/use-theme";
import AppNavigator from "@/navigation/AppNavigator";
import { persistor, store } from "@/store/store";

function AppContent() {
  const themeMode = useThemeMode();

  return (
    <>
      <ThemeSync />
      <AnimatedSplashOverlay />
      <AppNavigator />
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
