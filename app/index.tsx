import React from "react";
import { Link, Stack } from "expo-router";
import {
  Button,
  Circle,
  Paragraph,
  ScrollView,
  Spacer,
  Square,
  XStack,
  YStack,
} from "tamagui";
import { HeaderCard } from "../components/HeaderCard";

export default function Home() {
  return (
    <ScrollView
      width="100%"
      backgroundColor="$background"
      padding="$4"
      borderRadius="$4"
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "25%",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: "Home" }} />
      <YStack alignItems="center" justifyContent="center" flex={1}>
        <Link href="/details" asChild>
          <HeaderCard
            animation="bouncy"
            size="$4"
            width={250}
            height={300}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
          />
        </Link>
        <Square margin="$4" size={120} backgroundColor="$red9" />
        <Circle margin="$4" size={120} backgroundColor="$orange9" />
        <Square margin="$4" size={120} backgroundColor="$yellow9" />
        <Circle margin="$4" size={120} backgroundColor="$green9" />
        <Square margin="$4" size={120} backgroundColor="$blue9" />
        <Circle margin="$4" size={120} backgroundColor="$purple9" />
        <Square margin="$4" size={120} backgroundColor="$pink9" />
        <Circle margin="$4" size={120} backgroundColor="$red9" />
      </YStack>
    </ScrollView>
  );
}
