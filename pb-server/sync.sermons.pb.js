routerAdd("GET", "/sermons-sync", (c) => {
  let added = 0;
  let existing = 0;
  let title = "";
  try {
    $app.logger().info("starting sermon-sync");
    const result = $app.dao().findRecordsByFilter(
      "series", // collection
      "url != ''", // filter
      "-date", // sort
      1, // limit
      0 // offset
    );
    const series = JSON.parse(JSON.stringify(result[0]));
    const uri = series.url;

    const res = $http.send({
      url: uri,
    });
    const html = res.raw;

    let imageUrl =
      "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png";
    const imgReg = /(<img src=")(.*)(" alt)/g;
    const imgMatches = html.match(imgReg);
    if (imgMatches != null) {
      const img = imgMatches[0].split('<img src="')[1].split('"')[0];
      imageUrl = `https://www.parkstreetbrethren.org${img}`;
    }

    const sermonsReg =
      /(<div class="column column-block">)(.+?)(<\/div>.+?<\/div>)/gs;
    const sermonsMatches = html.match(sermonsReg);

    if (sermonsMatches == null) {
      return c.json(400, { error: "No matches" });
    }

    const records = $app
      .dao()
      .findRecordsByFilter("sermons", `seriesUrl = '${uri}'`, "", 0, 0);
    if (records.length == sermonsMatches.length) {
      return c.json(200, { added, total: records.length });
    }

    for (const sermonMatch in sermonsMatches) {
      const sermonHtml = sermonsMatches[sermonMatch].toString();

      title = sermonHtml.split("</a></h3>")[0].split('">').slice(-1)[0].trim();

      try {
        const r = $app
          .dao()
          .findFirstRecordByFilter(
            "sermons",
            `title = '${title}' && seriesUrl = '${uri}'`
          );
        existing += 1;
        continue;
      } catch (error) {}

      const url =
        `https://www.parkstreetbrethren.org` +
        sermonHtml.split('href="')[1].split('">')[0];

      let date = sermonHtml.split("</h3>")[1].split("<br />")[0].trim();
      date = new Date(date).toISOString();

      let speaker = "";
      try {
        speaker = sermonHtml.split("Speaker: ")[1].split("</div>")[0].trim();
      } catch (error) {}

      let speakerId = undefined;
      if (speaker != "") {
        try {
          const s = $app
            .dao()
            .findFirstRecordByFilter("speakers", `name='${speaker}'`);
          speakerId = s.id;
        } catch (error) {
          try {
            const collection = $app.dao().findCollectionByNameOrId("speakers");
            const record = new Record(collection, {
              name: speaker,
            });
            $app.dao().saveRecord(record);
            speakerId = record.id;
          } catch (error) {
            $app.logger().error(JSON.stringify(error));
          }
        }
      }

      let audioUrl = undefined;
      try {
        const sermonRes = $http.send({
          url: url,
        });
        const sermonContent = sermonRes.raw;

        const audioReg = /(<a class="secondary button" href=")(.*)(" target)/g;
        const audioMatches = sermonContent.match(audioReg);

        if (audioMatches == null) {
          audioUrl = undefined;
        } else {
          const audio = audioMatches[0].split('href="')[1].split('"')[0];
          if (audio.startsWith("http")) {
            audioUrl = audio;
          } else {
            audioUrl = `https://www.parkstreetbrethren.org${audio}`;
          }
        }
      } catch (error) {
        $app.logger().error(JSON.stringify(error));
      }

      try {
        const collection = $app.dao().findCollectionByNameOrId("sermons");
        const newSermon = new Record(collection, {
          url,
          date,
          title,
          speaker: speakerId,
          imageUrl,
          seriesUrl: uri,
          seriesTitle: series.title,
          audioUrl,
        });
        $app.dao().saveRecord(newSermon);
        added += 1;

        const ser = $app
          .dao()
          .findFirstRecordByFilter("series", `url='${uri}'`);
        series.sermons = [...series.sermons, newSermon.id];
        ser.set("sermons", series.sermons);
        $app.dao().saveRecord(ser);
      } catch (error) {
        $app.logger().error(JSON.stringify(error));
      }
    }
  } catch (error) {
    $app.logger().error(JSON.stringify(error));
    return c.json(400, { title, error });
  }

  $app.logger().info(JSON.stringify({ added, existing }));
  return c.json(200, { added, existing });
});
