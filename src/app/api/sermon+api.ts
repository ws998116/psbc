import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { Sermon } from "./series+api";

export async function GET(request: ExpoRequest) {
  let sermon: Sermon | null = null;

  try {
    let uri = request.url.split("?uri=")[1];
    uri = decodeURIComponent(uri);
    const result = await fetch(uri);
    const html = await result.text();

    const imgReg = /(<img id="seriesimg")(.*)(" alt)/g;
    const imgMatches = html.match(imgReg);
    let image =
      "https://www.parkstreetbrethren.org/upload/images/logos/psbc-logo-white-2020.png";
    if (imgMatches != null) {
      const img = imgMatches[0]
        .split('<img id="seriesimg" src="')[1]
        .split('"')[0];
      image = `https://www.parkstreetbrethren.org${img}`;
    }

    const audioReg = /(<a class="secondary button" href=")(.*)(" target)/g;
    const audioMatches = html.match(audioReg);
    let audioUrl = null;
    if (audioMatches == null) {
      audioUrl = null;
    } else {
      const audio = audioMatches[0].split('href="')[1].split('"')[0];
      audioUrl = `https://www.parkstreetbrethren.org${audio}`;
    }

    const titleReg = /(<h1>)(.*)(<\/h1>)/g;
    const titleMatches = html.match(titleReg);
    if (titleMatches == null) {
      return;
    }
    const titleHtml = titleMatches[0].toString();
    const title = titleHtml.split("<h1>")[1].split("</h1>")[0];

    const sermonReg = /(<div class="panel radius">)(.+?)(<br \/>)/gs;
    const sermonMatches = html.match(sermonReg);

    if (sermonMatches == null) {
      return;
    }
    const sermonHtml = sermonMatches[0].toString();
    const seriesUrl =
      // `https://www.parkstreetbrethren.org` +
      sermonHtml.split('href="')[1].split('">')[0];

    const date = sermonHtml
      .split('<div class="panel radius">')[1]
      .split("&nbsp;")[0]
      .trim();

    const seriesTitle = sermonHtml.split('">')[2].split("</a>")[0];

    const speaker = sermonHtml.split("Speaker: ")[1].split("<br />")[0].trim();

    sermon = {
      url: uri,
      title,
      date,
      speaker,
      image,
      seriesTitle,
      seriesUrl,
      audioUrl,
    };
  } catch (error) {
    console.error(error);
    return new ExpoResponse("Error", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return ExpoResponse.json(sermon);
}
