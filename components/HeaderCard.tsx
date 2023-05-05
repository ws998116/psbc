import React from "react";
import { Button, XStack, Card, H2, Paragraph, CardProps, Image } from "tamagui";

export function HeaderCard(cardProps: CardProps) {
  return (
    <Card elevate size="$4" bordered {...cardProps}>
      <Card.Header padded>
        <H2>Welcome</H2>
        {/* <Paragraph theme="alt2">Now available</Paragraph> */}
      </Card.Header>
      {/* <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer> */}
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: "100%",
            height: "100%",
            uri: "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png"
          }}
        />
      </Card.Background>
    </Card>
  );
}
