import { FlatList, ListRenderItem, StyleSheet } from "react-native";
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

  return (
    <View style={styles.container}>
      <FlatList
        data={series}
        // data={loading ? skeleton : series}
        // ListHeaderComponent={() => (
        //   <XStack flex={1} justifyContent="center" marginVertical={10}>
        //     {/* <H2 size={"$8"} textAlign="center">
        //       Sermon Series
        //     </H2> */}
        //   </XStack>
        // )}
        renderItem={renderSeries}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // ListFooterComponent={() =>
        //   loading ? <Spinner size="large" marginVertical={25} /> : <Stack />
        // }
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
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
    paddingTop: verticalPadding,
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  flatlist: { width: "100%", paddingHorizontal: "1%" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 7,
  },
});
