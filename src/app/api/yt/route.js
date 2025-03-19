import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic") || "(law OR court OR Judiciary) AND india";

    const YOUTUBE_API_KEY = "AIzaSyBsOLBNAFi0ztRPxA3MB97wb3CzyjMlUpY";
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&` +
        `q=${encodeURIComponent(topic)}&` +
        `type=video&` +
        `maxResults=5&` +
        `key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    const videos = data.items?.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    })) || [];

    return NextResponse.json({
      videos: videos,
      topic: topic,
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube videos" },
      { status: 500 }
    );
  }
}
