routerAdd("GET", "/videos", (c) => {
  const res = $http.send({
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCQ8QEG0u1cKjhQshPsqScWQ",
  });
  const xml = res.raw;

  const entryRegex =
    /<entry>[\s\S]*?<yt:videoId>([^<]+)<\/yt:videoId>[\s\S]*?<published>([^<]+)<\/published>[\s\S]*?<\/entry>/g;
  const entries = [...xml.matchAll(entryRegex)].map((match) => ({
    videoId: match[1],
    publishDate: new Date(match[2]),
  }));

  return c.json(200, entries);
});
