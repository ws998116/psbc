import { ExpoRequest, ExpoResponse } from "expo-router/server";

export type Sermon = {
  link: string;
  date: string;
  title: string;
  speaker: string | null;
  image: string;
};

export type Series = {
  title: string;
  image: string;
  link: string;
  sermons: Sermon[];
};

export async function GET(request: ExpoRequest) {
  let allSeries: Series[] = [];

  const uri = `https://www.parkstreetbrethren.org/sermons`;

  try {
    const result = await fetch(uri);
    const html = await result.text();
    const messageReg =
      /(<div class="message column column-block">)(.+?)(<\/a><\/h3>)/gs;
    const messageMatches = html.match(messageReg);
    // console.log(messageMatches[0]);
    if (messageMatches == null) {
      return;
    }
    for (let i = 0; i < messageMatches?.length; i++) {
      const messageHtml = messageMatches[i]?.toString();

      let image =
        "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png";
      const imgReg = /(<img src=(.*)>)/g;
      const imageMatches = messageHtml.match(imgReg);
      if (imageMatches != null) {
        const img = imageMatches[0]
          ?.toString()
          ?.split('src="')[1]
          ?.split('"')[0];
        if (img) {
          image = `https://www.parkstreetbrethren.org` + img;
        }
      }

      const seriesReg = /(<h3><a href=".*">)(.*)(<\/a><\/h3>)/g;
      const seriesMatches = messageHtml.match(seriesReg);
      if (seriesMatches == null) {
        return;
      }
      const title = seriesMatches[0].toString().split('">')[1].split("</a>")[0];
      const link = seriesMatches[0]
        .toString()
        .split('href="')[1]
        .split('">')[0];

      let sermons: Sermon[] = [];
      const sermonsReg = /(<li><a href=)(.*)(<\/a><\/li>)/g;
      const sermonsMatches = messageHtml.match(sermonsReg);
      if (sermonsMatches == null) {
        return;
      }
      sermonsMatches.forEach((sermonMatch) => {
        const sermonHtml = sermonMatch.toString();
        const link =
          `https://www.parkstreetbrethren.org` +
          sermonHtml.split('href="')[1].split('">')[0];
        const dateTitle = sermonHtml
          .split('">')[1]
          .split("</a></li>")[0]
          .split(" - ");
        const date = dateTitle[0];
        const title = dateTitle[1];
        sermons.push({
          link,
          date,
          title,
          speaker: null, // speaker info not available in this HTML page
          image,
        });
      });

      allSeries.push({ title, image, link, sermons });
    }
  } catch (error) {
    console.error(error);
  }

  return ExpoResponse.json(allSeries);
}
