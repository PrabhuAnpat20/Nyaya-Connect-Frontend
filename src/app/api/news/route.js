import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get the topic from the URL query parameters
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic") || "(law OR court OR Judiciary) AND india";

    // Function to fetch YouTube videos
    async function fetchYouTubeVideos(searchTopic) {
      try {
        const YOUTUBE_API_KEY = "AIzaSyBsOLBNAFi0ztRPxA3MB97wb3CzyjMlUpY";
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
            `part=snippet&` +
            `q=${encodeURIComponent(searchTopic)}&` +
            `type=video&` +
            `maxResults=5&` +
            `key=${YOUTUBE_API_KEY}`
        );

        const data = await response.json();

        return data.items?.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        })) || [];
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
      }
    }

    // Fetch YouTube videos
    const videos = await fetchYouTubeVideos(topic);

    return NextResponse.json({
      videos: videos,
      topic: topic,
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
