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
import { saveMovieRater } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";

type MovieRaterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MovieRater"
>;

export default function MovieRaterScreen() {
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState(3);
  const navigation = useNavigation<MovieRaterNavigationProp>();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(saveMovieRater({ movie: movie || "Untitled", rating }));
  };

  return (
    <AppPageShell
      title="Movie Rater"
      description="Rate a movie and save the result to your history."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("MovieRaterHistory")}
    >
      <View style={styles.group}>
        <ThemedText type="subtitle">Movie title</ThemedText>
        <ThemedTextInput
          value={movie}
          onChangeText={setMovie}
          placeholder="Enter movie title"
        />
      </View>
      <View style={styles.rowBetween}>
        <ThemedText>Rating: {rating}/5</ThemedText>
        <View style={styles.row}>
          <AppButton
            onPress={() => setRating((value) => Math.max(1, value - 1))}
            style={styles.smallButton}
          >
            -
          </AppButton>
          <AppButton
            onPress={() => setRating((value) => Math.min(5, value + 1))}
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
