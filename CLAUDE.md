# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StrongMe is a minimalist workout timer PWA (Progressive Web App) for Android Chrome. It guides users through pre-defined workout plans with activity sequencing, set/rep counting, and timed countdown stages. **V0 implementation complete** — core UI, data loading, timer, and activity flow are functional.

## Tech Stack

- **Framework:** Preact (lightweight React alternative)
- **Styling:** Tailwind CSS (mobile-first)
- **Build:** Vite + vite-plugin-pwa (service worker generation)
- **Deployment:** Vercel
- **State:** Preact Signals or useState (no external state library)

## Build Commands

```
npm run dev      # Vite dev server
npm run build    # Production build
```

## Architecture

**Data flow:** Static JSON files → Service Worker cache → Client-side lookup → Preact components → localStorage (session persistence)

**Data model hierarchy:** Campaign → Week Plans → Day Plans → Activities

**UI layout** is a vertical mobile stack using `flex flex-col h-screen`: Campaign Bar → Week Selector → Day Strip → Activity List (shrink-to-fit) → Timer Console (flex-1, expands to fill remaining space).

**Timer Console** has three stages with distinct colors: prep (purple `#A855F7`) → work (cyan `#00D4FF`) → rest (orange `#F97316`).

## Coding Conventions (from pm/coding_style.md)

- Entity names (tables, fields, IDs, filenames): `lower_snake_case`
- IDs: `id` for primary keys, `table_id` for foreign keys; prefixed codes (e.g., `tn997`)
- Components: `PascalCase` (e.g., `TimerConsole.jsx`)
- Folder structure: `/src/components`, `/pages`, `/hooks`, `/utils`, `/data`

## Design Tokens

- Dark theme with near-black background (`#0A0A0C`), surface (`#141418`), elevated (`#1C1C21`)
- Accent: `#00D4FF` (cyan)
- Text: white primary, `#A1A1AA` secondary, `#52525B` tertiary
- Font: Inter, -apple-system, BlinkMacSystemFont
- Border radius: 8–24px

## Key Documentation

- `pm/prd_v0.md` — Full PRD with features, architecture, UI specs
- `pm/coding_style.md` — Naming and structure conventions
- `sample_data/` — JSON fixtures (campaigns, weekplans, dayplans, activities) with schema notes in its README. For reference only.
- `docs/` — root for JSON files Published to github pages. Connect to this source with the app.
- `design/` — HTML mockup and screenshot
