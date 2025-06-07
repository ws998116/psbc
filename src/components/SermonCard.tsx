import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import { borderRadius, Text, useThemeColor, View } from './Themed';
import { SermonsResponse, SpeakersResponse } from '@/pocketbase-types';
import { useAudio } from '../context/audio';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { BlurView } from 'expo-blur';
import { BodyText, HeaderText, SubText } from './StyledText';

export default function SermonCard({
  sermon,
}: {
  sermon: SermonsResponse<{ speaker: SpeakersResponse }> | undefined;
}) {
  const audio = useAudio();
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [blurhash, setBlurhash] = React.useState<string>('');

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

  const getBlurhash = async (url: string | undefined) => {
    if (!url) return '';
    const res = await Image.generateBlurhashAsync(url, [4, 3]);
    console.log(res);

    setBlurhash(res ?? '');
  };

  useEffect(() => {
    getBlurhash(sermon?.imageUrl);
  }, [sermon?.imageUrl]);

  return (
    <Pressable
      style={{
        maxWidth: 600,
        width: '100%',
        borderRadius: borderRadius,
        borderWidth: 1,
        borderColor: useThemeColor({}, 'border'),
        overflow: 'hidden',
        // aspectRatio: 1,
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        if (!sermon) return;
        audio?.setSermon(sermon);
        router.push('/player');
      }}
    >
      <ImageBackground
        source={{ blurhash: blurhash }}
        style={{ flex: 1, justifyContent: 'center' }}
        contentFit="cover"
      >
        <BlurView
          style={{ flex: 1, padding: 10 }}
          intensity={80}
          // tint="extraLight"
        >
          <View
            style={{
              overflow: 'hidden',
              backgroundColor: 'transparent',
              aspectRatio: 8 / 5,
              borderRadius: borderRadius,
            }}
          >
            <Animated.View
              style={{
                transform: [{ scale: scaleValue }],
                overflow: 'hidden',
                width: '100%',
                flex: 1,
                alignSelf: 'center',
              }}
            >
              <Image
                style={{
                  width: '100%',
                  flex: 1,
                }}
                contentFit="cover"
                source={sermon?.imageUrl}
                transition={200}
              />
            </Animated.View>
          </View>
          <View
            style={{
              margin: 10,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <HeaderText style={styles.headerText}>{sermon?.title}</HeaderText>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                backgroundColor: 'transparent',
                justifyContent: 'space-between',
              }}
            >
              <SubText style={styles.text}>
                {sermon?.expand?.speaker.name}
              </SubText>
              <BodyText style={styles.text}>
                {sermon?.date
                  ? new Date(sermon.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : ''}
              </BodyText>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    marginBottom: 7,
    color: 'white',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
});
