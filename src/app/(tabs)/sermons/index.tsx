import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";

import {
  View,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from "@/src/components/Themed";
import SeriesCard from "@/src/components/SeriesCard";
import { Collections, SeriesRecord } from "@/pocketbase-types";
import pb from "@/src/pb";

type SeriesList = SeriesRecord[];

export default function SermonSeries() {
  const [series, setSeries] = useState<SeriesList>([
    {
      date: undefined,
      imageUrl: "",
      sermons: [],
      title: "skeleton",
      url: undefined,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const textColor = useThemeColor({}, "text");

  const getSeries = async () => {
    try {
      const records = await pb.collection(Collections.Series).getFullList({
        sort: "-date",
      });
      setSeries(records);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSeries();
  }, [getSeries]);

  const renderSeries: ListRenderItem<SeriesRecord> = ({ item: series }) => {
    if (series.title === "skeleton") {
      return <ActivityIndicator size="large" color={textColor} />;
    } else {
      return <SeriesCard series={series} />;
    }
  };

  const separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={series}
        renderItem={renderSeries}
        ItemSeparatorComponent={separator}
        ListHeaderComponent={separator}
        ListFooterComponent={separator}
        showsVerticalScrollIndicator={Platform.OS === "web" ? true : false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: horizontalPadding,
    backgroundColor: "transparent",
  },
  flatlist: { width: "100%", paddingHorizontal: "1%" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 7,
    backgroundColor: "transparent",
  },
});
