import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  type ListRenderItem,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme";
import { routeMap } from "@/navigation/screen-registry";
import type { RootStackParamList } from "@/navigation/types";
import { appList } from "@/screens/app-config";
import { useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store/themeSlice";

type AppListItem = (typeof appList)[number];

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const safeArea = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const themeMode = useThemeMode();

  const buttons: ListRenderItem<AppListItem> = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate(routeMap[item.slug].screen)}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <ThemedView type="backgroundElement" style={styles.buttonContent}>
        <ThemedText type="smallBold">{item.title}</ThemedText>
        <ThemedText
          type="small"
          themeColor="textSecondary"
          style={styles.buttonDescription}
        >
          {item.description}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );

  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.heroSection}>
        <ThemedText type="title">Apps</ThemedText>
        <ThemedView style={styles.themeRow}>
          <ThemedText type="subtitle">Theme</ThemedText>
          <ThemedView style={styles.switchRow}>
            <ThemedText themeColor="textSecondary">
              {themeMode === "dark" ? "Dark" : "Light"}
            </ThemedText>
            <Switch
              value={themeMode === "dark"}
              onValueChange={() => dispatch(toggleTheme())}
              thumbColor={Platform.OS === "android" ? "#ffffff" : undefined}
              trackColor={{ false: "#bbb", true: "#666" }}
            />
          </ThemedView>
        </ThemedView>
        <ThemedText themeColor="textSecondary" style={styles.subheading}>
          Choose one of the mini apps below and keep saving records to review on
          a dedicated history screen.
        </ThemedText>
      </ThemedView>
      <FlatList
        data={appList}
        keyExtractor={(item) => item.slug}
        numColumns={2}
        renderItem={buttons}
        style={styles.flatList}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: safeArea.bottom + BottomTabInset + Spacing.four,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    gap: Spacing.four,
  },
  contentContainer: {
    flexGrow: 1,
    margin: Spacing.four,
  },
  heroSection: {
    width: "100%",
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
    marginBottom: Spacing.four,
    alignItems: "center",
    paddingTop: Spacing.six,
    paddingHorizontal: Spacing.four,
    alignSelf: "center",
  },
  subheading: {
    maxWidth: 620,
    textAlign: "center",
  },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: Spacing.two,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  button: {
    borderRadius: Spacing.two,
    borderWidth: 1,
    overflow: "hidden",
    width: "48%",
    marginBottom: Spacing.four,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonContent: {
    padding: Spacing.four,
    borderRadius: Spacing.four,
    gap: Spacing.one,
  },
  buttonDescription: {
    marginTop: Spacing.one,
  },
});
