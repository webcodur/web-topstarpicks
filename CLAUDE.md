# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TopStarPicks is a full-stack web application featuring celebrity information, recommendations, and games. Currently migrating from Material-UI to Tailwind CSS for the frontend, with a parallel NestJS backend migration in progress.

## Tech Stack

**Frontend (app_client):**

- React 18 with React Router v6
- UI Framework: Migrating from Material-UI to **Tailwind CSS**
- Jotai for state management
- React Query for data fetching
- i18next for internationalization (Korean/English)
- Swiper for carousel components
- Framer Motion for animations
- Additional: axios, recharts, josa-complete (Korean processing)

**Backend Migration (app_server):**

- NestJS framework (in development)
- TypeORM for database management

## Development Commands

**Root Directory:**

```bash
# Install all dependencies
pnpm run install:all

# Development (both frontend and backend)
pnpm run dev

# Run frontend only (port 3002)
pnpm fe

# Run backend only (port 4000)
pnpm be

# Run NestJS backend (development)
pnpm nest

# Build frontend
pnpm run build

# Run tests
pnpm run test

# Clean node_modules
pnpm run clean
```

**Frontend (app_client):**

```bash
cd app_client
pnpm install
pnpm start          # Development server on port 3002
pnpm build         # Production build
pnpm build:prod    # Production build with environment
pnpm test          # Run tests with react-scripts
```

**Backend (app_server):**

```bash
cd app_server
pnpm install
pnpm start         # Start server with nodemon
pnpm dev           # Same as start (nodemon)
```

## Project Structure

### Frontend Architecture

**State Management:**

- Global state: Jotai atoms in `app_client/src/store/atom.js`
- Server state: React Query with queryClient in `app_client/src/queryClient.js`
- Local storage persistence for view preferences, dark mode, and language

**Routing:**

- Routes defined in `app_client/src/routes.js`
- Main sections: Home, People (history/legend/myth), Games, Content details, Admin

**API Layer:**

- API utilities in `app_client/src/api/`
- Endpoints for celebrities, recommendations, content, professions, AI features

**Component Organization:**

- `src/components/` - Reusable UI components
- `src/pages/` - Page-level components
- `src/view/` - Feature-specific views (people, games, admin)
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions

### Backend Architecture

**API Routes:**

- `/api/celebrities` - Celebrity data management
- `/api/recommendations` - Content recommendations
- `/api/content` - Content information
- `/api/profession` - Profession categories
- `/api/ai` - OpenAI integration endpoints
- `/api/crawl` - Web scraping endpoints

**Database:**

- SQLite database: `app_server/topstarpicks.db`
- Database wrapper: `app_server/src/database.js` with promise-based query execution
- SQL template strings for safe queries

**Services:**

- `app_server/src/services/` - Business logic and external API integrations
- `app_server/src/prompts/` - AI prompt templates

## Key Features

1. **Celebrity Database:** Browse historical and contemporary figures with filtering by profession and era
2. **Content Recommendations:** Personalized book and movie recommendations based on celebrity preferences
3. **Games Module:** Interactive games related to celebrities
4. **Multilingual Support:** Korean and English localization
5. **Dark Mode:** Theme switching capability
6. **Admin Panel:** Content management interface

## Database Schema

Main tables include:

- `celebrities` - Person information (id, name, profession_id, gender, nationality, birth_date, death_date, biography, img_link, vid_link, is_real, is_legend)
- `recommendations` - Links celebrities to content (celebrity_id, content_id)
- `content` - Books, movies, and other media
- `profession` - Career categories
- `celebrity_influence` - Influence scoring (political, strategic, tech, social, economic, cultural, transhistoricity)

## Environment Variables

Create `.env` files in respective directories:

- `app_server/.env` - API keys for OpenAI and other services
- Server defaults to PORT 4000 if not specified

## Testing

Frontend tests use React Testing Library and Jest:

```bash
cd app_client
pnpm test
```

Backend testing not yet configured.

## API Integration Points

- OpenAI API for AI-powered celebrity information
- Google Trends API for popularity tracking
- Web scraping with Cheerio for external data

## Development Notes

- Frontend runs on port 3002 by default
- Backend runs on port 4000 by default
- CORS is enabled for all origins
- Nodemon used for backend hot-reloading
- Database uses promise-based wrapper for async operations
- Global error handling middleware configured
- Package manager: **pnpm** (not npm or yarn)
- Concurrent development mode runs both frontend and backend

## Coding Guidelines

**Code Style:**

- Keep files under 200 lines when possible
- Prefer ternary operators over if/else for simple conditions
- Use && operator for conditional component rendering (not ternary)
- Prefer object mapping over switch statements
- Use early returns to reduce nesting
- Comments in Korean when necessary
- Use `region/endregion` for logical grouping in long files

**Component Guidelines:**

- Use `start/end` instead of `left/right` for positioning
- No emojis in code - use Lucide icons instead
- Hover effects should be immediate (no transition delay)

**Import Paths:**

- Absolute paths for large external component imports
- Relative paths for small internal component imports
- Global hooks should be placed in the hooks directory

**TypeScript:**

- Avoid `any` and `Record<string, unknown>` types
- ENUM types use "ENUM\_" prefix with underscore format
- Always show ID columns in tables (visibility handled separately)
