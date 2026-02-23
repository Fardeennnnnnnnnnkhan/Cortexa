## Project Summary
Cortexa is an AI-powered job prep tool designed to help users practice interviews, answer technical questions, and tailor their resumes based on uploaded job descriptions.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI Components: shadcn/ui
- Authentication: Clerk
- Database: Drizzle ORM (PostgreSQL)
- AI Integration: AI SDK, Hume AI

## Architecture
- `cortexa/app/`: Next.js App Router directory
- `cortexa/components/`: Shared UI components
- `cortexa/features/`: Feature-specific logic (interviews, resume, etc.)
- `cortexa/lib/`: Shared utilities
- `cortexa/drizzle/`: Database schema and migrations

## User Preferences
- Modern, sleek, minimal design
- Professional aesthetic with smooth spacing and rounded corners
- Soft shadows and good hierarchy
- Creative and distinctive frontends

## Project Guidelines
- Use named exports for components
- Minimize 'use client' directives
- Follow Next.js App Router best practices
- No comments unless requested

## Common Patterns
- shadcn/ui for UI components
- Tailwind CSS v4 for styling
- Clerk for authentication flows
