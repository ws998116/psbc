import React from "react";
import { Stack } from "expo-router";

import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { Platform } from "react-native";

export default function TabLayout() {

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
          title: "Series",
          headerShown: Platform.OS != "ios",
          presentation: Platform.OS === "ios" ? "modal" : "card",
        }}
      />
    </Stack>
  );
}
