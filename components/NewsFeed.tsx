"use client";

import { Article } from "@/app/page";

interface NewsFeedProps {
  articles: Article[];
  loading: boolean;
}

export default function NewsFeed({ articles, loading }: NewsFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <p>No news yet. Add some topics and click &quot;Get Latest News&quot; to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <article
          key={article.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded mb-2">
                {article.topic}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </a>
                ) : (
                  article.title
                )}
              </h3>
              <p className="text-gray-600 mb-3">{article.summary}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{article.source}</span>
                {article.publishedAt && (
                  <>
                    <span>•</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
