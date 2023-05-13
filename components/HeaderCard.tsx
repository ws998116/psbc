import React from "react";
import { Button, XStack, Card, H2, Paragraph, CardProps, Theme, YStack } from "tamagui";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function HeaderCard(cardProps: CardProps) {
  return (
    <YStack flex={1} {...cardProps}>
      {/* <Card elevate size="$4" bordered {...cardProps} flex={1}>
        <Card.Header padded flex={1}> */}
          <H2>Welcome</H2>
          <Paragraph theme="alt2">We're glad you're here</Paragraph>
          <Image
            contentFit="contain"
            source={{
              uri: "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png",
            }}
            style={{ width: "90%", height: "90%", alignSelf: "center", flex: 1 }}
          />
        {/* </Card.Header>
      </Card> */}
    </YStack>
  );
}
