import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  Text,
  View,
  borderRadius,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from "@/src/components/Themed";
import { useEffect, useState } from "react";
import { Sermon } from "../../api/series+api";
import { usePathname } from "expo-router";
import { Image } from "expo-image";
import SermonListItem from "@/src/components/SermonListItem";
import TryAgainButton from "@/src/components/TryAgainButton";
import { StatusBar } from "expo-status-bar";

type SermonList = Sermon[];

export default function SermonSeries() {
  const [sermons, setSermons] = useState<SermonList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const [tryAgain, setTryAgain] = useState<boolean>(false);

  const seriesPath = usePathname();

  useEffect(() => {
    setLoading(true);
    const uri = `https://www.parkstreetbrethren.org${seriesPath}`;
    getSermons(uri);
  }, [seriesPath, tryAgain]);

  const getSermons = async (uri: string) => {
    const res = await fetch(`/api/sermons?uri=${encodeURIComponent(uri)}`);
    if (res.ok) {
      const data = await res.json();
      setSermons(data.reverse());
    } else {
      setErr("Something went wrong... ");
    }
    setLoading(false);
  };

  const renderSermon: ListRenderItem<Sermon> = ({ item: sermon }) => {
    return <SermonListItem sermon={sermon} />;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : err ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text
            style={styles.errorText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {err}
          </Text>
          <TryAgainButton
            tryAgain={() => {
              setTryAgain((prev) => !prev);
              setErr(null);
            }}
          />
        </View>
      ) : (
        <>
          <Image
            style={{
              width: "100%",
              aspectRatio: 16 / 9,
              borderRadius: borderRadius,
            }}
            contentFit="cover"
            source={sermons[0]?.image}
            transition={200}
          />
          <FlatList
            data={sermons}
            renderItem={renderSermon}
            ItemSeparatorComponent={() => (
              <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
            )}
            ListFooterComponent={
              <View style={{ height: 150, backgroundColor: "transparent" }} />
            }
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
          />
        </>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
    maxWidth: 600
  },
  flatlist: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "1%",
    marginTop: 7,
  },
  separator: {
    marginVertical: 4,
    height: 1,
    width: "100%",
  },
  errorText: {
    fontSize: 20,
  },
});
