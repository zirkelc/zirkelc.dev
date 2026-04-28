# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Next.js and Notion as the CMS. The site fetches blog posts from a Notion database and renders them as static pages using Next.js's Static Site Generation (SSG).

## Development Commands

- `pnpm dev` - Start development server on port 4000
- `pnpm build` - Build the project for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (via `next lint`)

Requires Node.js >= 22. `pnpm` is enforced by the `preinstall` script (`only-allow pnpm`).

## Architecture

### Content pipeline

1. `lib/notion.ts` fetches posts from the Notion database via `@notionhq/client`, filtered by `IsProduction` or `IsDevelopment` depending on `NODE_ENV`.
2. `notion-to-md` converts each page's blocks to Markdown. Custom transformers in `lib/notion.ts` handle:
   - Images with captions and optional link wrappers
   - Link previews: fetches the target URL and uses `page-metadata-parser` (+ `domino`) to render a rich preview card as inline HTML
3. Markdown is rendered with `react-markdown` + `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-raw` (see `components/controls/markdown.tsx`).

### Routing and rendering

- Pages Router (`pages/`), not App Router.
- `/posts/[slug]` and `/posts` use `getStaticProps` + `getStaticPaths` with ISR (`revalidate: 60`).
- `middleware.ts` rewrites three virtual URL patterns before they hit the page layer:
  - `/posts/<slug>.png` → `/api/og/<slug>` (dynamic OG image via `@vercel/og`)
  - `/posts.md` → `/api/md` (markdown index of all posts)
  - `/posts/<slug>.md` → `/api/md/<slug>` (raw markdown for a single post)
- The "MD" button in `components/post/notion-page-header.tsx` simply appends `.md` to the current path — the middleware does the actual rewrite.

### Notion database schema

Required fields on the Notion database:

- `Name` (Title), `Slug` (Text), `Tags` (Multi-select), `Date` (Date)
- `IsProduction` (Checkbox), `IsDevelopment` (Checkbox) — gate visibility per environment

### Environment

`.env.local` needs:

- `NOTION_TOKEN` — Notion integration token
- `DATABASE_ID` — Notion database ID

## Notes

- TypeScript `strict` is **off** (`tsconfig.json`).
- Prettier: single quotes, trailing commas, 120 col, `prettier-plugin-tailwindcss` for class sorting.
- Tailwind uses `@tailwindcss/typography` with a customized `prose` theme in `tailwind.config.js`.
- Redirects live in `next.config.js` (currently just `/nodes-2023` → external Notion page).
