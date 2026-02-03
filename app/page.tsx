"use client";

import { useState, useEffect } from "react";
import TopicManager from "@/components/TopicManager";
import NewsFeed from "@/components/NewsFeed";

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  topic: string;
}

export default function Home() {
  const [topics, setTopics] = useState<string[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load saved topics on mount
  useEffect(() => {
    const saved = localStorage.getItem("newsTopics");
    if (saved) {
      try {
        setTopics(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved topics", e);
      }
    }
    setInitialLoading(false);
  }, []);

  // Save topics whenever they change
  useEffect(() => {
    if (!initialLoading) {
      localStorage.setItem("newsTopics", JSON.stringify(topics));
    }
  }, [topics, initialLoading]);

  const addTopic = (topic: string) => {
    if (topic.trim() && !topics.includes(topic.trim())) {
      setTopics([...topics, topic.trim()]);
    }
  };

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  const fetchNews = async () => {
    if (topics.length === 0) {
      setError("Please add at least one topic first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch news");
      }

      const data = await response.json();
      setArticles(data.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Curated News</h1>
        <p className="text-gray-600">
          Your personalized, politics-free news feed
        </p>
      </header>

      <TopicManager
        topics={topics}
        onAddTopic={addTopic}
        onRemoveTopic={removeTopic}
      />

      <div className="my-6">
        <button
          onClick={fetchNews}
          disabled={loading || topics.length === 0}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Fetching news..." : "Get Latest News"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <NewsFeed articles={articles} loading={loading} />
    </main>
  );
}
