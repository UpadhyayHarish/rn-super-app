import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppPageShell } from "@/components/app-shell";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/types";
import { saveHabit } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";

type HabitTrackerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HabitTracker"
>;

export default function HabitTrackerScreen() {
  const [habit, setHabit] = useState("");
  const [frequency, setFrequency] = useState(1);
  const navigation = useNavigation<HabitTrackerNavigationProp>();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveHabit({ habit: habit || "New habit", frequency }));
  };

  return (
    <AppPageShell
      title="Habit Tracker"
      description="Track a habit and save a new routine."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("HabitTrackerHistory")}
    >
      <View style={styles.group}>
        <ThemedText type="subtitle">Habit</ThemedText>
        <ThemedTextInput
          value={habit}
          onChangeText={setHabit}
          placeholder="Daily jogging"
        />
      </View>
      <View style={styles.rowBetween}>
        <ThemedText>Times per week: {frequency}</ThemedText>
        <View style={styles.row}>
          <AppButton
            onPress={() => setFrequency((value) => Math.max(1, value - 1))}
            style={styles.smallButton}
          >
            -
          </AppButton>
          <AppButton
            onPress={() => setFrequency((value) => value + 1)}
            style={styles.smallButton}
          >
            +
          </AppButton>
        </View>
      </View>
    </AppPageShell>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallButton: {
    flex: 1,
  },
});
