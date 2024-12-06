import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import { borderRadius, useThemeColor } from "./Themed";
import { SeriesRecord } from "@/pocketbase-types";

export default function SeriesCard({ series }: { series: SeriesRecord }) {
  return (
    <Link asChild href={series.url?.split(".org/")[1] as Href<string>}>
      <Pressable style={{ maxWidth: 600, alignSelf: "center", width: "100%" }}>
        {({ pressed }) => (
          <Image
            style={{
              width: "100%",
              aspectRatio: 16 / 9,
              flex: 1,
              borderRadius: borderRadius,
              borderWidth: pressed ? 3 : 1,
              borderColor: useThemeColor({}, "border"),
            }}
            contentFit="cover"
            source={series.imageUrl}
            transition={200}
          />
        )}
      </Pressable>
    </Link>
  );
}
