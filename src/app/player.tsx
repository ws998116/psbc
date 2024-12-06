import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import {
  Text,
  View,
  borderRadius,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from "@/src/components/Themed";
import { Collections, SermonsRecord } from "@/pocketbase-types";
import { Image } from "expo-image";
import { useAudio } from "../context/audio";
import { Pause, Play, RedoDot, UndoDot } from "lucide-react-native";
import { HeaderText, SubText } from "../components/StyledText";
import pb from "../pb";
// import AudioManager from "@/src/AudioManager";

export default function SermonPlayer() {
  const [sermon, setSermon] = useState<SermonsRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const audio = useAudio();

  const iconColor = useThemeColor({}, "background");
  const buttonColor = useThemeColor({}, "text");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingTop: 15, backgroundColor: "transparent" }}>
        <View
          style={{
            backgroundColor: "transparent",
            width: "90%",
            alignItems: "center",
          }}
        >
          <SubText style={{}}>{audio?.sermon?.seriesTitle}</SubText>
        </View>
      </View>
      <View style={{ flex: 1, width: "90%", backgroundColor: "transparent" }}>
        <Image
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            borderRadius: borderRadius,
          }}
          contentFit="cover"
          source={audio?.sermon?.imageUrl}
          transition={200}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          width: "90%",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
          }}
        >
          <HeaderText style={styles.headerText}>
            {audio?.sermon?.title}
          </HeaderText>
          <SubText style={{ fontFamily: "InterRegular", fontSize: 16 }}>
            {audio?.sermon?.expand?.speaker.name}
          </SubText>
        </View>
        <View
          style={{
            width: `100%`,
            marginVertical: 30,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 5,
              backgroundColor: buttonColor,
              opacity: 0.3,
              width: `100%`,
              borderRadius: borderRadius,
              position: "absolute",
            }}
          />
          <View
            style={{
              height: 5,
              backgroundColor: buttonColor,
              width: `${audio?.playbackPositionPercent ?? 0}%`,
              borderRadius: borderRadius,
              position: "absolute",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: buttonColor,
                borderRadius: 100,
                position: "absolute",
                right: 0,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "transparent",
          }}
        >
          <Pressable
            onPress={() => audio?.rewindAudio()}
            style={{
              padding: 15,
              alignSelf: "center",
            }}
          >
            <UndoDot
              size={25}
              strokeWidth={3}
              style={{ padding: 15 }}
              color={buttonColor}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              audio?.playbackStatus?.isPlaying
                ? audio?.sound?.pauseAsync()
                : audio?.sound?.playAsync()
            }
            style={{
              backgroundColor: buttonColor,
              borderRadius: 100,
              padding: 15,
              alignSelf: "center",
            }}
          >
            {audio?.playbackStatus?.isPlaying ? (
              <Pause
                size={25}
                strokeWidth={3}
                style={{ padding: 15 }}
                color={iconColor}
                fill={iconColor}
              />
            ) : (
              <Play
                size={25}
                strokeWidth={3}
                style={{ left: 3, padding: 15 }}
                color={iconColor}
                fill={iconColor}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => audio?.fastforwardAudio()}
            style={{
              padding: 15,
              alignSelf: "center",
            }}
          >
            <RedoDot
              size={25}
              strokeWidth={3}
              style={{ padding: 15 }}
              color={buttonColor}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: horizontalPadding,
    paddingTop: verticalPadding,
    backgroundColor: "transparent",
  },
  flatlist: { flex: 1, width: "100%", paddingHorizontal: "1%" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 7,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 7,
  },
});
