import { z } from "zod";

const optionalString = (maxLength: number) =>
  z.string().max(maxLength).optional();

const requiredString = (maxLength: number) =>
  z.string().trim().min(1).max(maxLength);

const bulletSchema = z.string().max(500);

const draftEmailSchema = z.union([z.literal(""), z.email()]);

export const resumeBasicsSchema = z.object({
  fullName: z.string().max(160),
  email: draftEmailSchema,
  phone: optionalString(80),
  location: optionalString(160),
  website: optionalString(300),
  linkedin: optionalString(300),
  github: optionalString(300),
  summary: optionalString(1200),
});

export const resumeExperienceSchema = z.object({
  id: requiredString(200),
  company: requiredString(160),
  role: requiredString(160),
  location: optionalString(160),
  startDate: requiredString(80),
  endDate: optionalString(80),
  current: z.boolean().optional(),
  bullets: z.array(bulletSchema).max(12),
});

export const resumeEducationSchema = z.object({
  id: requiredString(200),
  institution: requiredString(200),
  degree: requiredString(200),
  field: optionalString(200),
  startDate: optionalString(80),
  endDate: optionalString(80),
});

export const resumeProjectSchema = z.object({
  id: requiredString(200),
  name: requiredString(200),
  description: optionalString(600),
  bullets: z.array(bulletSchema).max(12),
  technologies: z.array(z.string()).default([]),
  url: optionalString(300),
});

export const resumeCertificationSchema = z.object({
  id: requiredString(200),
  name: requiredString(200),
  issuer: optionalString(200),
  date: optionalString(80),
});

export const resumeLanguageSchema = z.object({
  id: requiredString(200),
  language: requiredString(120),
  proficiency: requiredString(120),
});

export const resumeContentSchema = z.object({
  basics: resumeBasicsSchema,
  experience: z.array(resumeExperienceSchema).default([]),
  education: z.array(resumeEducationSchema).default([]),
  skills: z.array(z.string().max(80)).max(100),
  projects: z.array(resumeProjectSchema).default([]),
  certifications: z.array(resumeCertificationSchema).default([]),
  languages: z.array(resumeLanguageSchema).default([]),
});

export type ResumeContentInput = z.infer<typeof resumeContentSchema>;
