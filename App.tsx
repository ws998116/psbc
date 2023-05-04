import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  Paragraph,
  TamaguiProvider,
  Theme,
  YStack,
} from "tamagui";
import config from "./tamagui.config";
import React from "react";

export default function App() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Fira: require("@tamagui/font-fira-mono/ttf/FiraSans-Medium.ttf"),
    FiraBold: require("@tamagui/font-fira-mono/ttf/FiraSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
          <Paragraph color="$color" jc="center">
            PSBC
          </Paragraph>
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
