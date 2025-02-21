import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import {
  Text,
  View,
  borderRadius,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from '@/src/components/Themed';
import { SermonsRecord } from '@/pocketbase-types';
import { Image } from 'expo-image';
import { useAudio } from '../context/audio';
import { ArrowLeft, Pause, Play } from 'lucide-react-native';
import { HeaderText, SubText } from '../components/StyledText';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

function getTime(ms: number) {
  var minutes = Math.floor(ms / 60000);
  const seconds = parseInt(((ms % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export default function SermonPlayer() {
  const [sermon, setSermon] = useState<SermonsRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const audio = useAudio();
  const router = useRouter();

  const iconColor = useThemeColor({}, 'background');
  const buttonColor = useThemeColor({}, 'text');
  const viewColor = useThemeColor({}, 'tabIconDefault');

  const [downloading, setDownloading] = useState(true);
  const [sharingAvailable, setSharingAvailable] = useState(false);
  const [source, setSource] = useState<string>();

  const downloadWithExpoFileSystem = useCallback(async () => {
    try {
      setDownloading(true);
      if (audio?.sermon?.slidesUrl) {
        const response = await FileSystem.downloadAsync(
          audio.sermon.slidesUrl,
          FileSystem.documentDirectory + audio?.sermon?.title + '.pdf'
        );
        setSource(response.uri);
      } else {
        throw new Error('Slides URL is undefined');
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
          backgroundColor: 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'transparent' }}
          onPress={() => router.back()}
        >
          <ArrowLeft size={25} color={buttonColor} />
        </Pressable>
        <View
          style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            flex: 2,
          }}
        >
          <SubText style={{ textAlign: 'center' }}>
            {audio?.sermon?.seriesTitle}
          </SubText>
        </View>

        <Pressable
          style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={async () => {
            if (source) {
              await Sharing.shareAsync(source, {
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf',
              });
            }
          }}
        >
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: borderRadius,
              backgroundColor: buttonColor,
              opacity: sharingAvailable && !downloading ? 1 : 0.5,
            }}
          >
            <Text style={{ color: iconColor, fontWeight: 'bold' }}>Slides</Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          flex: 2,
          width: '90%',
          backgroundColor: 'transparent',
          justifyContent: 'center',
          maxWidth: 600,
        }}
      >
        <Image
          style={{
            width: '100%',
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
          justifyContent: 'center',
          width: '90%',
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <HeaderText style={styles.headerText}>
            {audio?.sermon?.title}
          </HeaderText>
          <SubText style={{ fontFamily: 'InterRegular', fontSize: 16 }}>
            {audio?.sermon?.expand?.speaker.name}
          </SubText>
        </View>
        <Slider
          style={{ width: '100%', height: 5, marginTop: 30, marginBottom: 10 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={buttonColor}
          maximumTrackTintColor={viewColor}
          thumbTintColor={buttonColor}
          value={audio?.playbackPositionPercent ?? 0}
          onSlidingComplete={(val) => audio?.setPlaybackPercent(val)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            width: `100%`,
            paddingBottom: 20,
          }}
        >
          <SubText style={{ fontFamily: 'InterRegular', fontSize: 12 }}>
            {getTime(audio?.playbackStatus?.positionMillis ?? 0)}
          </SubText>
          <SubText style={{ fontFamily: 'InterRegular', fontSize: 12 }}>
            {'-' +
              getTime(
                (audio?.playbackStatus?.durationMillis ?? 0) -
                  (audio?.playbackStatus?.positionMillis ?? 0)
              )}
          </SubText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: 'transparent',
          }}
        >
          <Pressable
            onPress={() => audio?.rewindAudio()}
            style={{
              padding: 15,
              alignSelf: 'center',
            }}
          >
            <Text style={{ color: buttonColor, fontWeight: 'bold' }}>-15</Text>
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
              alignSelf: 'center',
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
              alignSelf: 'center',
            }}
          >
            <Text style={{ color: buttonColor, fontWeight: 'bold' }}>+15</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalPadding,
    paddingTop: verticalPadding,
    backgroundColor: 'transparent',
  },
  flatlist: { flex: 1, width: '100%', paddingHorizontal: '1%' },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 7,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 7,
  },
});
