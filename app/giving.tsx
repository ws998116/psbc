import React from "react";
import WebView from "react-native-webview";
import { Spinner } from "tamagui";

export default function Giving() {
  return (
      <WebView
        source={{
          uri: "https://pushpay.com/g/parkstreetbrethren?src=hpp&r=monthly",
        }}
        style={{ flex: 1, marginTop: "23%" }}
        startInLoadingState={true}
        renderLoading={() => <Spinner flex={1} />}
      />
  );
}
