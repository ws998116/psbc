import React from "react";
import { useRouter } from "expo-router";
import {
  Button,
  Card,
  H2,
  Paragraph,
  Popover,
  PopoverProps,
  ScrollView,
  Spacer,
  Stack,
  Switch,
  XStack,
  YStack,
} from "tamagui";

export default function Settings() {
  return (
    <ScrollView
      width="100%"
      backgroundColor="$background"
      padding="$4"
      borderRadius="$4"
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <YStack
        alignItems="center"
        justifyContent="center"
        flex={1}
        width={"100%"}
        space={25}
      >
        <H2 size={"$8"} theme={"alt2"}>
          Settings
        </H2>
        <XStack alignItems="center" justifyContent="space-between" w={"100%"}>
          <Paragraph size="$6">Receive Push Notifications</Paragraph>
          <Switch size="$4" defaultChecked>
            <Switch.Thumb animation="quick" />
          </Switch>
        </XStack>
      </YStack>
    </ScrollView>
  );
}
