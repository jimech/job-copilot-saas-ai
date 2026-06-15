"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { normalizeStringList } from "@/lib/resumes";
import { requireUser } from "@/server/auth";
import {
  deleteResumeForUser,
  getResumeForUser,
  updateResumeForUser,
} from "@/server/resumes";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function updateResumeBasicsAction(
  resumeId: string,
  formData: FormData,
) {
  const user = await requireUser();
  const resume = await getResumeForUser({
    userId: user.id,
    resumeId,
  });

  if (!resume) {
    notFound();
  }

  const title = getFormString(formData, "title") || "Untitled Resume";
  const skills = normalizeStringList(
    getFormString(formData, "skills").split(","),
  );

  const content = {
    ...resume.content,
    basics: {
      ...resume.content.basics,
      fullName: getFormString(formData, "fullName"),
      email: getFormString(formData, "email"),
      phone: getFormString(formData, "phone"),
      location: getFormString(formData, "location"),
      website: getFormString(formData, "website"),
      linkedin: getFormString(formData, "linkedin"),
      github: getFormString(formData, "github"),
      summary: getFormString(formData, "summary"),
    },
    skills,
  };

  const updatedResume = await updateResumeForUser({
    userId: user.id,
    resumeId,
    title,
    content,
  });

  if (!updatedResume) {
    notFound();
  }

  revalidatePath("/resumes");
  revalidatePath(`/resumes/${resumeId}`);
  redirect(`/resumes/${resumeId}?saved=1`);
}

export async function deleteResumeAction(resumeId: string, formData: FormData) {
  const user = await requireUser();
  const confirmDelete = getFormString(formData, "confirmDelete");

  if (confirmDelete !== "yes") {
    redirect(`/resumes/${resumeId}?deleteError=confirm`);
  }

  const deleted = await deleteResumeForUser({
    userId: user.id,
    resumeId,
  });

  if (!deleted) {
    notFound();
  }

  revalidatePath("/resumes");
  redirect("/resumes?deleted=1");
}
