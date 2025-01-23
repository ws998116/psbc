import React, { useEffect } from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Href, Link, useRouter } from "expo-router";

import { HeaderText, SubText } from "./StyledText";
import {
  Text,
  View,
  borderRadius,
  textDarkColor,
  textLightColor,
} from "./Themed";
import { useAudio } from "../context/audio";
import {
  SermonsRecord,
  SermonsResponse,
  SpeakersResponse,
} from "@/pocketbase-types";
// import AudioManager from "../AudioManager";

export default function SermonListItem({
  sermon,
}: {
  sermon: SermonsResponse<{ speaker: SpeakersResponse }>;
}) {
  const audio = useAudio();
  const router = useRouter();

  return (
    // <Link asChild href={"/player"}>
    <Pressable
      onPress={() => {
        if (audio?.sermon?.url == sermon.url) {
          if (audio?.playbackStatus?.isPlaying) {
            audio.sound?.pauseAsync();
          } else {
            audio.sound?.playAsync();
          }
        } else {
          audio?.sound?.pauseAsync();
          audio?.setSermon(sermon);
        }
        router.back();
      }}
    >
      <View style={styles.sermonContainer} lightColor="white" darkColor="#111">
        <HeaderText style={styles.headerText}>{sermon.title}</HeaderText>
        {/* <View style={{ backgroundColor: "transparent", maxWidth: 40 }}>
            <Avatar image="https://www.parkstreetbrethren.org/upload/images/staff_pictures/3.png" />
          </View> */}
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SubText style={styles.text}>
            {new Date(sermon.date).toLocaleDateString()}
          </SubText>
          <SubText style={styles.text}>{sermon.expand?.speaker.name}</SubText>
        </View>
      </View>
    </Pressable>
    // </Link>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    marginBottom: 7,
  },
  text: {
    fontSize: 14,
  },
  sermonContainer: {
    marginVertical: 7,
    padding: 7,
    borderRadius: borderRadius,
    borderWidth: 1,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
});
