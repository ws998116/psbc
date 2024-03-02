import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function Avatar({ image }: { image: string }) {
  return <Image source={image} style={styles.image} contentFit="cover" />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: "100%",
    aspectRatio: 1,
    flex: 1,
  },
});
