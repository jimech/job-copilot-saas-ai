# Project Structure

## Root Files

- `package.json` defines npm scripts and dependencies.
- `package-lock.json` locks npm dependency versions.
- `next.config.ts` contains Next.js configuration.
- `tsconfig.json` contains TypeScript configuration and path aliases.
- `eslint.config.mjs` contains ESLint configuration.
- `postcss.config.mjs` contains PostCSS configuration for Tailwind.
- `components.json` configures shadcn/ui.
- `.env.example` lists expected environment variables without real secrets.

## App Directory

`src/app` contains Next.js App Router pages and route segments.

Important routes currently present:

- `/`
- `/pricing`
- `/sign-in`
- `/sign-up`
- `/onboarding`
- `/dashboard`
- `/resumes`
- `/resumes/new`
- `/resumes/[resumeId]/edit`
- `/resumes/[resumeId]/preview`
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
- `/ui-smoke-test`

## Components

- `src/components` contains shared React components.
- `src/components/layout` contains layout wrappers such as marketing and dashboard shells.
- `src/components/ui` contains shadcn/ui components owned by the project.

## Lib

- `src/lib` contains shared utilities and configuration helpers.
- `src/lib/constants` contains app-level constants.
- `src/lib/env` contains environment variable validation and integration status helpers.
- `src/lib/utils.ts` contains shared utility functions such as `cn`.

## Server

`src/server` contains server-oriented integration modules and future server-only domain code.

- `src/server/supabase` contains browser, server, and admin Supabase client helpers.

## Types

`src/types` is reserved for shared TypeScript types.

## Docs

Current docs:

- `docs/product-brief.md`
- `docs/technical-architecture.md`
- `docs/database-schema.md`
- `docs/security-plan.md`
- `docs/environment-variables.md`
- `docs/local-development.md`
- `docs/codex-workflow.md`
- `docs/project-structure.md`

## Public Assets

`public` contains static assets served directly by Next.js.

## Future Structure

Future server folders may include:

```txt
src/server/auth
src/server/db
src/server/supabase
src/server/ai
src/server/billing
src/server/resumes
src/server/applications
src/server/jobs
```

These folders should remain implementation-specific and server-only as integrations are added.
