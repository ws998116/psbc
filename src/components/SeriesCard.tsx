import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { borderRadius, useThemeColor } from "./Themed";

import Colors from "@/src/constants/Colors";
import { Image } from "expo-image";
import { Series } from "../app/api/series+api";
import { Href, Link } from "expo-router";

export default function SeriesCard({ series }: { series: Series }) {
  return (
    <Link asChild href={series.link as Href<string>}>
      <Pressable>
        {({ pressed }) => (
          <Image
            style={{
              width: "100%",
              maxWidth: 600,
              aspectRatio: 16 / 9,
              flex: 1,
              borderRadius: borderRadius,
              borderWidth: 1,
              borderColor: useThemeColor({}, "border"),
            }}
            contentFit="cover"
            source={series.image}
            transition={200}
          />
        )}
      </Pressable>
    </Link>
  );
}
