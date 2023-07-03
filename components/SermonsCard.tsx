import React, { useEffect, useRef } from "react";
import {
  XStack,
  Card,
  H2,
  Paragraph,
  CardProps,
  Spacer,
  YStack,
  Stack,
} from "tamagui";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Headphones } from "@tamagui/lucide-icons";

interface Props {
  cardProps: CardProps;
  image: string;
}

let timer: NodeJS.Timer;

export default function SermonsCard(props: Props) {
  return (
    <Card elevate size="$4" bordered {...props.cardProps} flex={1}>
      <Stack flex={1} alignItems="center" justifyContent="center">
        <Image
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            flex: 1,
          }}
          contentFit="cover"
          source={{
            uri: props.image,
          }}
          transition={200}
        />
      </Stack>
      <Link href="/sermons" asChild>
        <Card.Header padded flex={1}>
          <YStack>
            <XStack justifyContent="space-between">
              <H2>Sermon Series</H2>
              <Stack paddingTop={7}>
                <Headphones />
              </Stack>
            </XStack>
            <Paragraph theme="alt2">Listen to past messages</Paragraph>
            <Spacer />
            <Paragraph alignSelf="flex-end">See all</Paragraph>
          </YStack>
        </Card.Header>
      </Link>
    </Card>
  );
}
