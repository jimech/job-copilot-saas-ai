# Environment Variables

This project validates environment variables with `zod` so configuration mistakes are caught early while keeping browser-safe values separate from server-only secrets.

## Public Variables

Public variables live in `src/lib/env/client.ts`. Only `NEXT_PUBLIC_` variables may be read by client-side code.

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Server-Only Variables

Server-only variables live in `src/lib/env/server.ts`. Do not import this file into Client Components.

- `DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `SENTRY_DSN`

## Local Setup

Copy the example file and fill in values as needed:

```bash
cp .env.example .env.local
```

Do not commit real secrets. `.env.local` and other real environment files are ignored by git.

## Optional For Now

Supabase, Stripe, AI provider, Inngest, and Sentry variables are optional until those integrations are implemented. Empty optional values are treated as not configured.

## Supabase

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

- `NEXT_PUBLIC_SUPABASE_URL` is client-safe and points to the Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is client-safe, but all client access must still rely on Supabase Row Level Security.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only, bypasses RLS, and must never be exposed to the browser.
- `DATABASE_URL` is server-only and will be used later by Drizzle ORM and database tooling.

These variables are optional during foundation-only development. They are required before real authentication, database, storage, or admin Supabase features can work.

Supabase session refresh middleware uses the public Supabase URL and anon key to keep auth cookies synchronized for server-rendered routes. Without those public variables, the middleware skips Supabase and lets the app render. Route protection is not implemented yet.

### Supabase Auth Redirect URLs

Configure Supabase Auth redirect URLs to include the local callback route:

```txt
http://localhost:3000/auth/callback
```

If local development runs on another port, add that callback URL too, for example:

```txt
http://localhost:3001/auth/callback
```

The production callback URL should later use the deployed domain:

```txt
https://your-domain.com/auth/callback
```

## Required Later

Future implementation phases should make the relevant variables required when their integrations are added, such as Supabase credentials for auth/storage, Stripe keys for billing, AI provider keys for generation, Inngest keys for background jobs, and Sentry DSN for monitoring.
