import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppPageShell } from "@/components/app-shell";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/types";
import { saveNote } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";

type NotesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Notes"
>;

export default function NotesScreen() {
  const [note, setNote] = useState("");
  const navigation = useNavigation<NotesNavigationProp>();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveNote({ note: note || "Empty note" }));
  };

  return (
    <AppPageShell
      title="Notes App"
      description="Write a note and save it to your notes history."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("NotesHistory")}
    >
      <View style={styles.fieldGroup}>
        <ThemedText type="subtitle">Your note</ThemedText>
        <ThemedTextInput
          value={note}
          onChangeText={setNote}
          placeholder="Write something..."
          multiline
        />
      </View>
    </AppPageShell>
  );
}

const styles = StyleSheet.create({
  fieldGroup: {
    gap: Spacing.two,
  },
});
