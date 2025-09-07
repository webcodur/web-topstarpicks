# TopStarPicks NestJS Backend

A NestJS-based backend server for the TopStarPicks application, providing API endpoints for celebrity information, recommendations, and content management.

## Features

- **Celebrity Management**: CRUD operations for celebrity data
- **Recommendations**: Content recommendation system
- **Content Management**: Handle books, movies, and other media
- **Profession Categories**: Manage professional categories
- **AI Integration**: OpenAI API integration (placeholder)
- **Web Scraping**: Data crawling capabilities (placeholder)
- **SQLite Database**: Lightweight database integration

## Tech Stack

- **Framework**: NestJS
- **Database**: SQLite3 with SQL template strings
- **Validation**: Class-validator and class-transformer
- **Configuration**: @nestjs/config
- **Type Safety**: TypeScript
- **Testing**: Jest

## Project Structure

```
src/
├── main.ts                 # Application bootstrap
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
├── modules/                # Feature modules
│   ├── celebrities/        # Celebrity management
│   ├── recommendations/    # Recommendation system
│   ├── content/           # Content management
│   ├── profession/        # Profession categories
│   ├── ai/                # AI integration
│   ├── crawl/             # Web scraping
│   └── database/          # Database module
└── shared/                 # Shared utilities
    ├── database/          # Database service
    ├── guards/            # Guards
    ├── interceptors/      # Interceptors
    └── pipes/             # Validation pipes
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=4000
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_PATH=../topstarpicks.db
```

### Development

Start the development server:
```bash
pnpm start:dev
```

The server will start on http://localhost:4000 with API routes prefixed by `/api`.

### Production

Build and run for production:
```bash
pnpm build
pnpm start:prod
```

## Available Scripts

- `pnpm start:dev` - Start development server with hot reload
- `pnpm start:prod` - Start production server
- `pnpm build` - Build the application
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## API Endpoints

### Celebrities
- `GET /api/celebrities` - Get celebrities with filtering
- `GET /api/celebrities/name?name={name}` - Get celebrity by name
- `GET /api/celebrities/search?query={query}` - Search celebrities
- `GET /api/celebrities/detail/:id` - Get celebrity details
- `POST /api/celebrities` - Create celebrity
- `PUT /api/celebrities/:id` - Update celebrity
- `DELETE /api/celebrities/:id` - Delete celebrity

### Recommendations
- `GET /api/recommendations` - Get recommendations
- `GET /api/recommendations/all` - Get all recommendations (admin)
- `POST /api/recommendations` - Create recommendation
- `PUT /api/recommendations/:id` - Update recommendation
- `DELETE /api/recommendations/:id` - Delete recommendation

### Content
- `GET /api/content` - Get all content types

### Profession
- `GET /api/profession` - Get all professions
- `POST /api/profession` - Create profession
- `PUT /api/profession/:id` - Update profession
- `DELETE /api/profession/:id` - Delete profession

### AI
- `GET /api/ai` - Get available AI models
- `POST /api/ai/chat` - Test AI chat completion

### Crawl
- `POST /api/crawl/books` - Crawl book information
- `POST /api/crawl/refine` - Refine crawled data

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4000` |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `DATABASE_PATH` | SQLite database path | `../topstarpicks.db` |
| `NODE_ENV` | Environment | `development` |

## Database

This application uses SQLite as the database. The database file should be placed according to the `DATABASE_PATH` environment variable. The database service provides:

- Promise-based query execution
- SQL template strings support
- Connection management
- Error handling

## Migration from Express

This NestJS version maintains API compatibility with the original Express server while providing:

- Better code organization with modules
- Type safety with TypeScript
- Built-in validation
- Dependency injection
- Scalable architecture

## Development Notes

- The AI and Crawl modules contain placeholder implementations
- OpenAI integration needs to be completed
- Web scraping functionality needs to be implemented
- All API endpoints maintain compatibility with the frontend client
- Database operations use the same SQLite database as the Express version

## Testing

Run tests with:
```bash
pnpm test           # Run all tests
pnpm test:watch     # Run tests in watch mode
pnpm test:cov       # Run tests with coverage
```

## Contributing

1. Follow the established code structure
2. Add proper TypeScript types
3. Include appropriate validation DTOs
4. Write tests for new functionality
5. Follow NestJS best practices