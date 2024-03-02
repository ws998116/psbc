import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Sermon } from "./series+api";

export async function GET(request: ExpoRequest) {
  let allSermons: Sermon[] = [];

  try {
    let uri = request.url.split("?uri=")[1];
    uri = decodeURIComponent(uri);
    const result = await fetch(uri);
    const html = await result.text();

    let image =
      "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png";
    const imgReg = /(<img src=")(.*)(" alt)/g;
    const imgMatches = html.match(imgReg);
    if (imgMatches != null) {
      const img = imgMatches[0].split('<img src="')[1].split('"')[0];
      image = `https://www.parkstreetbrethren.org${img}`;
    }

    const sermonsReg =
      /(<div class="column column-block">)(.+?)(<\/div>.+?<\/div>)/gs;
    const sermonsMatches = html.match(sermonsReg);

    if (sermonsMatches == null) {
      return;
    }
    sermonsMatches.forEach((sermonMatch) => {
      const sermonHtml = sermonMatch.toString();
      const link =
        `https://www.parkstreetbrethren.org` +
        sermonHtml.split('href="')[1].split('">')[0];

      const date = sermonHtml.split("</h3>")[1].split("<br />")[0].trim();

      const title = sermonHtml.split("</a></h3>")[0].split('">').slice(-1)[0];

      const speaker = sermonHtml
        .split("Speaker: ")[1]
        .split("</div>")[0]
        .trim();

      allSermons.push({ link, date, title, speaker, image });
    });
  } catch (error) {
    console.error(error);
    return new ExpoResponse("Error", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return ExpoResponse.json(allSermons);
}
