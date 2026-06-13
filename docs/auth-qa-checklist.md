# Auth QA Checklist

## Purpose

This checklist documents how to manually test the Phase 3 authentication foundation for AI Resume and Job Application Copilot. Use it after changing Supabase Auth, route protection, the session refresh proxy, onboarding, or navigation.

## Required Local Environment

`.env.local` should contain local development values like:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3003
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- You may use another local port if needed.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` may contain the Supabase publishable key value.
- Do not commit `.env.local` or any real secrets.
- Restart the dev server after changing environment variables.

## Supabase Dashboard Setup

1. Go to the Supabase project dashboard.
2. Open Authentication settings.
3. Set Site URL to the current local app URL, for example:

```txt
http://localhost:3003
```

4. Add redirect URLs:

```txt
http://localhost:3000/auth/callback
http://localhost:3001/auth/callback
http://localhost:3002/auth/callback
http://localhost:3003/auth/callback
```

5. Later production redirect URL will be:

```txt
https://your-domain.com/auth/callback
```

6. Email confirmation may be enabled or disabled depending on testing needs.

## Local App Setup

```bash
npm install
npm run dev -- -p 3003
```

If port `3003` is busy, use another port and update:

- `.env.local`
- Supabase Site URL
- Supabase Redirect URLs

## Manual QA Checklist

### Public pages

- [ ] `/` renders while signed out.
- [ ] `/pricing` renders while signed out.
- [ ] `/sign-in` renders while signed out.
- [ ] `/sign-up` renders while signed out.
- [ ] `/terms` renders while signed out.
- [ ] `/privacy` renders while signed out.

### Sign up

- [ ] `/sign-up` shows email, password, and confirm password fields.
- [ ] Invalid email is rejected.
- [ ] Password shorter than 8 characters is rejected.
- [ ] Mismatched passwords are rejected.
- [ ] Valid sign-up calls Supabase.
- [ ] If email confirmation is enabled, the check-email message appears.
- [ ] If immediate session is returned, user redirects to `/onboarding`.

### Auth callback

- [ ] `/auth/callback` without code redirects to `/sign-in?error=missing_callback_code`.
- [ ] Email confirmation link returns through `/auth/callback`.
- [ ] Valid callback redirects to `/onboarding` or `/dashboard`.

### Sign in

- [ ] `/sign-in` shows email and password fields.
- [ ] Invalid email is rejected.
- [ ] Empty password is rejected.
- [ ] Invalid credentials show a safe error.
- [ ] Valid credentials redirect to `/dashboard`.
- [ ] `/sign-in?next=/resumes` redirects to `/resumes` after login.
- [ ] Unsafe external `next` values are ignored.

### Protected routes

- [ ] Signed-out `/dashboard` redirects to `/sign-in?next=/dashboard`.
- [ ] Signed-out `/resumes` redirects to `/sign-in?next=/resumes`.
- [ ] Signed-out `/jobs` redirects to `/sign-in?next=/jobs`.
- [ ] Signed-out `/applications` redirects to `/sign-in?next=/applications`.
- [ ] Signed-out `/account/billing` redirects to `/sign-in?next=/account/billing`.
- [ ] Signed-out `/admin` redirects to `/sign-in?next=/admin`.

### Signed-in behavior

- [ ] Signed-in `/dashboard` renders.
- [ ] Signed-in `/sign-in` redirects to `/dashboard`.
- [ ] Signed-in `/sign-up` redirects to `/dashboard`.
- [ ] Header shows app navigation.
- [ ] Dashboard shell shows app navigation.

### Onboarding

- [ ] Signed-out `/onboarding` redirects to `/sign-in?next=/onboarding`.
- [ ] Signed-in `/onboarding` renders form.
- [ ] Required fields validate.
- [ ] Metadata saves through `supabase.auth.updateUser`.
- [ ] Successful save redirects to `/dashboard`.
- [ ] User metadata includes `onboarding_completed: true`.

### Sign out

- [ ] Sign out button submits POST to `/auth/sign-out`.
- [ ] User is redirected to `/sign-in`.
- [ ] Protected routes redirect again after sign-out.

### Missing config behavior

- [ ] App builds without Supabase env vars.
- [ ] Public pages render without Supabase env vars.
- [ ] Protected routes redirect to `/sign-in?error=auth_unconfigured` when Supabase config is missing.

## Expected Route Behavior

| Route | Signed Out | Signed In |
|---|---|---|
| `/` | Public | Public |
| `/pricing` | Public | Public |
| `/sign-in` | Public | Redirect to `/dashboard` |
| `/sign-up` | Public | Redirect to `/dashboard` |
| `/onboarding` | Redirect to sign in | Form |
| `/dashboard` | Redirect to sign in | App page |
| `/resumes` | Redirect to sign in | App page |
| `/jobs` | Redirect to sign in | App page |
| `/applications` | Redirect to sign in | App page |
| `/account/billing` | Redirect to sign in | App page |
| `/admin` | Redirect to sign in | App page for now |

`/admin` is only authentication-protected for now. Admin role enforcement comes later.

## Troubleshooting

### Env vars not loaded

- Restart the dev server.
- Check `.env.local`.
- Run `git status` and confirm `.env.local` is not tracked.

### Redirect URL error

- Add the current local callback URL to Supabase Auth redirect settings.
- Ensure Site URL matches the current local app URL.

### Email confirmation not received

- Check spam.
- Check Supabase Auth email settings.
- Temporarily disable email confirmation for local testing if needed.

### Port already in use

Use:

```bash
npm run dev -- -p 3003
```

or another available port.

### Build warning or Turbopack sandbox issue

The project has previously seen Turbopack internal port-binding issues inside restricted sandbox environments, but builds pass locally outside that environment.

## Known Limitations

- No database `users` or `profiles` table yet.
- Onboarding currently saves to Supabase Auth user metadata.
- No admin role enforcement yet.
- No password reset yet.
- No OAuth providers yet.
- No billing yet.
- No resume/job/application data persistence yet.
- No AI features yet.
- No storage uploads yet.

## Phase 3 Completion Checklist

- [ ] Supabase client foundation exists.
- [ ] Auth callback route exists.
- [ ] Sign-out route exists.
- [ ] Sign-up page works.
- [ ] Sign-in page works.
- [ ] Proxy refreshes Supabase sessions.
- [ ] App routes are protected.
- [ ] Auth session utilities exist.
- [ ] Onboarding form saves metadata.
- [ ] Navigation is auth-aware.
- [ ] Sign-out UI uses POST.
- [ ] Auth QA checklist exists.
