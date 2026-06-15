import { and, desc, eq } from "drizzle-orm";

import {
  createDefaultResumeContent,
  parseResumeContent,
  validateResumeContent,
} from "@/lib/resumes";
import type { ResumeContent } from "@/types/resume";

import { getDb } from "../db/client";
import { resumes } from "../db/schema";

export type ResumeListItem = {
  id: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
};

export type ResumeDetail = ResumeListItem & {
  userId: string;
  baseResumeId: string | null;
  language: string;
  templateId: string;
  content: ResumeContent;
  atsScore: number | null;
};

function assertValidResumeContent(content: ResumeContent) {
  const parsed = validateResumeContent(content);

  if (!parsed.success) {
    throw new Error("Invalid resume content.");
  }

  return parsed.data;
}

function toResumeDetail(row: typeof resumes.$inferSelect): ResumeDetail {
  return {
    id: row.id,
    userId: row.userId,
    title: row.title,
    baseResumeId: row.baseResumeId,
    language: row.language,
    templateId: row.templateId,
    content: parseResumeContent(row.contentJson),
    atsScore: row.atsScore,
    updatedAt: row.updatedAt,
    createdAt: row.createdAt,
  };
}

export async function listResumesForUser(
  userId: string,
): Promise<ResumeListItem[]> {
  const db = getDb();

  return db
    .select({
      id: resumes.id,
      title: resumes.title,
      updatedAt: resumes.updatedAt,
      createdAt: resumes.createdAt,
    })
    .from(resumes)
    .where(eq(resumes.userId, userId))
    .orderBy(desc(resumes.updatedAt));
}

export async function getResumeForUser(params: {
  userId: string;
  resumeId: string;
}): Promise<ResumeDetail | null> {
  const db = getDb();

  const [resume] = await db
    .select()
    .from(resumes)
    .where(
      and(eq(resumes.id, params.resumeId), eq(resumes.userId, params.userId)),
    )
    .limit(1);

  return resume ? toResumeDetail(resume) : null;
}

export async function createResumeForUser(params: {
  userId: string;
  title?: string;
  content?: ResumeContent;
}): Promise<ResumeDetail> {
  const db = getDb();
  const content = assertValidResumeContent(
    params.content ?? createDefaultResumeContent(),
  );

  const [resume] = await db
    .insert(resumes)
    .values({
      userId: params.userId,
      title: params.title?.trim() || "Untitled Resume",
      contentJson: content,
    })
    .returning();

  if (!resume) {
    throw new Error("Failed to create resume.");
  }

  return toResumeDetail(resume);
}

export async function updateResumeForUser(params: {
  userId: string;
  resumeId: string;
  title?: string;
  content?: ResumeContent;
}): Promise<ResumeDetail | null> {
  const db = getDb();
  const values: Partial<typeof resumes.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (params.title !== undefined) {
    values.title = params.title.trim() || "Untitled Resume";
  }

  if (params.content !== undefined) {
    values.contentJson = assertValidResumeContent(params.content);
  }

  const [resume] = await db
    .update(resumes)
    .set(values)
    .where(
      and(eq(resumes.id, params.resumeId), eq(resumes.userId, params.userId)),
    )
    .returning();

  return resume ? toResumeDetail(resume) : null;
}

export async function deleteResumeForUser(params: {
  userId: string;
  resumeId: string;
}): Promise<boolean> {
  const db = getDb();

  const [deletedResume] = await db
    .delete(resumes)
    .where(
      and(eq(resumes.id, params.resumeId), eq(resumes.userId, params.userId)),
    )
    .returning({ id: resumes.id });

  return Boolean(deletedResume);
}
