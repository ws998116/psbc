import { Linking, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";

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
import {
  CircleEllipsis,
  FileSymlink,
  Pause,
  Play,
  RedoDot,
  ShareIcon,
  UndoDot,
} from "lucide-react-native";
import { HeaderText, SubText } from "../components/StyledText";
// import PdfRendererView from "react-native-pdf-renderer";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function SermonPlayer() {
  const [sermon, setSermon] = useState<SermonsRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const audio = useAudio();

  const iconColor = useThemeColor({}, "background");
  const buttonColor = useThemeColor({}, "text");

  const [downloading, setDownloading] = useState(true);
  const [sharingAvailable, setSharingAvailable] = useState(false);
  const [source, setSource] = useState<string>();

  const downloadWithExpoFileSystem = useCallback(async () => {
    try {
      setDownloading(true);
      console.log(audio?.sermon?.slidesUrl);

      if (audio?.sermon?.slidesUrl) {
        const response = await FileSystem.downloadAsync(
          audio.sermon.slidesUrl,
          FileSystem.documentDirectory + audio?.sermon?.title + ".pdf"
        );
        console.log("response", response);

        setSource(response.uri);
      } else {
        throw new Error("Slides URL is undefined");
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setDownloading(false);
    }
  }, []);

  useEffect(() => {
    downloadWithExpoFileSystem();
  }, [downloadWithExpoFileSystem]);

  const checkSharing = useCallback(async () => {
    setSharingAvailable(await Sharing.isAvailableAsync());
  }, []);

  useEffect(() => {
    checkSharing();
  }, [checkSharing]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 25,
          backgroundColor: "transparent",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ flex: 1, backgroundColor: "transparent" }} />
        <View
          style={{
            backgroundColor: "transparent",
            alignItems: "center",
            flex: 1,
          }}
        >
          <SubText style={{}}>{audio?.sermon?.seriesTitle}</SubText>
        </View>

        <Pressable
          style={{ flex: 1, alignItems: "flex-end" }}
          onPress={async () => {
            if (source) {
              await Sharing.shareAsync(source, {
                mimeType: "application/pdf",
                UTI: "com.adobe.pdf",
              });
            }
          }}
        >
          {sharingAvailable && !downloading && (
            <ShareIcon size={25} style={{ padding: 15 }} color={buttonColor} />
          )}
        </Pressable>
      </View>
      <View
        style={{
          flex: 2,
          width: "90%",
          backgroundColor: "transparent",
          justifyContent: "center",
          maxWidth: 600,
        }}
      >
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
