import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "@/screens/index";
import { useAppSelector } from "@/store/hooks";
import { getNavigationTheme } from "./navigation-theme";
import { appScreenRegistry } from "./screen-registry";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <NavigationContainer theme={getNavigationTheme(themeMode)}>
      <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Apps" }}
        />
        {appScreenRegistry.flatMap((entry) => [
          <Stack.Screen
            key={entry.screenName}
            name={entry.screenName}
            component={entry.Screen}
            options={{ title: entry.title }}
          />,
          <Stack.Screen
            key={entry.historyScreenName}
            name={entry.historyScreenName}
            component={entry.HistoryScreen}
            options={{ title: entry.historyTitle }}
          />,
        ])}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
