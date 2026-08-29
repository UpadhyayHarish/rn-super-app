import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppPageShell } from "@/components/app-shell";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/types";
import { saveCalculator } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";
import { evaluateExpression } from "@/utils/evaluate-expression";

type CalculatorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Calculator"
>;

export default function CalculatorScreen() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const navigation = useNavigation<CalculatorNavigationProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setResult(expression ? evaluateExpression(expression) : "0");
  }, [expression]);

  const handleSave = () => {
    dispatch(saveCalculator({ expression: expression || "0", result }));
  };

  return (
    <AppPageShell
      title="Calculator"
      description="Type an expression and save the computed result."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("CalculatorHistory")}
    >
      <View style={styles.group}>
        <ThemedText type="subtitle">Expression</ThemedText>
        <ThemedTextInput
          value={expression}
          onChangeText={setExpression}
          placeholder="12 / 3 + 4"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <ThemedView type="backgroundElement" style={styles.resultCard}>
        <ThemedText type="subtitle">Result</ThemedText>
        <ThemedText type="title">{result}</ThemedText>
      </ThemedView>
    </AppPageShell>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: Spacing.two,
  },
  resultCard: {
    padding: Spacing.four,
    borderRadius: Spacing.four,
    gap: Spacing.two,
  },
});
