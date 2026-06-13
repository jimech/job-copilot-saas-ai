# Database Schema Plan

## 1. Database Overview

The app uses Supabase Postgres as the primary relational database. Drizzle ORM now defines the core schema tables in TypeScript, and later tickets will generate migrations and provide typed database access from server-side application code.

Most user-owned tables include a `user_id` column so data can be scoped to the authenticated user. User data must be isolated by default, and Supabase Row Level Security will be used to enforce ownership rules at the database layer. Server-side authorization checks should also be used before reading or mutating protected records.

pgvector will be used later for embeddings that support resume, job, application, and profile similarity search. UUID primary keys should be used across tables. Most tables should include `created_at` and `updated_at` timestamps where appropriate.

Current implementation status:

- Core Drizzle schema tables exist in `src/server/db/schema/index.ts`.
- Migrations have not been generated yet.
- RLS policies have not been added yet.
- `document_embeddings` and pgvector are intentionally deferred to a later ticket.

## 2. Tables

### users

Purpose: Stores app user basics linked to Supabase Auth.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. Same as Supabase Auth user id. |
| email | text | Unique, required. |
| full_name | text | Optional. |
| country | text | Optional. |
| preferred_language | text | Default en. |
| target_roles | text[] | Optional. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

Notes:

- Do not store passwords.
- Supabase Auth manages credentials.

### profiles

Purpose: Stores richer profile information used by resumes and AI.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| headline | text | Optional. |
| summary | text | Optional. |
| phone | text | Optional. |
| location | text | Optional. |
| website | text | Optional. |
| linkedin_url | text | Optional. |
| github_url | text | Optional. |
| portfolio_url | text | Optional. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

### subscriptions

Purpose: Stores Stripe subscription state and AI credits.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| stripe_customer_id | text | Optional until checkout. |
| stripe_subscription_id | text | Optional. |
| plan | text | free, pro, premium. |
| status | text | active, trialing, canceled, past_due, incomplete. |
| ai_credits_remaining | integer | Default 0. |
| renews_at | timestamptz | Optional. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

Notes:

- Stripe is the source of truth for paid status.
- Local table is used for app access control.
- AI credits are deducted after successful AI generations.

### resumes

Purpose: Stores structured resumes.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| title | text | Required. |
| base_resume_id | uuid | Optional self-reference for tailored versions. |
| language | text | Default en. |
| template_id | text | Default classic. |
| content_json | jsonb | Required structured resume data. |
| ats_score | integer | Optional. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

Expected resume JSON shape:

```ts
type ResumeContent = {
  basics: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary?: string;
  };
  experience: Array<{
    company: string;
    role: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    bullets: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field?: string;
    startDate?: string;
    endDate?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description?: string;
    bullets: string[];
    technologies?: string[];
    url?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer?: string;
    date?: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
};
```

Notes:

- Tailored resumes should create new rows.
- `base_resume_id` links tailored versions to the original.

### resume_documents

Purpose: Stores uploaded resume file metadata and parsed text.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| resume_id | uuid | Optional FK to resumes.id. |
| file_url | text | Supabase Storage path or URL. |
| file_type | text | pdf or docx. |
| parsed_text | text | Extracted text. |
| parsing_status | text | pending, processing, completed, failed. |
| error_message | text | Optional parsing error summary. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

### jobs

Purpose: Stores job opportunities.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | Optional. Null means global/admin job. |
| source | text | manual, admin, linkedin, indeed, glassdoor, company, api. |
| source_url | text | Optional. |
| company | text | Required. |
| title | text | Required. |
| location | text | Optional. |
| employment_type | text | Optional. |
| salary_min | integer | Optional. |
| salary_max | integer | Optional. |
| currency | text | Optional. |
| description | text | Optional. |
| posted_at | timestamptz | Optional. |
| discovered_at | timestamptz | Default now. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

Notes:

- `user_id` null means global/admin job.
- `user_id` set means user-saved job.

### applications

Purpose: Tracks user job applications.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| job_id | uuid | FK to jobs.id. |
| resume_id | uuid | Optional FK to resumes.id. |
| status | text | saved, applied, interviewing, offer, rejected, archived. |
| priority | text | low, medium, high. |
| deadline_at | timestamptz | Optional. |
| applied_at | timestamptz | Optional. |
| notes | text | Optional. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

### generated_documents

Purpose: Stores generated cover letters, recruiter messages, and application answers.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| application_id | uuid | Optional FK to applications.id. |
| resume_id | uuid | Optional FK to resumes.id. |
| type | text | cover_letter, recruiter_message, application_answer. |
| title | text | Optional. |
| content | text | Required. |
| created_at | timestamptz | Default now. |
| updated_at | timestamptz | Default now. |

### ai_generations

Purpose: Stores AI requests, outputs, model info, and estimated cost.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| type | text | resume_parse, resume_tailor, cover_letter, answer, ats_score, job_extract, keyword_gap. |
| input_json | jsonb | Request data. |
| output_json | jsonb | Response data. |
| model | text | Model used. |
| token_count | integer | Optional estimate. |
| cost_cents | integer | Optional estimate. |
| credits_charged | integer | Credits charged for the action. |
| created_at | timestamptz | Default now. |

### document_embeddings

Purpose: Stores vector embeddings for resumes, jobs, applications, and profile chunks.

Implementation status: intentionally deferred. This table requires pgvector setup and should be added in a separate pgvector ticket.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key. |
| user_id | uuid | FK to users.id. |
| entity_type | text | resume, job, application, profile. |
| entity_id | uuid | ID of related entity. |
| chunk_text | text | Text chunk embedded. |
| embedding | vector | pgvector embedding. |
| created_at | timestamptz | Default now. |

## 3. Relationships

- One user has one profile.
- One user has many resumes.
- One user has many resume documents.
- One user has one active subscription.
- One user has many applications.
- One job can be linked to many applications.
- One application can have many generated documents.
- One resume can have many tailored versions through `base_resume_id`.
- One user has many AI generations.
- Embeddings belong to users and reference entities.

## 4. Indexes

Recommended indexes:

- `users.email`
- `profiles.user_id`
- `subscriptions.user_id`
- `subscriptions.stripe_customer_id`
- `subscriptions.stripe_subscription_id`
- `resumes.user_id`
- `resumes.base_resume_id`
- `resume_documents.user_id`
- `resume_documents.resume_id`
- `jobs.user_id`
- `jobs.source`
- `jobs.company`
- `jobs.title`
- `applications.user_id`
- `applications.status`
- `applications.deadline_at`
- `generated_documents.user_id`
- `generated_documents.application_id`
- `ai_generations.user_id`
- `ai_generations.type`
- `document_embeddings.user_id`
- `document_embeddings.entity_type`
- Vector similarity index for `document_embeddings.embedding`.

## 5. RLS Ownership Summary

User-owned rows must include `user_id`. Users can select, insert, update, and delete only their own rows. Deletion policies should still respect product rules, retention requirements, and any future soft deletion strategy.

Global/admin jobs may be readable by authenticated users. User-saved jobs may only be managed by the owner. Admin operations require an admin role and should be performed through trusted server-side routes.

Service role access must only happen server-side. The service role key must never be exposed to client components, browser code, or public environment variables.

## 6. Future Notes

- Add organizations later for teams/coaches.
- Add audit logs later if needed.
- Add ATS integrations later for enterprise.
- Add localization tables later if multilingual content grows.
- Add soft deletion if legal/data recovery requirements need it.
