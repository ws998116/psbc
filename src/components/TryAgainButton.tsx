import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";

import {
  Text,
  View,
  borderRadius,
  textDarkColor,
  textLightColor,
} from "./Themed";

export default function TryAgainButton({ tryAgain }: { tryAgain(): void }) {
  const colorScheme = useColorScheme();

  return (
    <Pressable onPress={() => tryAgain()}>
      {({ pressed }) => (
        <View
          style={[styles.container, { opacity: pressed ? 0.5 : 1 }]}
          lightColor="#eee"
          darkColor="#111"
        >
          <Text
            style={styles.text}
            lightColor={textLightColor}
            darkColor={textDarkColor}
          >
            Try Again
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  container: {
    marginVertical: 7,
    padding: 7,
    borderRadius: borderRadius,
    borderWidth: 1,
    alignItems: "center",
  },
});
