import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  topic: string;
}

export async function POST(request: NextRequest) {
  try {
    const { topics } = await request.json();

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one topic" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please set ANTHROPIC_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const topicsList = topics.join(", ");

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `You are a news curator. Search for the latest news on these topics: ${topicsList}

IMPORTANT RULES:
1. Find recent, factual news articles about these specific topics
2. EXCLUDE any politically charged content, political news, or articles with political angles
3. Focus on product announcements, technology updates, company news, and industry developments
4. For each article, provide the actual source URL if available

Return your response as a JSON array with this exact format:
[
  {
    "id": "unique-id-1",
    "title": "Article title",
    "summary": "2-3 sentence summary of the article",
    "source": "Source name (e.g., TechCrunch, The Verge)",
    "url": "https://actual-article-url.com",
    "publishedAt": "2025-02-03",
    "topic": "Which user topic this relates to"
  }
]

Return ONLY the JSON array, no other text. Find 3-5 articles per topic if possible.`,
        },
      ],
    });

    // Extract text content from response
    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from AI");
    }

    // Parse the JSON response
    let articles: Article[];
    try {
      // Try to extract JSON from the response (it might be wrapped in markdown code blocks)
      let jsonStr = textContent.text;
      const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      articles = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", textContent.text);
      throw new Error("Failed to parse news data");
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch news" },
      { status: 500 }
    );
  }
}
