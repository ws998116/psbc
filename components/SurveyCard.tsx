import React from "react";
import {
  Button,
  XStack,
  Card,
  H2,
  Paragraph,
  CardProps,
  Spacer,
  YStack,
} from "tamagui";
import { Link } from "expo-router";
import { Mailbox } from "@tamagui/lucide-icons";

export default function SurveyCard(cardProps: CardProps) {
  return (
    <Link href="/survey" asChild>
      <Card elevate size="$4" bordered {...cardProps} flex={1}>
        <Card.Header padded flex={1}>
          <YStack>
            <XStack justifyContent="space-between">
              <H2>New Survey Posted</H2>
              <Mailbox />
            </XStack>
            <Paragraph theme="alt2">
              Take a quick survey to help us know more about our community
            </Paragraph>
            <Spacer />
            <Paragraph alignSelf="flex-end">Take now</Paragraph>
          </YStack>
        </Card.Header>
      </Card>
    </Link>
  );
}
