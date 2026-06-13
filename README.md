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
- Drizzle ORM foundation
- npm

Planned integrations, not fully implemented yet:

- Supabase Auth client foundation
- Supabase Postgres client foundation
- Supabase Storage client foundation
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
npm run db:generate
npm run db:migrate
npm run db:studio
npm run db:check
```

`npm run check` runs typecheck, lint, and build in sequence.

Database commands use Drizzle Kit and require `DATABASE_URL`. See [docs/database-development.md](docs/database-development.md).

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
- [Database development](docs/database-development.md)
- [Security plan](docs/security-plan.md)
- [Environment variables](docs/environment-variables.md)
- [Local development](docs/local-development.md)
- [Auth QA checklist](docs/auth-qa-checklist.md)
- [Codex workflow](docs/codex-workflow.md)
- [Project structure](docs/project-structure.md)

## Current Status

Current phase:

```txt
Phase 4 — Database Foundation In Progress
```

Currently implemented:

- Next.js app foundation
- Layout and routes
- shadcn/ui
- Environment variable validation
- Supabase Auth foundation
- Sign-up, sign-in, and sign-out
- Protected routes
- Server auth session utilities
- Onboarding metadata form
- Auth-aware navigation and sign-out UI
- Drizzle ORM package and configuration foundation
- Lazy server-side Drizzle client
- Documentation

Not implemented yet:

- Application database schema
- Generated database migrations
- Supabase RLS policies
- Full admin route enforcement
- Resume builder logic
- Resume upload/storage
- AI logic
- Billing
- Application tracker logic
- Job persistence

## Notes

Protected app routes require authentication. Unauthenticated users are redirected to `/sign-in?next=...`, and signed-in users who visit `/sign-in` or `/sign-up` are redirected to `/dashboard`.

Server auth utilities live under `src/server/auth`. Future server pages, actions, and route handlers should use `requireUser()` when authentication is required, and `requireAdmin()` after admin roles are configured. Full admin route enforcement is not implemented yet.

Onboarding currently saves basic profile preferences to Supabase Auth user metadata. Database-backed profile persistence will be added in a later database phase.

Drizzle is configured for future Supabase Postgres schema and migration work. No application tables, migrations, or RLS policies have been created yet.

Navigation is now auth-aware. Signed-out users see marketing and auth links, while signed-in users see app links and a sign-out control that posts to `/auth/sign-out`. No database profile data is used yet.

Run the [auth QA checklist](docs/auth-qa-checklist.md) after changing auth, proxy, onboarding, or navigation code.

This repository is being built ticket-by-ticket. Keep changes scoped, validate locally before committing, and avoid adding integrations before their implementation tickets.
