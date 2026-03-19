# llm-factory

A modern React application for building and managing LLM-powered tools and workflows with a focus on developer experience and performance.

## Features

- Fast, responsive UI built with React 18 and TypeScript
- Modular architecture with feature-based organization pattern
- Robust API client with authentication support and request/response interceptors
- Responsive layout system with adaptive breakpoints
- Pre-configured with modern development tools and best practices
- Type-safe routing with TanStack Router
- Custom component library built with Tailwind CSS
- Comprehensive error handling and loading states

## Tech Stack

- **Frontend**: React 18, TypeScript 5.2+, Vite 5
- **UI Components**: Custom component library with Tailwind CSS
- **Routing**: TanStack Router (React Location)
- **API Communication**: Axios-based client with interceptors
- **Build Tool**: Vite for fast development and optimized production builds
- **Linting**: ESLint with TypeScript support and custom rules
- **Code Formatting**: Prettier with automatic formatting
- **Package Manager**: pnpm for efficient dependency management

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm package manager (recommended for best performance)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server (with hot module replacement)
pnpm dev

# Optional: Start development server with debug mode
pnpm dev:debug
```

### Building for Production

```bash
# Build for production (optimized bundle)
pnpm build

# Preview production build locally
pnpm preview

# Analyze bundle size
pnpm analyze
```

## Project Structure

The project follows a feature-based organization pattern to promote modularity and maintainability:

```
src/
├── @api/                 - API client and service definitions
│   ├── auth/             - Authentication API endpoints
│   └── client/           - Base API client setup with interceptors
├── @layout/              - Layout components
│   └── base-layout.tsx   - Main application layout wrapper
├── assets/               - Static assets (images, fonts, etc.)
├── components/           - Reusable UI components
│   └── ui/               - Primitive UI components (button, input, etc.)
├── features/             - Feature-specific components and logic
│   ├── about/            - About page feature
│   └── home/             - Home page feature
├── lib/                  - Utility functions and shared logic
├── routes/               - Application routes (TanStack Router)
│   ├── __root.tsx        - Root route definition
│   ├── about.tsx         - About page route
│   └── home.tsx          - Home page route
├── index.css             - Global styles
├── main.tsx              - Application entry point
└── routeTree.gen.ts      - Generated route types (TanStack Router)
```

## Development

### Linting

```bash
# Run ESLint to check for code issues
pnpm lint

# Auto-fix fixable linting issues
pnpm lint:fix
```

### Formatting

```bash
# Format code with Prettier
pnpm format

# Check formatting issues without fixing
pnpm format:check
```

### Type Checking

```bash
# Run TypeScript compiler in check mode
pnpm type-check
```

## Architecture Overview

### Application Architecture

The application follows a layered architecture pattern:

1. **Presentation Layer** - React components and pages
2. **Feature Layer** - Feature-specific logic and components
3. **Service Layer** - API clients and data fetching
4. **Core Layer** - Utilities, shared logic, and infrastructure

### Routing with TanStack Router

The application uses TanStack Router for type-safe routing with the following features:

- File-system based route generation
- Automatic code splitting and lazy loading
- Type-safe route parameters and search params
- Nested layouts and route groups
- Route loaders and actions for data fetching

### API Client

The API client is built with Axios and includes:

- Request/response interceptors for authentication and error handling
- Type-safe request and response types
- Retry logic for failed requests
- Request cancellation support
- Progress tracking for file uploads/downloads

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
