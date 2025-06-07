import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Href, Link } from 'expo-router';
import { borderRadius, useThemeColor } from './Themed';
import { SeriesRecord } from '@/pocketbase-types';

export default function SeriesCard({ series }: { series: SeriesRecord }) {
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
    <Link asChild href={series.url?.split('.org/')[1] as Href}>
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
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Image
            style={{
              width: '100%',
              aspectRatio: 8 / 5,
              flex: 1,
            }}
            contentFit="cover"
            source={series.imageUrl}
            transition={200}
          />
        </Animated.View>
      </Pressable>
    </Link>
  );
}
