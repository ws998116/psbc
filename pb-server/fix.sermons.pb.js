routerAdd("GET", "/sermons-fix", (c) => {
  let fixed = [];
  $app.logger().info("starting sermon-fix");
  const sermonResults = $app.dao().findRecordsByFilter(
    "sermons", // collection
    "slidesUrl = ''", // filter
    "-date", // sort
    3, // limit
    0 // offset
  );

  for (let i = 0; i < sermonResults.length; i++) {
    const sermonResult = sermonResults[i];
    try {
      const sermon = JSON.parse(JSON.stringify(sermonResult));

      $app.logger().info(sermon.url);

      const existingSermon = $app
        .dao()
        .findFirstRecordByFilter(
          "sermons",
          `title = "${sermon.title}" && url="${sermon.url}"`
        );

      let slidesUrl = undefined;
      try {
        const sermonRes = $http.send({
          url: sermon.url,
        });
        const sermonContent = sermonRes.raw;

        const buttonReg = /(<a class="secondary button" href=")(.*)(" target)/g;
        const buttonMatches = sermonContent.match(buttonReg);

        if (buttonMatches != null) {
          slidesUrl = buttonMatches[1].split('href="')[1].split('"')[0];
          if (!slidesUrl.startsWith("http")) {
            slidesUrl = `https://www.parkstreetbrethren.org${slidesUrl}`;
          }
        }

        existingSermon.set("slidesUrl", slidesUrl);
        $app.dao().saveRecord(existingSermon);
        $app.logger().info(JSON.stringify({ slidesUrl }));
        fixed.push({ title: sermon.title, slidesUrl, url: sermon.url });
      } catch (error) {
        $app.logger().error(1);
      }
    } catch (error) {
      $app.logger().error(2);
    }
  }

  $app.logger().info(JSON.stringify({ fixed }));
  return c.json(200, { fixed });
});
