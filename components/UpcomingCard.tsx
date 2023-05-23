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
import { CalendarClock } from "@tamagui/lucide-icons";

export default function UpcomingCard(cardProps: CardProps) {
  return (
    <Link href="/upcoming" asChild>
      <Card elevate size="$4" bordered {...cardProps} flex={1}>
        <Card.Header padded flex={1}>
          <YStack>
            <XStack justifyContent="space-between">
              <H2>Upcoming Events</H2>
              <CalendarClock />
            </XStack>
            <Paragraph theme="alt2">
              Have some fun with our community
            </Paragraph>
            <Spacer />
            <Paragraph alignSelf="flex-end">View calendar</Paragraph>
          </YStack>
        </Card.Header>
      </Card>
    </Link>
  );
}
