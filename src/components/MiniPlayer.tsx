import React, { useEffect } from "react";
import { Platform, Pressable } from "react-native";
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
import { Pause, Play, X } from "lucide-react-native";
import { useAudio } from "../context/audio";
import { SubText } from "./StyledText";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function MiniPlayer() {
  const router = useRouter();
  const audio = useAudio();

  const tabBarHeight = 85; //useBottomTabBarHeight();
  const iconColor = useThemeColor({}, "text");

  if (audio?.showMiniPlayer) {
    return (
      <Pressable onPress={() => router.push("/player")}>
        <View
          style={{
            position: "absolute",
            bottom: tabBarHeight,
            right: Platform.OS === "web" ? tabBarHeight : undefined,
            width: "96%",
            height: 55,
            borderRadius: borderRadius,
            alignSelf: "center",
            overflow: "hidden",
            borderWidth: 0.5,
            backgroundColor: "transparent",
            maxWidth: Platform.OS === "web" ? 400 : undefined,
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
              <View style={{ backgroundColor: "transparent", width: "70%" }}>
                <Text style={{ fontFamily: "InterMedium" }}>
                  {audio.sermon?.title}
                </Text>
                <SubText style={{ fontFamily: "InterRegular", fontSize: 12 }}>
                  {audio.sermon?.speaker}
                </SubText>
              </View>
              <Pressable
                onPress={() =>
                  audio?.playbackStatus?.isPlaying
                    ? audio?.sound?.pauseAsync()
                    : audio?.sound?.playAsync()
                }
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
              <Pressable onPress={() => audio.stopAudio()}>
                <X
                  size={25}
                  strokeWidth={3}
                  style={{ padding: 15 }}
                  color={iconColor}
                  fill={iconColor}
                />
              </Pressable>
            </View>
            <View
              style={{
                height: 3,
                backgroundColor: iconColor,
                width: `${audio.playbackPositionPercent}%`,
                borderRadius: borderRadius,
              }}
            />
          </BlurView>
        </View>
      </Pressable>
    );
  }
}
