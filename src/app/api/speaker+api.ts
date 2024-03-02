import { ExpoRequest, ExpoResponse } from "expo-router/server";

export async function GET(request: ExpoRequest) {
  const req = await request.json();
  if (req.name == "Nate Bebout") {
    return ExpoResponse.json({
      name: "Nate Bebout",
      imageURL:
        "https://www.parkstreetbrethren.org/upload/images/staff_pictures/3.png",
    });
  }

  return new ExpoResponse("No speaker found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
