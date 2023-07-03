import React, { useState } from "react";
import WebView from "react-native-webview";

export default function Upcoming() {
  const month = new Date(Date.now()).getMonth() + 1;
  const year = new Date(Date.now()).getFullYear();
  const uri = `https://www.parkstreetbrethren.org/calendar/${year}/${month}?ajax=refresh_events&mo=${month}&yr=${year}`

  return (
    <WebView source={{ uri: uri}} style={{ flex: 1, marginTop: "23%" }}/>
  );
}
