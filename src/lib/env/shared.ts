import { z } from "zod";

export const emptyStringToUndefined = (value: unknown) =>
  value === "" ? undefined : value;

export const optionalString = z.preprocess(
  emptyStringToUndefined,
  z.string().optional(),
);

export const optionalUrl = z.preprocess(
  emptyStringToUndefined,
  z.string().url().optional(),
);

export type IntegrationStatus = {
  supabase: boolean;
  stripe: boolean;
  ai: boolean;
  inngest: boolean;
  sentry: boolean;
};
