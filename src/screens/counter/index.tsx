import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppPageShell } from "@/components/app-shell";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/types";
import { saveCounter } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";

type CounterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Counter"
>;

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const navigation = useNavigation<CounterNavigationProp>();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveCounter({ value: count }));
  };

  return (
    <AppPageShell
      title="Counter"
      description="Increment, decrement, and save the current value."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("CounterHistory")}
    >
      <ThemedView type="backgroundElement" style={styles.counterCard}>
        <ThemedText type="title" style={styles.countText}>
          {count}
        </ThemedText>
        <View style={styles.row}>
          <AppButton
            onPress={() => setCount((value) => value - 1)}
            style={styles.smallButton}
          >
            -
          </AppButton>
          <AppButton
            onPress={() => setCount((value) => value + 1)}
            style={styles.smallButton}
          >
            +
          </AppButton>
          <AppButton onPress={() => setCount(0)} style={styles.smallButton}>
            Reset
          </AppButton>
        </View>
      </ThemedView>
    </AppPageShell>
  );
}

const styles = StyleSheet.create({
  counterCard: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.four,
  },
  countText: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  smallButton: {
    flex: 1,
  },
});
