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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use our internal API route instead of directly calling News API
        const response = await fetch('/api/news');
        const data = await response.json();
        
        if (data.status === 'error') {
          throw new Error(data.message || 'Failed to fetch news');
        }
        
        setNews(data.articles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message || 'Failed to fetch news');
        setLoading(false);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  // Show error message if there's an error
  if (error && !loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="mt-2">We're unable to load the latest legal news at this time.</p>
        </div>
      </div>
    );
  }

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
                <div className="relative w-full h-40">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-3">
                <h2 className="text-lg font-semibold mb-1.5 text-gray-800 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1.5 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
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
