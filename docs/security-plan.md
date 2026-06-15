# Security Plan

## 1. Security Overview

User data must be private by default. Users must only access their own data, and admin access must be restricted to explicitly authorized operators. Server-side checks are required for protected actions, even when the UI already hides protected functionality.

Payment webhooks must be verified before they update billing or credit state. Uploaded resume files must not be public. AI outputs must assist the user without fabricating experience, credentials, or application claims. Secrets must never be exposed to the browser.

## 2. Authentication

The MVP should use Supabase Auth with email/password authentication. Authenticated routes must be protected, and unauthenticated users must be redirected to sign in.

Server-side user checks are required for protected actions. Client-side checks are useful for navigation and user experience, but they are not enough for security.

Supabase Auth users are synced into the app database after successful auth callback and onboarding sync. The protected sync route uses the server session user and does not accept user IDs from the client.

Use [Database QA Checklist](database-qa-checklist.md) to verify database sync and RLS behavior.

Protected routes:

- `/dashboard`
- `/onboarding`
- `/resumes`
- `/jobs`
- `/applications`
- `/account/billing`
- `/admin`

## 3. Authorization

Role types:

| Role | Access |
|---|---|
| anonymous | Marketing pages, pricing, sign in, sign up |
| user | Own resumes, jobs, applications, documents, billing |
| admin | Admin dashboard, global jobs, user overview, AI usage |

Rules:

- Regular users cannot access admin routes.
- Regular users cannot read another user's rows.
- Regular users cannot modify global/admin jobs unless explicitly allowed.
- Admin checks must happen server-side.
- Never trust role information sent from the browser.
- Never trust user IDs sent from the browser for auth/database sync.

## 4. Row Level Security Plan

Supabase RLS must be enabled for user-owned tables.

Status: the initial RLS policy migration has been applied to Supabase. Admin bypass policies and storage policies are not implemented yet.

Tables requiring user isolation:

- `profiles`
- `subscriptions`
- `resumes`
- `resume_documents`
- `applications`
- `generated_documents`
- `ai_generations`
- `document_embeddings`

Required policy behavior:

- User can select own rows.
- User can insert own rows.
- User can update own rows.
- User can delete own rows where deletion is allowed.
- Admins can access admin-only data through server-side routes only.

Special case for jobs:

- `jobs` can contain global/admin jobs and user-saved jobs.
- Authenticated users may read global jobs.
- Users may manage their own manually saved jobs.
- Users must not modify global/admin jobs.

Initial policy model:

- `users` policies use `auth.uid() = id`.
- User-owned tables use `auth.uid() = user_id`.
- `jobs` allows authenticated users to read global jobs where `user_id is null` and manage only their own jobs.
- `subscriptions` are read-only to regular users.
- `ai_generations` are select/insert only for regular users.

## 5. Storage Security

Use Supabase Storage for uploaded resumes, parsed source documents, generated exports, and other user-owned files. Resume upload buckets must be private. Public buckets must not be used for resumes.

File paths should include the user ID, and users can only access files they own. Signed URLs may be used for temporary access when the browser needs to preview or download a private file. Storage policies must mirror database ownership rules.

Example path format:

```txt
resumes/{userId}/{documentId}/original.pdf
exports/{userId}/{resumeId}/resume.pdf
```

## 6. API Route Security

Every protected API route must verify the authenticated user. API routes must never trust client-provided `user_id`; they must use the server session user ID.

All inputs should be validated with a schema validation library before use. API routes should return safe error messages, avoid leaking stack traces to users, and log security-relevant failures without exposing secrets. Expensive AI routes should be rate-limited later.

Authorization must be checked before reading or mutating records.

Protected API areas:

- Resume CRUD.
- Resume upload.
- AI generation.
- Application tracker.
- Job saving.
- Billing session creation.
- Admin actions.

## 7. Stripe Security

Stripe webhook signatures must be verified. The webhook route must use the raw request body so signature verification works correctly.

Never trust client-side subscription status. Local subscription state should update only from verified Stripe events. The Stripe secret key must only be used server-side, and the webhook secret must be an environment variable.

Webhook events to handle:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

## 8. AI Security and Safety

AI must assist, not fabricate. AI must not invent employers, dates, degrees, certifications, work authorization, or achievements.

AI suggestions must be reviewed by the user before saving. Original resume content should remain visible when suggesting changes so users can compare source content with AI-proposed edits.

Prompts and outputs should be logged in `ai_generations`. Sensitive data should not be sent to unnecessary third-party services. AI credit checks must happen before expensive AI calls. AI outputs must be validated before being saved as structured data. Failed AI generations should not charge credits unless intentionally documented otherwise.

## 9. Environment Variables and Secrets

Client-safe variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Server-only variables:

- `DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `SENTRY_DSN`

Rules:

- Never expose server-only secrets to the browser.
- Never commit `.env` files.
- Provide `.env.example`.
- Rotate secrets if leaked.
- Use separate development and production secrets.
- Only `NEXT_PUBLIC_` variables may be intentionally exposed to the browser.

## 10. Data Privacy

Resumes are sensitive personal data. User documents must be private. Users should be able to delete resumes, uploaded documents, and generated documents.

Future account deletion should remove or anonymize user data. Admin views should show only what is needed for support and operations. The app should avoid storing unnecessary personal data and must not sell user resume or application data.

## 11. Monitoring and Incident Response

Sentry should monitor:

- API errors.
- Auth errors.
- Stripe webhook errors.
- AI generation errors.
- Resume parsing errors.
- File upload failures.
- Permission/RLS errors.

Incident response basics:

- Identify affected users.
- Disable compromised keys.
- Patch the issue.
- Review logs.
- Notify users if required.
- Add tests or checks to prevent recurrence.

## 12. Launch Security Checklist

- [ ] RLS enabled on all user-owned tables.
- [ ] Storage buckets are private.
- [ ] Storage policies are tested.
- [ ] Service role key is server-only.
- [ ] Stripe webhook signature verification works.
- [ ] Admin routes are protected.
- [ ] AI routes enforce credits.
- [ ] Inputs are validated.
- [ ] Sentry is enabled.
- [ ] `.env.example` exists.
- [ ] No secrets are committed.
- [ ] Users cannot access other users' resumes.
- [ ] Users cannot access other users' uploaded files.
- [ ] Users cannot access other users' applications.
- [ ] Global jobs cannot be modified by regular users.
