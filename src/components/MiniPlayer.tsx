import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import {
  Text,
  View,
  borderRadius,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from "./Themed";
// import AudioManager from "../AudioManager";
import { Pause, Play } from "lucide-react-native";
import { useAudio } from "../context/audio";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function MiniPlayer() {
  const router = useRouter();
  const audio = useAudio();

  const tabBarHeight = 85; //useBottomTabBarHeight();
  const iconColor = useThemeColor({}, "text");

  //   useEffect(() => {
  //     console.log("show miniplayer", AudioManager?.showMiniPlayer);
  //   }, []);

  if (audio?.showMiniPlayer) {
    return (
      // <Pressable onPress={() => router.push("/player")}>
      <View
        style={{
          position: "absolute",
          bottom: tabBarHeight,
          width: "96%",
          height: 55,
          borderRadius: borderRadius,
          alignSelf: "center",
          overflow: "hidden",
          borderWidth: 0.5,
          backgroundColor: "transparent",
        }}
        // darkColor="#111"
      >
        <BlurView intensity={100} style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
              paddingHorizontal: 20,
              backgroundColor: "transparent",
            }}
          >
            <View style={{ backgroundColor: "transparent" }}>
              <Text style={{ fontFamily: "InterMedium" }}>
                {audio.sermon?.title}
              </Text>
              <Text style={{ fontFamily: "InterRegular", fontSize: 12 }}>
                {audio.sermon?.speaker}
              </Text>
            </View>
            <Pressable
              onPress={() =>
                //   AudioManager.currentStatus?.isPlaying
                //     ? AudioManager.currentSound?.pauseAsync()
                //     : AudioManager.currentSound?.playAsync()
                audio?.playbackStatus?.isPlaying
                  ? audio?.sound?.pauseAsync()
                  : audio?.sound?.playAsync()
              }
            >
              {audio?.playbackStatus?.isPlaying ? (
                <Pause
                  size={25}
                  strokeWidth={3}
                  color={iconColor}
                  fill={iconColor}
                />
              ) : (
                <Play
                  size={25}
                  strokeWidth={3}
                  style={{ left: 3 }}
                  color={iconColor}
                  fill={iconColor}
                />
              )}
            </Pressable>
          </View>
        </BlurView>
      </View>
      // </Pressable>
    );
  }
}
