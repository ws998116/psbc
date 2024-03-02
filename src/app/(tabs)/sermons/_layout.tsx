import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, Stack, Tabs } from "expo-router";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Sermon Series",
        }}
      />
      <Stack.Screen
        name="[series]"
        options={{
          title: "Sermons",
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
