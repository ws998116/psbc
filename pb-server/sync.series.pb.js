routerAdd("GET", "/series-sync", (c) => {
  $app.logger().info("starting series-sync");
  let added = 0;
  let existing = 0;
  const uri = `https://www.parkstreetbrethren.org/sermons`;
  try {
    const res = $http.send({
      url: uri,
    });
    const html = res.raw;
    const messageReg =
      /(<div class="message column column-block">)(.+?)(<\/a><\/h3>)/gs;
    const messageMatches = html.match(messageReg);
    if (messageMatches == null) {
      return c.json(400, { error: "No matches" });
    }

    const records = arrayOf(new Record());
    $app.dao().recordQuery("series").all(records);
    if (records.length == messageMatches.length) {
      return c.json(200, { added, total: records.length });
    }

    for (let i = 0; i < messageMatches.length - records.length; i++) {
      const messageHtml = messageMatches[i].toString();

      let imageUrl =
        "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png";
      const imgReg = /(<img src=(.*)>)/g;
      let imageMatches = null;
      try {
        imageMatches = messageHtml.match(imgReg);
      } catch (error) {
        $app.logger().error(JSON.stringify(error));
      }
      if (imageMatches != null) {
        const img = imageMatches[0]
          ?.toString()
          ?.split('src="')[1]
          ?.split('"')[0];
        if (img) {
          imageUrl = `https://www.parkstreetbrethren.org` + img;
        }
      }

      const seriesReg = /(<h3><a href=".*">)(.*)(<\/a><\/h3>)/g;
      const seriesMatches = messageHtml.match(seriesReg);
      if (seriesMatches == null) {
        continue;
      }
      const title = seriesMatches[0].toString().split('">')[1].split("</a>")[0];

      const url =
        `https://www.parkstreetbrethren.org` +
        seriesMatches[0].toString().split('href="')[1].split('">')[0];

      const dateReg = /(\d{2}\/\d{2}\/\d{2})/g;
      const dateMatches = messageHtml.match(dateReg);
      let date = new Date();
      if (dateMatches != null) {
        date = dateMatches[0];
      }

      try {
        const record = $app
          .dao()
          .findFirstRecordByData("series", "title", title);
        existing += 1;
        continue;
      } catch (error) {}

      try {
        const collection = $app.dao().findCollectionByNameOrId("series");
        const record = new Record(collection, {
          title: title,
          url: url,
          imageUrl: imageUrl,
          date: new Date(date + " 6:00"),
          sermons: [],
        });
        $app.dao().saveRecord(record);
        added += 1;
      } catch (error) {
        $app.logger().error(JSON.stringify(error));
      }
    }
  } catch (error) {
    $app.logger().error(JSON.stringify(error));
    return c.json(400, { error });
  }

  $app.logger().info(JSON.stringify({ added, existing }));
  return c.json(200, { added, existing });
});
