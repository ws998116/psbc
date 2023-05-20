import React from "react";
import { useRouter } from "expo-router";
import {
  Button,
  Card,
  H2,
  Paragraph,
  Popover,
  PopoverProps,
  ScrollView,
  Spacer,
  Stack,
  XStack,
  YStack,
} from "tamagui";
import { Info } from "@tamagui/lucide-icons";

const data = [
  {
    title: "9:00 am and 10:30 am Worship Services",
    description:
      "Held in the newly renovated Worship Center, casual, contemporary worship gathers all generations together.",
  },
  {
    title: "Park Street Kids",
    description:
      "Our nursery is a place where babies can sleep, play, and be messy while their parents and caretakers can worship without interruption.  ",
  },
  {
    title: "Nursery for Newborns to Age Two",
    description:
      "Classes for children 2 years-5th grade are offered during both the 9 and 10:30 services. We welcome your children during one or both services.",
  },
  {
    title: "Care Room",
    description:
      "Available in the Worship Center for moms and dads to care for infants or toddlers, if necessary. It has a changing table and private nursing area.  ",
  },
  {
    title: "Junior High",
    description:
      "6th - 8th Graders typically gather each morning at 9:00 am. Sometimes plans change, so feel free to reach out and ask for details before you plan to attend. Once you get connected, we will keep you in the loop through youth and parent communications.",
  },
];

export default function Worship() {
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
        {/* <Card elevate size="$4" bordered flex={1}>
          <Card.Header padded flex={1}> */}
            {/* <YStack space={10} w={"100%"}> */}
              <H2 size={"$8"} theme={"alt2"}>
                Sunday Morning Details
              </H2>
              {data.map((val, index) => (
                <QuickInfo
                  Title={val.title}
                  Description={val.description}
                  Icon={Info}
                  key={index}
                />
              ))}
            {/* </YStack> */}
          {/* </Card.Header>
        </Card> */}
        {/* <Card elevate size="$4" bordered flex={1}>
          <Card.Header padded flex={1}>
            <H2 size={"$8"} theme={"alt1"}>
              Worship Services at Park Street
            </H2>
            <Spacer />
            <Paragraph size={"$6"} theme="alt1">
              There is power in the relationship between God and His gathered
              church, and we enter into this celebration at our Sunday morning
              worship services. The 9:00 and 10:30 a.m. services blend music,
              prayer, and the truths of Scripture. Because people ask, we'll let
              you know that the music is contemporary, all offered to celebrate
              and glorify God. You''re welcome to worship with hands up, seated
              quietly, or simply reflecting. All are welcome to worship with us.
            </Paragraph>
          </Card.Header>
        </Card> */}
      </YStack>
    </ScrollView>
  );
}

function QuickInfo({
  Icon,
  Title,
  Description,
  ...props
}: PopoverProps & { Icon?: any; Title: string; Description: string }) {
  return (
    <Popover size="$5" allowFlip {...props}>
      <Popover.Trigger asChild>
        <Button /*icon={Icon}*/ w={"100%"}>{Title}</Button>
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ x: 0, y: -10, opacity: 0 }}
        exitStyle={{ x: 0, y: -10, opacity: 0 }}
        x={0}
        y={0}
        opacity={1}
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        elevate
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <Paragraph size={"$6"} theme="alt1">
          {Description}
        </Paragraph>
      </Popover.Content>
    </Popover>
  );
}
