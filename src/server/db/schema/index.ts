import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const planEnum = pgEnum("plan", ["free", "pro", "premium"]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "trialing",
  "canceled",
  "past_due",
  "incomplete",
]);

export const resumeDocumentFileTypeEnum = pgEnum("resume_document_file_type", [
  "pdf",
  "docx",
]);

export const parsingStatusEnum = pgEnum("parsing_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

export const jobSourceEnum = pgEnum("job_source", [
  "manual",
  "admin",
  "linkedin",
  "indeed",
  "glassdoor",
  "company",
  "api",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
  "archived",
]);

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const generatedDocumentTypeEnum = pgEnum("generated_document_type", [
  "cover_letter",
  "recruiter_message",
  "application_answer",
]);

export const aiGenerationTypeEnum = pgEnum("ai_generation_type", [
  "resume_parse",
  "resume_tailor",
  "cover_letter",
  "answer",
  "ats_score",
  "job_extract",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    email: text("email").notNull(),
    fullName: text("full_name"),
    country: text("country"),
    preferredLanguage: text("preferred_language").default("en").notNull(),
    targetRoles: text("target_roles").array(),
    ...timestamps,
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    headline: text("headline"),
    summary: text("summary"),
    phone: text("phone"),
    location: text("location"),
    website: text("website"),
    linkedinUrl: text("linkedin_url"),
    githubUrl: text("github_url"),
    portfolioUrl: text("portfolio_url"),
    ...timestamps,
  },
  (table) => [
    index("profiles_user_id_idx").on(table.userId),
    uniqueIndex("profiles_user_id_unique").on(table.userId),
  ],
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    plan: planEnum("plan").default("free").notNull(),
    status: subscriptionStatusEnum("status").default("incomplete").notNull(),
    aiCreditsRemaining: integer("ai_credits_remaining").default(0).notNull(),
    renewsAt: timestamp("renews_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    index("subscriptions_user_id_idx").on(table.userId),
    uniqueIndex("subscriptions_user_id_unique").on(table.userId),
    index("subscriptions_stripe_customer_id_idx").on(table.stripeCustomerId),
    index("subscriptions_stripe_subscription_id_idx").on(
      table.stripeSubscriptionId,
    ),
  ],
);

export const resumes = pgTable(
  "resumes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    baseResumeId: uuid("base_resume_id").references(
      (): AnyPgColumn => resumes.id,
      { onDelete: "set null" },
    ),
    language: text("language").default("en").notNull(),
    templateId: text("template_id").default("classic").notNull(),
    contentJson: jsonb("content_json").notNull(),
    atsScore: integer("ats_score"),
    ...timestamps,
  },
  (table) => [
    index("resumes_user_id_idx").on(table.userId),
    index("resumes_base_resume_id_idx").on(table.baseResumeId),
  ],
);

export const resumeDocuments = pgTable(
  "resume_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    resumeId: uuid("resume_id").references(() => resumes.id, {
      onDelete: "set null",
    }),
    fileUrl: text("file_url").notNull(),
    fileType: resumeDocumentFileTypeEnum("file_type").notNull(),
    parsedText: text("parsed_text"),
    parsingStatus: parsingStatusEnum("parsing_status")
      .default("pending")
      .notNull(),
    ...timestamps,
  },
  (table) => [
    index("resume_documents_user_id_idx").on(table.userId),
    index("resume_documents_resume_id_idx").on(table.resumeId),
    index("resume_documents_parsing_status_idx").on(table.parsingStatus),
  ],
);

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    source: jobSourceEnum("source").default("manual").notNull(),
    sourceUrl: text("source_url"),
    company: text("company").notNull(),
    title: text("title").notNull(),
    location: text("location"),
    employmentType: text("employment_type"),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    currency: text("currency"),
    description: text("description"),
    postedAt: timestamp("posted_at", { withTimezone: true }),
    discoveredAt: timestamp("discovered_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    ...timestamps,
  },
  (table) => [
    index("jobs_user_id_idx").on(table.userId),
    index("jobs_source_idx").on(table.source),
    index("jobs_company_idx").on(table.company),
    index("jobs_title_idx").on(table.title),
    index("jobs_discovered_at_idx").on(table.discoveredAt),
  ],
);

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id),
    resumeId: uuid("resume_id").references(() => resumes.id, {
      onDelete: "set null",
    }),
    status: applicationStatusEnum("status").default("saved").notNull(),
    priority: priorityEnum("priority").default("medium").notNull(),
    deadlineAt: timestamp("deadline_at", { withTimezone: true }),
    appliedAt: timestamp("applied_at", { withTimezone: true }),
    notes: text("notes"),
    ...timestamps,
  },
  (table) => [
    index("applications_user_id_idx").on(table.userId),
    index("applications_job_id_idx").on(table.jobId),
    index("applications_resume_id_idx").on(table.resumeId),
    index("applications_status_idx").on(table.status),
    index("applications_deadline_at_idx").on(table.deadlineAt),
  ],
);

export const generatedDocuments = pgTable(
  "generated_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    applicationId: uuid("application_id").references(() => applications.id, {
      onDelete: "set null",
    }),
    resumeId: uuid("resume_id").references(() => resumes.id, {
      onDelete: "set null",
    }),
    type: generatedDocumentTypeEnum("type").notNull(),
    title: text("title"),
    content: text("content").notNull(),
    ...timestamps,
  },
  (table) => [
    index("generated_documents_user_id_idx").on(table.userId),
    index("generated_documents_application_id_idx").on(table.applicationId),
    index("generated_documents_resume_id_idx").on(table.resumeId),
    index("generated_documents_type_idx").on(table.type),
  ],
);

export const aiGenerations = pgTable(
  "ai_generations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: aiGenerationTypeEnum("type").notNull(),
    inputJson: jsonb("input_json"),
    outputJson: jsonb("output_json"),
    model: text("model"),
    tokenCount: integer("token_count"),
    costCents: integer("cost_cents"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("ai_generations_user_id_idx").on(table.userId),
    index("ai_generations_type_idx").on(table.type),
    index("ai_generations_created_at_idx").on(table.createdAt),
  ],
);
