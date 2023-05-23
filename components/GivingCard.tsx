import React from "react";
import {
  Button,
  XStack,
  Card,
  H2,
  Paragraph,
  CardProps,
  Theme,
  Spacer,
  YStack,
} from "tamagui";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { HelpingHand } from "@tamagui/lucide-icons";

export default function GivingCard(cardProps: CardProps) {
  return (
    <Link href="/giving" asChild>
      <Card elevate size="$4" bordered {...cardProps} flex={1}>
        <Card.Header padded flex={1}>
          <YStack>
            <XStack justifyContent="space-between">
              <H2>Give to Park Street</H2>
              <HelpingHand />
            </XStack>
            <Paragraph theme="alt2">
              Honor the Lord through giving
            </Paragraph>
            <Spacer />
            <Paragraph alignSelf="flex-end">Give now</Paragraph>
          </YStack>
        </Card.Header>
      </Card>
    </Link>
  );
}
