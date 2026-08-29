import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { AppPageShell } from "@/components/app-shell";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/types";
import { saveStopwatch } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";

type StopwatchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Stopwatch"
>;

export default function StopwatchScreen() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const navigation = useNavigation<StopwatchNavigationProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isRunning) return undefined;
    const interval = setInterval(() => {
      setSeconds((value) => value + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSave = () => {
    dispatch(saveStopwatch({ duration: Number(seconds.toFixed(1)) }));
  };

  return (
    <AppPageShell
      title="Stopwatch"
      description="Track elapsed time and save the current duration."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("StopwatchHistory")}
    >
      <ThemedView type="backgroundElement" style={styles.timerCard}>
        <ThemedText type="title" style={styles.timerText}>
          {seconds.toFixed(1)}s
        </ThemedText>
        <View style={styles.row}>
          <AppButton
            onPress={() => setIsRunning((value) => !value)}
            style={styles.smallButton}
          >
            {isRunning ? "Pause" : "Start"}
          </AppButton>
          <AppButton onPress={() => setSeconds(0)} style={styles.smallButton}>
            Reset
          </AppButton>
        </View>
      </ThemedView>
    </AppPageShell>
  );
}

const styles = StyleSheet.create({
  timerCard: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.four,
  },
  timerText: {
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
