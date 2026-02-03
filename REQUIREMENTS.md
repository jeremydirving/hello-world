# Curated News App - Project Requirements

## Overview

A personalized news curator web application that allows users to define specific topics of interest and receive AI-curated news feeds free from politically charged content.

## Goals

- **Simplicity**: Easy to set up topics and browse news
- **Focus**: Only show news relevant to user-defined topics
- **Neutrality**: Filter out politically charged content
- **Intelligence**: AI-powered curation without requiring manual source management

## Core Features

### 1. Topic Management
- Users can add, edit, and remove topics of interest
- Topics can be specific (e.g., "Apple iPhone releases", "Tesla vehicles", "SpaceX launches")
- Optional: Preferred news sources (but not required - AI handles discovery)

### 2. AI-Curated News Feed
- Fetches current news based on user topics using AI web search
- Filters out politically charged content automatically
- Presents clean, summarized news items
- Shows source attribution for each news item

### 3. User Interface
- Clean, minimal design
- Mobile-responsive (works well on phones and tablets)
- Simple navigation between topics and feed

## Technical Architecture

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useContext)

### Backend
- **API Routes**: Next.js API routes
- **Data Storage**: Local storage for MVP (file-based or localStorage)

### AI Integration
- **Provider**: Anthropic Claude API
- **Capabilities Used**:
  - Web search for current news
  - Content analysis and filtering
  - Summarization

## User Flow

1. **First Visit**: User sees empty state, prompted to add topics
2. **Add Topics**: User enters topics they care about (e.g., "Samsung Galaxy phones", "Nintendo gaming")
3. **View Feed**: App fetches and displays curated news for their topics
4. **Refresh**: User can refresh to get latest news
5. **Manage**: User can add/remove topics anytime

## API Design

### Endpoints

#### `GET /api/preferences`
Returns user's saved topics and settings

#### `POST /api/preferences`
Saves user's topics and settings

#### `POST /api/news`
Fetches curated news based on user topics
- Request: `{ topics: string[] }`
- Response: `{ articles: Article[] }`

### Article Schema
```typescript
interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  topic: string; // which user topic this relates to
}
```

## Non-Goals (for MVP)

- User authentication/accounts
- Persistent cloud storage
- Push notifications
- Social sharing
- Multiple users

## Future Considerations

- User accounts with cloud sync
- Scheduled news digests (email/notification)
- More granular filtering controls
- News source preferences and blacklisting
- Reading history and "mark as read"

## Success Criteria

1. User can add at least 3 topics
2. App displays relevant, non-political news for those topics
3. Works smoothly on mobile browsers
4. News refreshes with current content
