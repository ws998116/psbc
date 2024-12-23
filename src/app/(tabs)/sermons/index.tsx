import { FlatList, ListRenderItem, Platform, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import {
  View,
  horizontalPadding,
  verticalPadding,
} from "@/src/components/Themed";
import SeriesCard from "@/src/components/SeriesCard";
import { Collections, SeriesRecord } from "@/pocketbase-types";
import pb from "@/src/pb";

type SeriesList = SeriesRecord[];

export default function SermonSeries() {
  const [series, setSeries] = useState<SeriesList>([]);

  useEffect(() => {
    getSeries();
  }, []);

  const getSeries = async () => {
    const records = await pb.collection(Collections.Series).getFullList({
      sort: "-date",
    });
    setSeries(records);
  };

  const renderSeries: ListRenderItem<SeriesRecord> = ({ item: series }) => {
    if (series.title === "skeleton") {
      return <SeriesCard series={series} />;
    } else {
      return <SeriesCard series={series} />;
    }
  };

  const separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={series}
        // data={loading ? skeleton : series}
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
