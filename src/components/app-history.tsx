import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export type AppHistoryItem = {
  id: string;
  title: string;
  subtitle: string;
};

type AppHistoryProps = {
  title: string;
  items: AppHistoryItem[];
  onDelete?: (id: string) => void;
  onClear?: () => void;
};

export function AppHistory({
  title,
  items,
  onDelete,
  onClear,
}: AppHistoryProps) {
  const handleClear = () => {
    if (!onClear || items.length === 0) {
      return;
    }

    Alert.alert("Clear history", "Remove all saved records?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: onClear },
    ]);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.container}>
        <View style={styles.headerRow}>
          <ThemedText type="title" style={styles.heading}>
            {title}
          </ThemedText>
          {onClear && items.length > 0 ? (
            <AppButton onPress={handleClear} style={styles.clearButton}>
              Clear all
            </AppButton>
          ) : null}
        </View>

        {items.length === 0 ? (
          <ThemedView type="backgroundElement" style={styles.emptyCard}>
            <ThemedText type="subtitle">No history yet.</ThemedText>
            <ThemedText themeColor="textSecondary">
              Save a record from the app page and it will appear here.
            </ThemedText>
          </ThemedView>
        ) : (
          items.map((item) => (
            <ThemedView
              key={item.id}
              type="backgroundElement"
              style={styles.recordCard}
            >
              <View style={styles.recordRow}>
                <View style={styles.recordContent}>
                  <ThemedText type="subtitle" style={styles.recordTitle}>
                    {item.title}
                  </ThemedText>
                  <ThemedText themeColor="textSecondary">
                    {item.subtitle}
                  </ThemedText>
                </View>
                {onDelete ? (
                  <Pressable
                    onPress={() => onDelete(item.id)}
                    style={({ pressed }) => [
                      styles.deleteButton,
                      pressed && styles.pressed,
                    ]}
                    accessibilityLabel="Delete record"
                  >
                    <ThemedText type="smallBold" themeColor="textSecondary">
                      Delete
                    </ThemedText>
                  </Pressable>
                ) : null}
              </View>
            </ThemedView>
          ))
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: BottomTabInset + Spacing.six,
  },
  container: {
    width: "100%",
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
    padding: Spacing.four,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.two,
  },
  heading: {
    flex: 1,
  },
  clearButton: {
    flex: 0,
    minWidth: 100,
  },
  emptyCard: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  recordCard: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
  },
  recordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  recordContent: {
    flex: 1,
    gap: Spacing.one,
  },
  recordTitle: {
    marginBottom: Spacing.one,
  },
  deleteButton: {
    padding: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
});
