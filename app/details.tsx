import React from "react";
import { useRouter } from "expo-router";
import { Paragraph, YStack } from "tamagui";

export default function Details() {
  const router = useRouter();
  return (
    <YStack f={1} jc="center" ai="center" backgroundColor={"$background"}>
      <Paragraph color="$color" jc="center">
        PSBC
      </Paragraph>
    </YStack>
  );
}
