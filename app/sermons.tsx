import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import { Card, Paragraph, Stack, Switch } from "tamagui";
import { H2, ScrollView, XStack, YStack } from "tamagui";

export default function Sermons() {
  const [sermonImages, setSermonImages] = useState<string[]>([]);

  const getSermonImages = async () => {
    let imgs: string[] = [];

    const uri = `https://www.parkstreetbrethren.org/sermons`;

    try {
      const result = await fetch(uri);
      const html = await result.text();
      const imgReg = /(<img\s(.*)>)/g;
      const matches = html.match(imgReg);
      if (matches == null) {
        return;
      }
      for (let i = 1; i < matches?.length; i++) {
        const match = matches[i]?.toString();
        const img = match?.split('src="')[1]?.split('"')[0];
        if (img) {
          imgs.push(`https://www.parkstreetbrethren.org/` + img);
        }
      }
    } catch (error) {
      console.error(error);
    }

    if (imgs.length > 0) {
      setSermonImages(imgs);
    }
  };

  useEffect(() => {
    getSermonImages();
  }, []);

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
        <H2 size={"$8"}>
          Sermons
        </H2>
        {sermonImages.map((image, index) => (
          <Card elevate size="$4" bordered flex={1}>
            <Stack flex={1} alignItems="center" justifyContent="center">
              <Image
                style={{
                  width: "100%",
                  aspectRatio: 16 / 9,
                  flex: 1,
                }}
                contentFit="cover"
                source={{
                  uri: image,
                }}
                transition={200}
              />
            </Stack>
            {/* <Card.Header padded flex={1}>
              <H2>test 1</H2>
            </Card.Header> */}
          </Card>
        ))}
        {/* <XStack alignItems="center" justifyContent="space-between" w={"100%"}>
          <Paragraph size="$6">Receive Push Notifications</Paragraph>
          <Switch size="$4" defaultChecked>
            <Switch.Thumb animation="quick" />
          </Switch>
        </XStack> */}
      </YStack>
    </ScrollView>
  );
}
