import React from "react";
import WebView from "react-native-webview";

export default function Giving() {
  return (
    <WebView source={{ uri: "https://pushpay.com/g/parkstreetbrethren?src=hpp&r=monthly"}} style={{ flex: 1, marginTop: "23%" }}/>
  );
}
