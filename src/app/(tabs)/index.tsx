import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { useEffect, useState } from 'react';
import {
  Collections,
  SermonsResponse,
  SpeakersResponse,
} from '@/pocketbase-types';
import pb from '@/src/pb';
import SermonCard from '@/src/components/SermonCard';
import { ListResult } from 'pocketbase';

export default function TabOneScreen() {
  const [latestSermon, setLatestSermon] =
    useState<SermonsResponse<{ speaker: SpeakersResponse }>>();
  const [loading, setLoading] = useState<boolean>(true);

  const getLatestSermon = async () => {
    try {
      const records = (await pb
        .collection(Collections.Sermons)
        .getList<SermonsResponse>(1, 1, {
          expand: 'speaker',
          sort: '-date',
        })) as ListResult<
        SermonsResponse<{
          speaker: SpeakersResponse;
        }>
      >;
      setLatestSermon(records.items[0]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLatestSermon();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Welcome!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      <Text
        style={styles.title}
        lightColor={Colors.light.text}
        darkColor={Colors.dark.text}
      >
        Latest Sermon
      </Text>
      <Text
        style={styles.subtitle}
        lightColor={Colors.light.subtext}
        darkColor={Colors.dark.subtext}
      >
        Listen the newest message
      </Text>
      <SermonCard sermon={latestSermon} />
      <View
        style={styles.separator}
        lightColor="#ded"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text
        style={styles.title}
        lightColor={Colors.light.text}
        darkColor={Colors.dark.text}
      >
        Church Calendar
      </Text>
      <Text
        style={styles.subtitle}
        lightColor={Colors.light.subtext}
        darkColor={Colors.dark.subtext}
      >
        What season do we find ourselves in?
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    paddingBottom: '25%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 4,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    marginBottom: 12,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
