import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { usePathname } from "expo-router";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

import {
  Text,
  View,
  borderRadius,
  horizontalPadding,
  useThemeColor,
  verticalPadding,
} from "@/src/components/Themed";
import SermonListItem from "@/src/components/SermonListItem";
import TryAgainButton from "@/src/components/TryAgainButton";
import {
  Collections,
  SermonsRecord,
  SermonsResponse,
  SpeakersRecord,
  SpeakersResponse,
} from "@/pocketbase-types";
import pb from "@/src/pb";

type SermonList = SermonsRecord[];

export default function SermonSeries() {
  const [sermons, setSermons] = useState<SermonList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const [tryAgain, setTryAgain] = useState<boolean>(false);

  const seriesPath = usePathname();

  useEffect(() => {
    setLoading(true);
    const seriesUrl = `https://www.parkstreetbrethren.org${seriesPath}`;
    getSermons(seriesUrl);
  }, [seriesPath, tryAgain]);

  const getSermons = async (seriesUrl: string) => {
    try {
      const filter = pb.filter("seriesUrl = {:seriesUrl}", { seriesUrl });
      const records = await pb
        .collection(Collections.Sermons)
        .getList<SermonsResponse<{ speaker: SpeakersResponse }>>(1, 50, {
          filter,
          expand: "speaker",
          sort: "-date",
        });

      setSermons(records.items);
    } catch (error) {
      setErr("Something went wrong... ");
    }
    setLoading(false);
  };

  const renderSermon: ListRenderItem<
    SermonsResponse<{ speaker: SpeakersResponse }>
  > = ({ item: sermon }) => {
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
              maxWidth: 600,
            }}
            contentFit="cover"
            source={sermons[0]?.imageUrl}
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
  },
  flatlist: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "1%",
    marginTop: 7,
    // maxWidth: 600,
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
