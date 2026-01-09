# Overview

This is a full-stack web application for a Hebrew carpentry business called "גרנות עיצובים" (Granot Designs). The application is built as a single-page website featuring a modern, responsive design with RTL (Right-to-Left) language support. The site showcases the carpentry business's services, portfolio, company information, and contact details through an elegant interface with smooth animations and a dynamic image carousel.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture. The application uses:

- **Vite** as the build tool and development server for fast development and optimized production builds
- **Tailwind CSS** for utility-first styling with custom CSS variables for theming
- **Shadcn/ui** component library built on Radix UI primitives for accessible, customizable UI components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for state management and data fetching (though currently not actively used for API calls)

The component structure follows a modular approach with a **two-view navigation system** consisting of:

1. **Hero View**: Features a fade-transition image carousel showcasing portfolio work
2. **Main Content View**: Full-screen horizontal Swiper experience with slides for Portfolio, Services, About, and Contact sections

The application implements RTL layout support throughout with Hebrew language content and follows the Minale + Mann design aesthetic with horizontal pagination and minimal UI elements.

## Backend Architecture

The backend uses **Express.js** with **TypeScript** running on Node.js. Key architectural decisions include:

- **Modular routing system** with a dedicated routes file for API endpoint organization
- **Storage abstraction layer** using an interface pattern that currently implements in-memory storage but can be easily swapped for database implementations
- **Development-focused setup** with Vite integration for seamless full-stack development
- **Middleware architecture** for request logging, error handling, and JSON parsing

The server is configured to serve the React application in production while providing API endpoints under the `/api` prefix.

## Styling and Design System

The application implements a comprehensive design system using:

- **Custom CSS variables** for consistent theming across light/dark modes
- **Typography system** using Inter for sans-serif and Playfair Display for serif fonts
- **RTL-first design** with proper text direction and layout mirroring
- **Responsive design patterns** with mobile-first approach
- **Component variants** using class-variance-authority for consistent styling patterns

## Data Layer

Currently implements a minimal data layer with:

- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Type-safe database operations** using Drizzle's TypeScript integration
- **Zod schemas** for runtime validation integrated with Drizzle
- **Migration system** for database schema management

The current schema includes a basic user model, though the application primarily serves static content.

# External Dependencies

## Database
- **PostgreSQL** via Drizzle ORM and @neondatabase/serverless for cloud database connectivity
- **Drizzle Kit** for database migrations and schema management

## UI Framework
- **Radix UI** primitives for accessible, unstyled UI components
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **Swiper.js** for the main horizontal scrolling experience with modules for navigation, scrollbar, keyboard, and mousewheel control
- **Custom CSS transitions** for hero carousel fade effects

## Development Tools
- **Vite** for build tooling and development server
- **TypeScript** for type safety across the stack
- **ESBuild** for production server bundling
- **PostCSS** with Autoprefixer for CSS processing

## Third-party Services
- **Unsplash/Pixabay** for placeholder images in the portfolio and hero sections
- **Google Fonts** for Inter and Playfair Display typography
- **Replit-specific plugins** for development environment integration (cartographer, dev banner, runtime error overlay)

## State Management and Forms
- **TanStack Query** for server state management and caching
- **React Hook Form** with Hookform Resolvers for form handling
- **Zod** for schema validation and type inference

The application is designed to be easily deployable on various platforms with minimal configuration changes, particularly suited for Replit's environment with integrated development tools.