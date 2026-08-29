import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "@/components/app-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type AppShellProps = {
  title: string;
  description: string;
  onSave: () => void;
  onViewHistory: () => void;
  children: ReactNode;
  style?: ViewStyle;
};

export function AppPageShell({
  title,
  description,
  onSave,
  onViewHistory,
  children,
  style,
}: AppShellProps) {
  const safeArea = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={{
        paddingTop: safeArea.top + Spacing.four,
        paddingBottom: safeArea.bottom + BottomTabInset + Spacing.four,
        alignItems: "center",
      }}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={[styles.card, style]}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.description}>
          {description}
        </ThemedText>

        <View style={styles.content}>{children}</View>

        <View style={styles.buttonRow}>
          <AppButton onPress={onSave}>Save</AppButton>
          <AppButton onPress={onViewHistory}>History</AppButton>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  card: {
    width: "100%",
    maxWidth: MaxContentWidth,
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    marginBottom: Spacing.one,
  },
  description: {
    marginBottom: Spacing.three,
  },
  content: {
    gap: Spacing.three,
  },
  buttonRow: {
    flexDirection: "row",
    gap: Spacing.two,
    flexWrap: "wrap",
  },
});
