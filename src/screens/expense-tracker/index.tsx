import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppPageShell } from "@/components/app-shell";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/types";
import { saveExpense } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";

type ExpenseTrackerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ExpenseTracker"
>;

export default function ExpenseTrackerScreen() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const navigation = useNavigation<ExpenseTrackerNavigationProp>();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(
      saveExpense({
        description: description || "Expense",
        amount: Number(amount) || 0,
      }),
    );
  };

  return (
    <AppPageShell
      title="Expense Tracker"
      description="Record an expense and save it to your spending history."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("ExpenseTrackerHistory")}
    >
      <View style={styles.group}>
        <ThemedText type="subtitle">Description</ThemedText>
        <ThemedTextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Coffee, groceries, etc."
        />
      </View>
      <View style={styles.group}>
        <ThemedText type="subtitle">Amount</ThemedText>
        <ThemedTextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />
      </View>
    </AppPageShell>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: Spacing.two,
  },
});
