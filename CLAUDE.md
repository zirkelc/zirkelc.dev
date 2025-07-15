# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Next.js and Notion as the CMS. The site fetches blog posts from a Notion database and renders them as static pages using Next.js's Static Site Generation (SSG).

## Development Commands

- `pnpm install` - Install dependencies (uses pnpm as package manager)
- `pnpm dev` - Start development server on port 4000
- `pnpm build` - Build the project for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture

### Content Management
- **Notion Integration**: Uses `@notionhq/client` to fetch blog posts from a Notion database
- **Content Filtering**: Posts are filtered by `IsProduction`/`IsDevelopment` checkbox fields based on `NODE_ENV`
- **Markdown Processing**: Notion content is converted to Markdown using `notion-to-md` library
- **Custom Transformers**: Special handling for images (with captions/links) and link previews with metadata

### Data Flow
1. **Static Generation**: Uses Next.js `getStaticProps` and `getStaticPaths` for SSG
2. **Revalidation**: Pages revalidate every 60 seconds using ISR
3. **Routing**: Dynamic routes at `/posts/[slug]` and `/tags/[tag]`
4. **Post Properties**: Each post has title, slug, tags, date, and optional Dev.to article ID

### Key Components Structure
- `lib/notion.ts` - Core Notion API integration and data fetching
- `lib/dev.ts` - Dev.to API integration for additional article metadata
- `pages/_app.tsx` - App wrapper with common layout (Header, Footer, Container)
- `components/layout/` - Reusable layout components
- `components/post/` - Post-specific components
- `components/controls/` - UI controls (code blocks, links, markdown rendering)

### Styling
- **Tailwind CSS**: Uses JIT mode with custom typography plugin
- **Custom Prose**: Extended typography styles for blog content
- **Responsive Design**: Mobile-first approach

## Environment Setup

Required environment variables in `.env.local`:
- `NOTION_TOKEN` - Notion integration token
- `DATABASE_ID` - Notion database ID

## Notion Database Schema

The Notion database must include these fields:
- `Name` (Title) - Post title
- `Slug` (Text) - URL slug
- `Tags` (Multi-select) - Post tags
- `Date` (Date) - Publication date
- `IsProduction` (Checkbox) - Show in production
- `IsDevelopment` (Checkbox) - Show in development
- `DevArticleId` (Number, optional) - Dev.to article ID for cross-posting

## Markdown Access

Posts can be accessed as raw markdown files through multiple methods:

### API Route (Recommended for Raw Markdown)
- **URL Format**: `/api/posts/[slug].md` (e.g., `/api/posts/my-post.md`)
- **Response**: Returns raw markdown with proper `Content-Type: text/markdown` headers
- **Features**: Includes post title as H1 and proper filename for downloads

### Page Route (Redirects to API)
- **URL Format**: `/posts/[slug].md` (e.g., `/posts/my-post.md`)
- **Behavior**: Automatically redirects to the API route for raw markdown
- **Static Generation**: Both HTML and markdown versions are pre-generated at build time

### Toggle Button
- **Location**: Each post header includes a toggle button
- **Functionality**: "MD" button redirects to API route for raw markdown, "HTML" button returns to formatted post
- **Example**: Click "MD" on any post to get the raw markdown version

## Development Notes

- TypeScript is configured with strict mode disabled
- Uses pnpm for package management (enforced by preinstall script)
- Vercel Analytics integration included
- Custom Next.js redirects configured in `next.config.js`
- Link previews fetch metadata and render custom HTML components