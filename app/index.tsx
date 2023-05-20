import React from "react";
import { Button, Circle, ScrollView, Theme, YStack } from "tamagui";
import WorshipCard from "../components/WorshipCard";
import UpcomingCard from "../components/UpcomingCard";
import GivingCard from "../components/GivingCard";
import { View } from "react-native";
import { Settings } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import SurveyCard from "../components/SurveyCard";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
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
          marginBottom={25}
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

          <Theme name={"yellow"}>
            <SurveyCard
              animation="bouncy"
              size="$4"
              width={"100%"}
              flex={1}
              hoverStyle={{ scale: 1.02 }}
              pressStyle={{ scale: 1.05 }}
            />
          </Theme>

          <Theme name={"blue"}>
            <UpcomingCard
              animation="bouncy"
              size="$4"
              width={"100%"}
              flex={1}
              hoverStyle={{ scale: 1.02 }}
              pressStyle={{ scale: 1.05 }}
            />
          </Theme>

          <Theme name={"purple"}>
            <GivingCard
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
    </View>
  );
}
