import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
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
      />
      <Text style={styles.title}>Listen to the latest sermon</Text> */}
      <SermonCard sermon={latestSermon} />
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
