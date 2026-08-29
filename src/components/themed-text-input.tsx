import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type ThemedTextInputProps = TextInputProps & {
  multiline?: boolean;
};

export function ThemedTextInput({
  style,
  multiline,
  ...props
}: ThemedTextInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      placeholderTextColor={theme.textSecondary}
      multiline={multiline}
      style={[
        styles.input,
        multiline && styles.textArea,
        {
          color: theme.text,
          borderColor: theme.backgroundSelected,
          backgroundColor: theme.backgroundElement,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: Spacing.four,
    padding: Spacing.three,
    minHeight: 48,
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: "top",
  },
});
