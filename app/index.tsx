import React, { useEffect, useState } from "react";
import { ScrollView, Theme, YStack } from "tamagui";
import WorshipCard from "../components/WorshipCard";
import UpcomingCard from "../components/UpcomingCard";
import GivingCard from "../components/GivingCard";
import { View } from "react-native";
import SurveyCard from "../components/SurveyCard";
import SermonsCard from "../components/SermonsCard";

export default function Home() {
  const [upcomingEventsImages, setUpcomingEventImages] = useState<string[]>([]);
  const [sermonImage, setSermonImage] = useState<string>("");

  const getUpcomingEventsImages = async () => {
    let imgs: string[] = [];
    const month = new Date(Date.now()).getMonth() + 1;
    const months = [month, month + 1];
    const year = new Date(Date.now()).getFullYear();

    for (const m of months) {
      const uri = `https://www.parkstreetbrethren.org/calendar/${year}/${m}?ajax=refresh_events&mo=${m}&yr=${year}`;

      try {
        const result = await fetch(uri);
        const html = await result.text();
        const imgReg = /(<img\s(.*)>)/g;
        const matches = html.match(imgReg);
        matches?.forEach((match) => {
          match = match?.toString();
          const img = match?.split('src="')[1]?.split('"')[0];
          if (img) {
            imgs.push(img);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (imgs.length > 0) {
      setUpcomingEventImages(imgs);
    }
  };

  const getSermonImage = async () => {
    let img: string = "";

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
        const possibleImg = match?.split('src="')[1]?.split('"')[0];
        if (possibleImg) {
          img = `https://www.parkstreetbrethren.org/` + possibleImg;
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }

    if (img) {
      setSermonImage(img);
    }
  };

  useEffect(() => {
    getUpcomingEventsImages();
    getSermonImage();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
        // onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
        // scrollEventThrottle={16}
      >
        <YStack
          alignItems="center"
          justifyContent="center"
          flex={1}
          width={"100%"}
          space={25}
          marginBottom={25}
        >
          <WorshipCard
            animation="bouncy"
            size="$4"
            width={"100%"}
            flex={1}
            hoverStyle={{ scale: 1.02 }}
            pressStyle={{ scale: 1.05 }}
          />

          <UpcomingCard
            cardProps={{
              animation: "bouncy",
              size: "$4",
              width: "100%",
              flex: 1,
              hoverStyle: { scale: 1.02 },
              pressStyle: { scale: 1.05 },
            }}
            images={upcomingEventsImages}
          />

          <SermonsCard
            cardProps={{
              animation: "bouncy",
              size: "$4",
              width: "100%",
              flex: 1,
              hoverStyle: { scale: 1.02 },
              pressStyle: { scale: 1.05 },
            }}
            image={sermonImage}
          />

          <GivingCard
            animation="bouncy"
            size="$4"
            width={"100%"}
            flex={1}
            hoverStyle={{ scale: 1.02 }}
            pressStyle={{ scale: 1.05 }}
          />

          <SurveyCard
            animation="bouncy"
            size="$4"
            width={"100%"}
            flex={1}
            hoverStyle={{ scale: 1.02 }}
            pressStyle={{ scale: 1.05 }}
          />
        </YStack>
      </ScrollView>
    </View>
  );
}
