import React, { useEffect } from 'react';
import { Platform, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import {
  Text,
  View,
  borderRadius,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from './Themed';
import { Pause, Play, X } from 'lucide-react-native';
import { useAudio } from '../context/audio';
import { SubText } from './StyledText';

export default function MiniPlayer() {
  const router = useRouter();
  const audio = useAudio();

  const tabBarHeight = Platform.OS === 'android' ? 60 : 85;
  const iconColor = useThemeColor({}, 'text');
  const bgColor = useThemeColor({}, 'background');

  if (audio?.showMiniPlayer) {
    return (
      <Pressable onPress={() => router.push('/player')}>
        <View
          style={{
            position: 'absolute',
            bottom: tabBarHeight,
            right: Platform.OS === 'web' ? tabBarHeight : undefined,
            width: '96%',
            height: 55,
            borderRadius: borderRadius,
            alignSelf: 'center',
            overflow: 'hidden',
            borderWidth: 0.5,
            backgroundColor:
              Platform.OS === 'android' ? bgColor : 'transparent',
            maxWidth: Platform.OS === 'web' ? 400 : undefined,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
          // darkColor="#111"
        >
          <BlurView intensity={100} style={{ flex: 1 }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
                paddingHorizontal: 20,
                backgroundColor: 'transparent',
              }}
            >
              <View style={{ backgroundColor: 'transparent', width: '70%' }}>
                <Text style={{ fontFamily: 'InterMedium' }}>
                  {audio.sermon?.title}
                </Text>
                <SubText style={{ fontFamily: 'InterRegular', fontSize: 12 }}>
                  {audio.sermon?.expand?.speaker.name}
                </SubText>
              </View>
              <Pressable
                onPress={() =>
                  audio?.player?.playing
                    ? audio?.player?.pause()
                    : audio?.player?.play()
                }
              >
                {audio?.player?.playing ? (
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
                width: `${
                  (audio.player.currentTime / audio.player.duration) * 100
                }%`,
                borderRadius: borderRadius,
              }}
            />
          </BlurView>
        </View>
      </Pressable>
    );
  }
}
