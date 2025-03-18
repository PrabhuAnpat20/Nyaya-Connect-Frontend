"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="w-8 h-8 absolute top-0 left-0 right-0 mx-auto rounded-full bg-teal-500 animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-8 h-8 absolute top-0 left-0 right-0 mx-auto rounded-full bg-teal-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-8 h-8 absolute top-0 left-0 right-0 mx-auto rounded-full bg-teal-300 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
      <p className="mt-4 text-xl text-gray-600 animate-pulse">
        Fetching Latest News...
      </p>
    </div>
  );
}

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?" +
            "q=(law OR court OR Judiciary) AND india&" +
            "sortBy=publishedAt&" +
            "language=en&" +
            "apiKey=77a26cff335b4d518aefb5d94eb46ee4",
          {
            next: { revalidate: 3600 }, // Revalidate every hour
          }
        );
        const data = await response.json();
        setNews(data.articles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
            >
              {article.urlToImage && (
                <div className="relative w-full h-48">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsPage;
