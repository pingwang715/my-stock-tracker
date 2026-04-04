import React from "react";

export default function NewsCard({ feed }) {

  return (
    <div className="w-112 rounded-md mx-auto border border-gray-300 dark:border-gray-600 shadow-md flex flex-col bg-white dark:bg-gray-800 hover:border-primary dark:hover:border-lighter transition">
      <div className="relative h-160 p-4 flex flex-col font-primary">
        <img src={feed.image} alt={feed.title} className="w-full h-40 border-b border-gray-300 dark:border-gray-600"/>
        <h2 className="text-xl font-semibold text-primary dark:text-light mb-2">
            {feed.title}
        </h2>

        <p className="text-base text-gray-600 dark:text-lighter mb-2">
          {feed.summary}
        </p>
        <p className="text-base text-gray-600 dark:text-lighter mb-2">
          Source: {feed.source}
        </p>
        <p className="text-base text-gray-600 dark:text-lighter">
          Link: {feed.url}
        </p>
      </div>
    </div>
  );
}
