# Local Development

## Prerequisites

- Node.js
- npm
- Git

## Setup

Install dependencies and create a local environment file:

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` only with local development values. Do not commit real secrets.

## Environment Variables

Environment variables are documented in [environment-variables.md](environment-variables.md).

Most future integration variables are optional for now because Supabase, Stripe, AI, Inngest, and Sentry are not fully implemented yet.

## Supabase Auth Local Setup

When testing Supabase Auth locally, configure the Supabase project redirect URLs to include:

```txt
http://localhost:3000/auth/callback
```

If Next.js starts on another port, add that callback URL too, for example:

```txt
http://localhost:3001/auth/callback
```

The production redirect URL should later use the deployed app domain:

```txt
https://your-domain.com/auth/callback
```

The auth callback, sign-out route handler, and sign-up form exist, but the sign-in form is not implemented yet.

## Testing Sign-Up Locally

1. Create a Supabase project.
2. Add Supabase values to `.env.local`.
3. Add the local callback URL in Supabase Auth settings:

```txt
http://localhost:3000/auth/callback
```

4. Run the app:

```bash
npm run dev
```

5. Visit:

```txt
http://localhost:3000/sign-up
```

6. Create an account.

If email confirmation is enabled, confirm the email before signing in. Do not commit `.env.local` or real Supabase secrets.

## Running the App

```bash
npm run dev
```

The app usually runs at:

```txt
http://localhost:3000
```

If port `3000` is already in use, Next.js may choose another available port.

## Validation Commands

Run these before committing:

```bash
npm run typecheck
npm run lint
npm run build
npm run check
```

`npm run check` runs typecheck, lint, and build in sequence. This is the recommended command before committing.

## Troubleshooting

Port `3000` already in use:

- Stop the process using that port, or use the alternate port shown by Next.js.

Missing `.env.local`:

- Run `cp .env.example .env.local`.
- Leave future integration variables empty until those integrations are implemented.

Build warnings:

- Read the warning carefully and confirm whether it is from local environment setup or app code.

ESLint failures:

- Fix the reported file and rule before committing.

TypeScript failures:

- Fix type errors before committing. Avoid bypassing types unless the ticket explicitly calls for it.

Turbopack local port binding issue:

- In sandboxed environments, Turbopack may fail while creating an internal process or binding to a local port.
- If this happens, rerun the build locally outside the sandbox.

CI failures:

- Reproduce CI locally with `npm run check`.
- If dependency installation fails in CI, run `npm install` locally and commit the updated `package-lock.json`.
- Never commit `.env.local` or any real secret file.
- Production secrets should be configured in the deployment platform settings, not committed.

## Before Committing

```bash
git status
npm run check
```

Then commit manually:

```bash
git add .
git commit -m "your commit message"
```
