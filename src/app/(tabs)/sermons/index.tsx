import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import {
  View,
  horizontalPadding,
  verticalPadding,
} from "@/src/components/Themed";
import { useEffect, useState } from "react";
import SeriesCard from "@/src/components/SeriesCard";
import { Series } from "../../api/series+api";

type SeriesList = Series[];

export default function SermonSeries() {
  const [series, setSeries] = useState<SeriesList>([]);

  useEffect(() => {
    getSeries();
  }, []);

  const getSeries = async () => {
    const res = await fetch("/api/series");
    const data = await res.json();
    setSeries(data);
  };

  const renderSeries: ListRenderItem<Series> = ({ item: series }) => {
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
        style={styles.flatlist}
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
  },
  flatlist: { flex: 1, width: "100%", paddingHorizontal: "1%" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 7,
  },
});
