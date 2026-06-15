# Database QA Checklist

## Purpose

Use this checklist to verify the Phase 4 database foundation for AI Resume and Job Application Copilot. It covers Drizzle migrations, Supabase Postgres tables, RLS policies, and Supabase Auth user sync into the app database.

## Required Local Environment

`.env.local` should contain:

```env
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- `DATABASE_URL` should use the Supabase Session Pooler URI when direct IPv6 database connections are unavailable.
- Do not commit `.env.local`.
- Do not print or expose database credentials.
- Restart the dev server after changing environment variables.

## Database Foundation Status

Complete:

- Drizzle foundation exists.
- Core schema exists.
- Initial migration applied.
- RLS migration applied.
- Auth users sync to app database.
- `users`, `profiles`, and `subscriptions` are created or ensured after auth/onboarding.

Not complete yet:

- Resume builder database features.
- Job database features.
- Application tracker database features.
- Billing/Stripe persistence.
- AI generation persistence from real AI calls.
- Storage buckets and storage policies.
- pgvector and `document_embeddings`.
- Admin enforcement.

## Manual QA Checklist

- [ ] Run `npm run check`.
- [ ] Start local app.
- [ ] Sign up with a test user.
- [ ] Complete onboarding.
- [ ] Confirm redirect to `/dashboard`.
- [ ] Confirm user row exists in `users`.
- [ ] Confirm profile row exists in `profiles`.
- [ ] Confirm subscription row exists in `subscriptions`.
- [ ] Confirm no `.env.local` file is staged.

## Supabase Verification Checklist

- [ ] Open Supabase Table Editor.
- [ ] Confirm `users` table exists.
- [ ] Confirm `profiles` table exists.
- [ ] Confirm `subscriptions` table exists.
- [ ] Confirm `resumes` table exists.
- [ ] Confirm `resume_documents` table exists.
- [ ] Confirm `jobs` table exists.
- [ ] Confirm `applications` table exists.
- [ ] Confirm `generated_documents` table exists.
- [ ] Confirm `ai_generations` table exists.
- [ ] Confirm Drizzle migration tracking table exists.

## RLS Verification Checklist

- [ ] RLS is enabled on `users`.
- [ ] RLS is enabled on `profiles`.
- [ ] RLS is enabled on `subscriptions`.
- [ ] RLS is enabled on `resumes`.
- [ ] RLS is enabled on `resume_documents`.
- [ ] RLS is enabled on `jobs`.
- [ ] RLS is enabled on `applications`.
- [ ] RLS is enabled on `generated_documents`.
- [ ] RLS is enabled on `ai_generations`.
- [ ] `users` policies use `auth.uid() = id`.
- [ ] User-owned table policies use `auth.uid() = user_id`.
- [ ] `jobs` supports global jobs and user-owned jobs.
- [ ] `subscriptions` are read-only for regular users.
- [ ] `ai_generations` are select/insert only for regular users.
- [ ] No anonymous broad policies exist.

## Auth User Sync Checklist

- [ ] Auth callback calls user sync after successful session exchange.
- [ ] Onboarding calls protected sync route after metadata save.
- [ ] Sync route does not accept user ID from client.
- [ ] Sync upserts `users`.
- [ ] Sync ensures `profiles`.
- [ ] Sync ensures `subscriptions`.
- [ ] Sync can run multiple times safely.

## Troubleshooting

### DATABASE_URL connection fails

- Verify the database password.
- Use the Supabase Session Pooler URI if direct connection fails.
- Make sure the database project ref matches the Supabase Auth project ref.
- URL-encode special password characters.

### RLS blocks expected data

- Confirm the user is authenticated.
- Confirm the row has the correct `user_id`.
- Confirm `users.id` matches the Supabase Auth user ID.
- Confirm the expected policy exists.

### User sync does not create rows

- Check auth callback behavior.
- Check the onboarding sync route.
- Check server logs.
- Confirm the database migration and RLS migration were applied.
- Confirm `DATABASE_URL` exists.

## Known Limitations

- No database-backed resume UI yet.
- No database-backed jobs UI yet.
- No database-backed application tracker yet.
- No storage buckets yet.
- No pgvector embeddings yet.
- No Stripe billing sync yet.
- No AI generation persistence from real AI calls yet.
- No admin bypass policies yet.
- No seed data yet.

## Phase 4 Completion Checklist

- [ ] Drizzle foundation exists.
- [ ] Core schema exists.
- [ ] Initial migration generated.
- [ ] Initial migration applied.
- [ ] RLS migration created.
- [ ] RLS migration applied.
- [ ] Auth user sync exists.
- [ ] Auth user sync manually tested.
- [ ] Database QA checklist exists.
