import type { ResumeContent } from "@/types/resume";

import { createDefaultResumeContent } from "./default-resume";
import { resumeContentSchema } from "./resume-schema";

export function parseResumeContent(value: unknown): ResumeContent {
  const parsed = resumeContentSchema.safeParse(value);

  if (parsed.success) {
    return parsed.data;
  }

  return createDefaultResumeContent();
}

export function validateResumeContent(value: unknown) {
  return resumeContentSchema.safeParse(value);
}

export function normalizeStringList(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}
