import React from "react";
import {
  ScrollView,
  Theme,
  YStack,
} from "tamagui";
import WorshipCard from "../components/WorshipCard";

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
        <Theme name={"green"}>
          <WorshipCard
            animation="bouncy"
            size="$4"
            width={"100%"}
            flex={1}
            hoverStyle={{ scale: 1.02 }}
            pressStyle={{ scale: 1.05 }}
          />
        </Theme>
      </YStack>
    </ScrollView>
  );
}
