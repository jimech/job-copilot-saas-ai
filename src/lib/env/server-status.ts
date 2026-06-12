import { clientEnv } from "./client";
import { serverEnv } from "./server";
import type { IntegrationStatus } from "./shared";

export const isSupabaseConfigured = Boolean(
  clientEnv.NEXT_PUBLIC_SUPABASE_URL &&
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
);

export const isStripeConfigured = Boolean(
  clientEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
    serverEnv.STRIPE_SECRET_KEY &&
    serverEnv.STRIPE_WEBHOOK_SECRET,
);

export const isAiConfigured = Boolean(
  serverEnv.OPENAI_API_KEY || serverEnv.ANTHROPIC_API_KEY,
);

export const isInngestConfigured = Boolean(
  serverEnv.INNGEST_EVENT_KEY && serverEnv.INNGEST_SIGNING_KEY,
);

export const isSentryConfigured = Boolean(serverEnv.SENTRY_DSN);

export const integrationStatus: IntegrationStatus = {
  supabase: isSupabaseConfigured,
  stripe: isStripeConfigured,
  ai: isAiConfigured,
  inngest: isInngestConfigured,
  sentry: isSentryConfigured,
};
