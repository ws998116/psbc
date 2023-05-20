import config from "../tamagui.config";

import React from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import LogoTitle from "../components/LogoTitle";

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
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerTransparent: true,
              headerBlurEffect: "dark",
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Welcome",
                headerTitle: () => <LogoTitle />,
                headerLargeTitle: true,
              }}
            />
            <Stack.Screen
              name="worship"
              options={{
                title: "Worship Services",
                headerTitle: () => <LogoTitle back />,
              }}
            />
            <Stack.Screen
              name="upcoming"
              options={{
                title: "Upcoming Events",
                headerTitle: () => <LogoTitle back />,
              }}
            />
            <Stack.Screen
              name="giving"
              options={{
                title: "Give to Park Street",
                headerTitle: () => <LogoTitle back />,
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}
