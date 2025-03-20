import { NextResponse } from "next/server";

export async function GET() {
  try {
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const response = await fetch(
      "https://newsapi.org/v2/everything?" +
        "q=(law OR court OR Judiciary) AND india&" +
        "sortBy=publishedAt&" +
        "language=en&" +
        `apiKey=${NEWS_API_KEY}`
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
