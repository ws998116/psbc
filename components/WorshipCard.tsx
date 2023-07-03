import React from "react";
import {
  Card,
  H2,
  Paragraph,
  CardProps,
  Spacer,
  YStack,
  XStack,
  Stack,
} from "tamagui";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Church } from "@tamagui/lucide-icons";

export default function WorshipCard(cardProps: CardProps) {
  return (
    <Link href="/worship" asChild>
      <Card elevate size="$4" bordered {...cardProps} flex={1}>
        <Image
          style={{
            width: "100%",
            height: 150,
            flex: 1,
          }}
          contentFit="cover"
          contentPosition={{ bottom: -100 }}
          source={{
            uri: "https://www.parkstreetbrethren.org/upload/tvd/untitled_design.png",
          }}
        />
        <Card.Header padded flex={1}>
          <YStack>
            <XStack justifyContent="space-between">
              <H2>Worship with us</H2>
              <Stack paddingTop={7}>
                <Church />
              </Stack>
            </XStack>
            <Paragraph theme="alt2">
              Services at 9:00 and 10:30 Sunday mornings
            </Paragraph>
            <Spacer />
            <Paragraph alignSelf="flex-end">More info</Paragraph>
          </YStack>
        </Card.Header>
      </Card>
    </Link>
  );
}
