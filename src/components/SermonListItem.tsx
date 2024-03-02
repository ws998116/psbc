import React from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { HeaderText, SubText } from "./StyledText";
import {
  Text,
  View,
  borderRadius,
  textDarkColor,
  textLightColor,
} from "./Themed";

import { Sermon } from "../app/api/series+api";
import { Href, Link } from "expo-router";
import Avatar from "./Avatar";

export default function SermonListItem({ sermon }: { sermon: Sermon }) {
  return (
    <Link asChild href={sermon.link as Href<string>}>
      <Pressable>
        <View style={styles.sermonContainer} lightColor="#eee" darkColor="#111">
          <View style={{ backgroundColor: "transparent" }}>
            <HeaderText style={styles.headerText}>{sermon.title}</HeaderText>
          </View>
          {/* <View style={{ backgroundColor: "transparent", maxWidth: 40 }}>
            <Avatar image="https://www.parkstreetbrethren.org/upload/images/staff_pictures/3.png" />
          </View> */}
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <SubText style={styles.text}>{sermon.date}</SubText>
            <SubText style={styles.text}>{sermon.speaker}</SubText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    marginBottom: 7,
  },
  text: {
    fontSize: 14,
  },
  sermonContainer: {
    marginVertical: 7,
    padding: 7,
    borderRadius: borderRadius,
    borderWidth: 1,
  },
});
