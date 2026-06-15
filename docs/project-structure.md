# Project Structure

## Root Files

- `package.json` defines npm scripts and dependencies.
- `package-lock.json` locks npm dependency versions.
- `next.config.ts` contains Next.js configuration.
- `tsconfig.json` contains TypeScript configuration and path aliases.
- `eslint.config.mjs` contains ESLint configuration.
- `postcss.config.mjs` contains PostCSS configuration for Tailwind.
- `components.json` configures shadcn/ui.
- `drizzle.config.ts` configures Drizzle Kit for Supabase Postgres schema and migration tooling.
- `.env.example` lists expected environment variables without real secrets.
- `src/proxy.ts` is the Next.js 16 request interception entrypoint. It refreshes Supabase auth sessions and redirects unauthenticated users away from protected app routes.

## App Directory

`src/app` contains Next.js App Router pages and route segments.

Important routes currently present:

- `/`
- `/pricing`
- `/sign-in`
- `/sign-up`
- `/onboarding`
- `/dashboard`
- `/resumes` reads authenticated, user-scoped resume list data.
- `/resumes/[resumeId]` edits resume title, basics, summary, and skills for a user-owned resume and supports confirmed deletion of owned resumes.
- `/resumes/new`
- `/resumes/[resumeId]/edit`
- `/resumes/[resumeId]/preview` shows an authenticated, user-scoped read-only resume preview.
- `/resumes/[resumeId]/tailor`
- `/jobs`
- `/jobs/[jobId]`
- `/applications`
- `/applications/new`
- `/applications/[applicationId]`
- `/account/billing`
- `/admin`
- `/terms`
- `/privacy`
- `/api/auth/sync-user`
- `/ui-smoke-test`

## Components

- `src/components` contains shared React components.
- `src/components/auth` contains authentication UI such as sign-in, sign-up, and sign-out controls.
- `src/components/layout` contains layout wrappers such as marketing and dashboard shells.
- `src/components/onboarding` contains the metadata-backed onboarding form.
- `src/components/resumes` contains resume presentation components such as the read-only preview.
- `src/components/ui` contains shadcn/ui components owned by the project.

## Lib

- `src/lib` contains shared utilities and configuration helpers.
- `src/lib/constants` contains app-level constants.
- `src/lib/env` contains environment variable validation and integration status helpers.
- `src/lib/resumes` contains resume domain validation schemas, default content helpers, and parsing utilities for `resumes.content_json`.
- `src/lib/utils.ts` contains shared utility functions such as `cn`.

## Server

`src/server` contains server-oriented integration modules and future server-only domain code.

- `src/server/supabase` contains browser, server, and admin Supabase client helpers.
- `src/server/supabase/middleware.ts` contains the internal Supabase session refresh helper used by `src/proxy.ts`.
- `src/server/auth` contains safe redirect helpers, route protection helpers, reusable session utilities, and placeholder admin utilities for future server pages, actions, and route handlers.
- `src/server/db` contains the Drizzle ORM foundation.
- `src/server/db/client.ts` exposes a lazy server-side Drizzle client.
- `src/server/db/schema/index.ts` is the central Drizzle schema export file for core application tables and enums.
- `src/server/db/migrations` is reserved for generated Drizzle migration files.
- `src/server/users` contains server-side user helpers, including Supabase Auth to app database sync.
- `src/server/resumes` contains server-side resume database helpers. The current service enforces `userId` ownership on every resume query; resume UI, server actions, and API routes are still deferred.
- `src/app/api/auth/sync-user/route.ts` is the protected route handler that syncs the current authenticated user into the app database.

## Types

`src/types` contains shared TypeScript types.

- `src/types/resume.ts` defines the shared resume content shape used by the Resume Builder MVP.

## Docs

Current docs:

- `docs/product-brief.md`
- `docs/technical-architecture.md`
- `docs/database-schema.md`
- `docs/database-development.md`
- `docs/database-qa-checklist.md`
- `docs/security-plan.md`
- `docs/environment-variables.md`
- `docs/auth-qa-checklist.md`
- `docs/local-development.md`
- `docs/codex-workflow.md`
- `docs/project-structure.md`

## Public Assets

`public` contains static assets served directly by Next.js.

## Future Structure

Future server folders may include:

```txt
src/server/ai
src/server/billing
src/server/applications
src/server/jobs
```

These folders should remain implementation-specific and server-only as integrations are added.
