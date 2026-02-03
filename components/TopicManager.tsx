"use client";

import { useState } from "react";

interface TopicManagerProps {
  topics: string[];
  onAddTopic: (topic: string) => void;
  onRemoveTopic: (topic: string) => void;
}

export default function TopicManager({
  topics,
  onAddTopic,
  onRemoveTopic,
}: TopicManagerProps) {
  const [newTopic, setNewTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim()) {
      onAddTopic(newTopic.trim());
      setNewTopic("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Topics</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="e.g., Apple iPhone, Tesla vehicles, SpaceX..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!newTopic.trim()}
          className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </form>

      {topics.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No topics yet. Add some topics above to get started!
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {topic}
              <button
                onClick={() => onRemoveTopic(topic)}
                className="ml-1 hover:text-blue-600 focus:outline-none"
                aria-label={`Remove ${topic}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
