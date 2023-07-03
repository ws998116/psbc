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
  Stack,
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
              <H2>New Survey</H2>
              <Stack paddingTop={7}>
                <Mailbox />
              </Stack>
            </XStack>
            <Paragraph theme="alt2">
              Take a quick survey to help us know more about our community
            </Paragraph>
            <Spacer />
            <Paragraph alignSelf="flex-end">Respond</Paragraph>
          </YStack>
        </Card.Header>
      </Card>
    </Link>
  );
}
