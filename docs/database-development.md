# Database Development

## Overview

The app uses Drizzle ORM for schema definitions, migrations, and server-side queries against Supabase Postgres. Phase 4 database foundation is complete: the core application schema tables now exist in TypeScript, the initial SQL migration has been applied to Supabase, the initial RLS policy migration has been applied, and auth users sync into app database rows. pgvector setup and product database logic will be handled in later tickets.

Use [Database QA Checklist](database-qa-checklist.md) for verification.

## Local Environment

Database tooling reads `DATABASE_URL` from the local environment:

```env
DATABASE_URL=
```

Use a Supabase Postgres connection string from the Supabase project dashboard. Keep the value in `.env.local` or another uncommitted local environment file. Never commit real database URLs or credentials.

For serverless runtime access, prefer a pooled Supabase connection string when available. For migration commands, use the connection string recommended by Supabase for schema changes.

## Drizzle Files

- `drizzle.config.ts` configures Drizzle Kit.
- `src/server/db/client.ts` exposes a lazy server-side Drizzle client.
- `src/server/db/schema/index.ts` is the central schema export file for the current core tables and enums.
- `src/server/db/migrations` contains generated Drizzle migration files and metadata.

The database client is created lazily so normal app builds can pass without `DATABASE_URL` configured. Any code that calls `getDb()` still requires `DATABASE_URL`.

## Common Commands

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
npm run db:check
```

- `npm run db:generate` creates migration files from Drizzle schema changes.
- `npm run db:migrate` applies generated migrations to the configured database.
- `npm run db:studio` opens Drizzle Studio for local inspection.
- `npm run db:check` validates migration consistency.

Do not run migration commands against production without reviewing the generated SQL and confirming the target database.

## Migration Workflow

1. Update Drizzle schema files under `src/server/db/schema`.
2. Run `npm run db:generate`.
3. Review the generated SQL in `src/server/db/migrations`.
4. Commit schema changes and generated migration files together.
5. Apply reviewed migrations to Supabase with `npm run db:migrate` in a dedicated migration-apply ticket.

The initial migration has been applied to Supabase. Future schema changes should continue to use generated Drizzle migrations.

The initial RLS policy migration has been applied to Supabase. Future RLS changes should continue to use reviewed Drizzle SQL migrations.

## Safety Rules

- Do not place real secrets in tracked files.
- Do not expose `DATABASE_URL` or Supabase service-role credentials to the browser.
- Do not create tables directly in production outside the migration workflow.
- Do not run destructive migrations without an explicit rollback or recovery plan.
- Keep RLS policy changes paired with the tables they protect.
- Use server-side database access for protected product data.

## Current Status

Drizzle ORM is installed and configured. The core schema tables now exist in Supabase Postgres for users, profiles, subscriptions, resumes, resume documents, jobs, applications, generated documents, and AI generations. The initial migration has been generated in `src/server/db/migrations` and applied to Supabase.

The RLS policy migration has been applied. It protects user-owned data with `auth.uid() = user_id`, uses `auth.uid() = id` for `users`, allows global job reads through `jobs.user_id is null`, keeps `subscriptions` read-only to regular users, and keeps `ai_generations` select/insert only for regular users.

Supabase Auth users are synced into the app database after a successful auth callback and after onboarding metadata is saved. The sync upserts `users` and ensures one `profiles` row and one free `subscriptions` row exist. It is safe to call multiple times.

The resume database service now provides server-side Drizzle helpers for resume CRUD operations. These helpers always require `userId` and filter by ownership in application code, even though RLS is active. Resume UI pages, server actions, and API routes are not connected yet.

Admin bypass policies and storage policies are not implemented yet. Product pages are not connected to the database yet. `document_embeddings` and pgvector setup are intentionally deferred to a later pgvector ticket.
