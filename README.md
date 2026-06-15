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
- [Database QA checklist](docs/database-qa-checklist.md)
- [Security plan](docs/security-plan.md)
- [Environment variables](docs/environment-variables.md)
- [Local development](docs/local-development.md)
- [Auth QA checklist](docs/auth-qa-checklist.md)
- [Codex workflow](docs/codex-workflow.md)
- [Project structure](docs/project-structure.md)

## Current Status

Current phase:

```txt
Phase 4 — Database Foundation Complete
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
- Core Drizzle schema tables and enums
- Initial generated Drizzle migration
- Initial migration applied to Supabase Postgres
- RLS policy migration created
- RLS policy migration applied to Supabase
- Auth user database sync
- Phase 4 database QA checklist
- Documentation

Not implemented yet:

- Admin bypass policies
- Storage policies
- pgvector and document embeddings
- Resume builder database features
- Job/application persistence features
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

Supabase Auth users are synced into the app database after auth callback and onboarding sync. The sync upserts `users`, ensures a `profiles` row, and ensures a free `subscriptions` row. It is safe to call multiple times and does not accept user IDs from the client.

Drizzle is configured for Supabase Postgres schema and migration work. Core schema tables now exist in Supabase Postgres after applying the initial generated migration. The RLS policy migration has also been applied: it uses `auth.uid() = id` for `users`, `auth.uid() = user_id` for user-owned tables, global job reads for `jobs.user_id is null`, read-only regular-user access for `subscriptions`, and select/insert-only regular-user access for `ai_generations`. Admin bypass policies, storage policies, pgvector setup, the `document_embeddings` table, and database-backed product pages have not been created yet.

Use the [database QA checklist](docs/database-qa-checklist.md) to verify Phase 4 database setup, RLS, and auth user sync.

Navigation is now auth-aware. Signed-out users see marketing and auth links, while signed-in users see app links and a sign-out control that posts to `/auth/sign-out`. No database profile data is used yet.

Run the [auth QA checklist](docs/auth-qa-checklist.md) after changing auth, proxy, onboarding, or navigation code.

This repository is being built ticket-by-ticket. Keep changes scoped, validate locally before committing, and avoid adding integrations before their implementation tickets.
