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
import { saveGithubProfile } from "@/store/historySlice";
import { useAppDispatch } from "@/store/hooks";

type GithubProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GithubProfile"
>;

type GithubProfileData = {
  name?: string;
  publicRepos?: number;
};

export default function GithubProfileScreen() {
  const [username, setUsername] = useState("");
  const [profileText, setProfileText] = useState("");
  const [profileData, setProfileData] = useState<GithubProfileData | null>(
    null,
  );
  const navigation = useNavigation<GithubProfileNavigationProp>();
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(
      saveGithubProfile({
        username: username || "unknown",
        name: profileData?.name,
        publicRepos: profileData?.publicRepos,
      }),
    );
  };

  const handleFetch = async () => {
    if (!username) {
      setProfileText("Enter a username to fetch.");
      setProfileData(null);
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        setProfileText("User not found");
        setProfileData(null);
        return;
      }
      const data = await response.json();
      const nextProfile = {
        name: data.name ?? undefined,
        publicRepos: data.public_repos as number,
      };
      setProfileData(nextProfile);
      setProfileText(
        `Name: ${data.name || "N/A"} • Repos: ${data.public_repos}`,
      );
    } catch {
      setProfileText("Unable to load profile");
      setProfileData(null);
    }
  };

  return (
    <AppPageShell
      title="GitHub Profile Viewer"
      description="Lookup a GitHub username and save the profile entry."
      onSave={handleSave}
      onViewHistory={() => navigation.navigate("GithubProfileHistory")}
    >
      <View style={styles.group}>
        <ThemedText type="subtitle">Username</ThemedText>
        <ThemedTextInput
          value={username}
          onChangeText={setUsername}
          placeholder="octocat"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <AppButton onPress={handleFetch}>View Profile</AppButton>
      {profileText ? (
        <ThemedText themeColor="textSecondary">{profileText}</ThemedText>
      ) : null}
    </AppPageShell>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: Spacing.two,
  },
});
