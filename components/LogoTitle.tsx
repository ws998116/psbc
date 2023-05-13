
import { Image } from "expo-image";
import React from "react";

export default function LogoTitle({back}: {back?: boolean} = {}) {
  return (
    <Image
      style={{ width: 40, height: 40, flex: 1, marginRight: back ? "25%" : "8%" }}
      contentFit="contain"
      source={{ uri: "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png" }}
    />
  );
}