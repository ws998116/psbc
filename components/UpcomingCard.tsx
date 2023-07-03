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
import { CalendarClock } from "@tamagui/lucide-icons";
import PagerView from "react-native-pager-view";

interface Props {
  cardProps: CardProps;
  images: string[];
}

let timer: NodeJS.Timer;

export default function UpcomingCard(props: Props) {
  const pagerViewRef = useRef<PagerView>(null);

  const resetTimer = (page: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      page = Math.abs(page - 1);
      pagerViewRef.current?.setPage(page);
    }, 7000);
  };

  return (
    <Card elevate size="$4" bordered {...props.cardProps} flex={1}>
      {/* <PagerView
        style={{ flex: 1, width: "100%", height: 150 }}
        initialPage={0}
        onPageSelected={(e) => resetTimer(e.nativeEvent.position)}
        ref={pagerViewRef}
      >
        {props.images.map((image, index) => (
          <Stack flex={1} alignItems="center" justifyContent="center" key={index}>
            <Card height={"100%"}>
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
            </Card>
          </Stack>
        ))}
      </PagerView> */}
      <XStack flex={1}>
        {props.images.map((image, index) => (
          <Stack
            flex={1}
            alignItems="center"
            justifyContent="center"
            key={index}
          >
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
        ))}
      </XStack>
      <Link href="/upcoming" asChild>
        <Card.Header padded flex={1}>
          <YStack>
            <XStack justifyContent="space-between">
              <H2>Upcoming Events</H2>
              <Stack paddingTop={7}>
                <CalendarClock />
              </Stack>
            </XStack>
            <Paragraph theme="alt2" >Have some fun with our community</Paragraph>
            <Spacer />
            <Paragraph alignSelf="flex-end">View calendar</Paragraph>
          </YStack>
        </Card.Header>
      </Link>
    </Card>
  );
}
