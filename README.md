# Craft Poetry

## 🚀 What is this?
Craft Poetry is a Next.js web app for writing and validating poetic forms, currently focused on haiku with live structural checks and optional AI feedback.

## 🎯 Problem it solves
Writing poetry in strict formats is hard to validate manually. This project helps authors quickly check form-specific rules (like line count and syllables), catch common issues, and save drafts in one place.

## ✨ Key Features
- Real-time poem validation while typing, including line count, syllable structure, language-character checks, and line word-count limits for haiku.
- Separate technical and semantic feedback, including warnings (for example rhyme and cliché warnings).
- Optional AI-assisted analysis endpoint for suggestions, localized by selected language.
- Form selection flow for multiple poetry types (Haiku and Sonnet), with a validator registry for extensibility.
- Draft persistence and browsing using Prisma + PostgreSQL (`/drafts`, `/form/[id]`, `/library`).
- Built-in localization support for English, Ukrainian, and Russian.

## 🛠 Tech Stack
- Next.js (Pages Router) + React + TypeScript
- Material UI (MUI) + Emotion
- Prisma ORM + PostgreSQL
- next-i18next / i18next
- OpenAI Node SDK

## ⚡ Quick Start
```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## 📦 Scripts
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — run built app
- `npm run lint` — run ESLint + type checks
- `npm run lint:types` — TypeScript checks only
- `npm run format` — format code with Prettier
- `npm run open_db` — open Prisma Studio
- `npm run push_db` — push Prisma schema to database

## 📌 Notes
- Required environment variables:
  - `OPENAI_API_KEY`
  - `POSTGRES_PRISMA_URL`
  - `POSTGRES_URL_NON_POOLING`
  - `DEFAULT_AUTHOR_EMAIL` (must match an existing `User.email` in the database for form creation)
- Sonnet validation is currently a placeholder and returns no rule violations.
- API routes are implemented in `pages/api/*`; authentication scaffolding exists but is currently commented out.
