import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';

import {
  Text,
  TextInput,
  View,
  borderRadius,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from '@/src/components/Themed';
import SeriesCard from '@/src/components/SeriesCard';
import {
  Collections,
  SeriesRecord,
  SeriesResponse,
  SermonsRecord,
  SermonsResponse,
  SpeakersResponse,
} from '@/pocketbase-types';
import pb from '@/src/pb';
import { XCircle } from 'lucide-react-native';

type SeriesList = (SeriesResponse & {
  expand?: {
    sermons: (SermonsResponse & { expand?: { speaker: SpeakersResponse } })[];
  };
})[];

export default function SermonSeries() {
  const [records, setRecords] = useState<SeriesList>([]);
  const [series, setSeries] = useState<SeriesList>([
    {
      id: '',
      created: '',
      updated: '',
      collectionId: '',
      collectionName: Collections.Series,
      date: '',
      imageUrl: '',
      sermons: [],
      title: 'skeleton',
      url: '',
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'tabIconDefault');

  const getSeries = async () => {
    try {
      const records = (await pb
        .collection(Collections.Series)
        .getFullList<SeriesResponse>({
          sort: '-date',
          expand: 'sermons,sermons.speaker',
        })) as SeriesList;
      setRecords(records);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSeries();
  }, []);

  useEffect(() => {
    const filteredData = records.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.expand?.sermons.some((sermon) =>
          sermon?.title.toLowerCase().includes(searchText.toLowerCase()),
        ) ||
        item.expand?.sermons.some((sermon) =>
          sermon?.expand?.speaker?.name
            .toLowerCase()
            .includes(searchText.toLowerCase()),
        )
      );
    });
    setSeries(filteredData);
  }, [records, searchText]);

  const renderSeries: ListRenderItem<SeriesRecord> = ({ item: series }) => {
    if (series.title === 'skeleton') {
      return <ActivityIndicator size='large' color={textColor} />;
    } else {
      return <SeriesCard series={series} />;
    }
  };

  const separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={series}
          renderItem={renderSeries}
          ItemSeparatorComponent={separator}
          ListHeaderComponent={
            <View
              style={{
                width: '100%',
                maxWidth: 600,
                paddingVertical: Platform.OS === 'web' ? verticalPadding : 0,
                paddingHorizontal: horizontalPadding,
                marginVertical: verticalPadding,
                backgroundColor: borderColor,
                borderRadius: borderRadius,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}
            >
              <TextInput
                placeholder='Search for a series, sermon, or speaker...'
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                }}
                style={{ width: '90%', outline: 'none' }}
              />
              <Pressable
                onPress={() => setSearchText('')}
                style={{
                  alignSelf: 'center',
                }}
              >
                <XCircle
                  color={iconColor}
                  style={{
                    opacity: searchText.length > 0 ? 1 : 0,
                  }}
                />
              </Pressable>
            </View>
          }
          ListFooterComponent={separator}
          showsVerticalScrollIndicator={Platform.OS === 'web' ? true : false}
          contentInsetAdjustmentBehavior='automatic'
          style={styles.flatlist}
        />
        {/* <View
          style={{
            width: 50,
            height: "100%",
            paddingVertical: verticalPadding,
            justifyContent: "space-between",
            alignContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <SubText style={{ textAlign: "center" }}>JAN</SubText>
          <SubText style={{ textAlign: "center" }}>DEC</SubText>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: Platform.OS === 'web' ? 0 : horizontalPadding,
    backgroundColor: 'transparent',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    // paddingHorizontal: horizontalPadding,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flatlist: {
    width: '100%',
    // paddingHorizontal: "1%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 2,
    backgroundColor: 'transparent',
  },
});
