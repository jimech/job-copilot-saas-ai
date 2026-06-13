# AI Resume and Job Application Copilot

## Overview

AI Resume and Job Application Copilot is a commercial SaaS product for global job seekers. It helps users create resumes, tailor resumes with AI, generate application materials, track job or internship applications, save job opportunities, manage subscriptions, and control AI credit usage.

## Tech Stack

Current foundation:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zod environment validation
- npm

Planned integrations, not fully implemented yet:

- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Drizzle ORM
- Vercel AI SDK
- Stripe
- Inngest
- Sentry

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app usually runs at:

```txt
http://localhost:3000
```

If port `3000` is busy, Next.js may use another available port.

## Environment Variables

Environment variables are validated with Zod and split between client-safe and server-only modules. See [docs/environment-variables.md](docs/environment-variables.md).

Do not commit `.env.local` or any file containing real secrets.

## Common Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run check
```

`npm run check` runs typecheck, lint, and build in sequence.

## Project Structure

The app uses a `src/` structure with App Router pages in `src/app`, shared layout and UI components in `src/components`, reusable helpers in `src/lib`, future server-only modules in `src/server`, and shared types in `src/types`.

See [docs/project-structure.md](docs/project-structure.md).

## Development Workflow

Recommended workflow:

1. Pick one ticket.
2. Give Codex only that ticket prompt.
3. Review changes locally.
4. Run `npm run check`.
5. Commit manually.
6. Push manually.

GitHub Actions runs the same validation on pull requests and pushes to `main`.

See [docs/codex-workflow.md](docs/codex-workflow.md).

## Documentation

- [Product brief](docs/product-brief.md)
- [Technical architecture](docs/technical-architecture.md)
- [Database schema plan](docs/database-schema.md)
- [Security plan](docs/security-plan.md)
- [Environment variables](docs/environment-variables.md)
- [Local development](docs/local-development.md)
- [Codex workflow](docs/codex-workflow.md)
- [Project structure](docs/project-structure.md)

## Current Status

Current phase:

```txt
Phase 2 — Repository Foundation
```

Currently implemented:

- Project foundation
- Base routes
- Layout system
- shadcn/ui
- Environment variable validation
- Documentation

Not implemented yet:

- Authentication
- Database
- Resume builder logic
- AI logic
- Billing
- Storage
- Application tracker logic

## Notes

This repository is being built ticket-by-ticket. Keep changes scoped, validate locally before committing, and avoid adding integrations before their implementation tickets.
