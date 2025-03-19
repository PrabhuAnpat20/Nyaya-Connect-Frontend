import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?" +
        "q=(law OR court OR Judiciary) AND india&" +
        "sortBy=publishedAt&" +
        "language=en&" +
        "apiKey=77a26cff335b4d518aefb5d94eb46ee4"
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
