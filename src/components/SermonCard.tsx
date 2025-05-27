import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { borderRadius, useThemeColor } from './Themed';
import { SermonsResponse, SpeakersResponse } from '@/pocketbase-types';
import { useAudio } from '../context/audio';

export default function SermonCard({
  sermon,
}: {
  sermon: SermonsResponse<{ speaker: SpeakersResponse }> | undefined;
}) {
  const audio = useAudio();
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={{
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
        borderRadius: borderRadius,
        borderWidth: 1,
        borderColor: useThemeColor({}, 'border'),
        overflow: 'hidden',
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        if (!sermon) return;
        audio?.setSermon(sermon);
        router.push('/player');
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Image
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            flex: 1,
          }}
          contentFit="cover"
          source={sermon?.imageUrl}
          transition={200}
        />
      </Animated.View>
    </Pressable>
  );
}
