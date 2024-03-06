import { StyleSheet } from "react-native";

import {
  View,
  borderRadius,
  horizontalPadding,
  verticalPadding,
} from "@/src/components/Themed";
import { Image } from "expo-image";
import { Sermon } from "./api/series+api";
import { useEffect, useState } from "react";
// import AudioManager from "@/src/AudioManager";

export default function SermonPlayer() {
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   if (AudioManager.currentURL != null) {
  //     getSermon(AudioManager.currentURL);
  //   }
  // }, []);

  const getSermon = async (uri: string) => {
    const res = await fetch(`/api/sermon?uri=${encodeURIComponent(uri)}`);
    if (res.ok) {
      const data = await res.json();
      setSermon(data);
    } else {
      setErr("Something went wrong... ");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* <Image
        style={{
          width: "100%",
          aspectRatio: 16 / 9,
          borderRadius: borderRadius,
        }}
        contentFit="cover"
        source={sermon?.image}
        transition={200}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: horizontalPadding,
    paddingTop: verticalPadding,
  },
  flatlist: { flex: 1, width: "100%", paddingHorizontal: "1%" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 7,
  },
});
