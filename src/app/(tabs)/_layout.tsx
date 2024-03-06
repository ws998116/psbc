import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Church, AudioLines, Settings } from "lucide-react-native";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import MiniPlayer from "@/src/components/MiniPlayer";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Church color={color} />,
            headerRight: () => (
              <Link href="/settings" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Settings
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="sermons"
          options={{
            title: "Sermons",
            tabBarIcon: ({ color }) => <AudioLines color={color} />,
            headerShown: false,
          }}
        />
      </Tabs>
      <MiniPlayer />
    </>
  );
}
