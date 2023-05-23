import config from "../tamagui.config";

import React, { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Animated, useColorScheme } from "react-native";
import { Button, TamaguiProvider, Theme } from "tamagui";
import { Stack, usePathname, useRouter } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import LogoTitle from "../components/LogoTitle";
import { Settings } from "@tamagui/lucide-icons";

export default function App() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();

  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    if (pathname === "/settings") {
      setShowSettings(false);
    } else {
      setShowSettings(true);
    }
  }, [pathname]);

  const settingsOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showSettings) {
      Animated.timing(settingsOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(settingsOpacity, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [showSettings]);

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
              headerBlurEffect: colorScheme === "dark" ? "dark" : "prominent",
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
            <Stack.Screen
              name="settings"
              options={{
                title: "Settings",
                headerTitle: () => <LogoTitle back />,
              }}
            />
          </Stack>
          <Animated.View
            style={{
              opacity: settingsOpacity,
              position: "absolute",
              right: 15,
              top: 45,
            }}
          >
            <Button
              bg={"transparent"}
              circular
              icon={<Settings color="gray" />}
              onPress={() => router.push("/settings")}
            />
          </Animated.View>
          <StatusBar style="auto" />
        </ThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}
