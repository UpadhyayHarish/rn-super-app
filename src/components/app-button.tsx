import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

type AppButtonProps = Omit<PressableProps, "style"> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({ children, style, ...props }: AppButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: "rgba(0,0,0,0.08)" }}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <ThemedView type="backgroundElement" style={styles.inner}>
        <ThemedText type="subtitle" style={styles.text}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Spacing.four,
    overflow: "hidden",
    flex: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  inner: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
  },
});
