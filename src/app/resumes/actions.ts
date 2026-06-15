"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/server/auth";
import { createResumeForUser } from "@/server/resumes";

export async function createResumeAction(formData: FormData) {
  const user = await requireUser();
  const rawTitle = formData.get("title");
  const title =
    typeof rawTitle === "string" && rawTitle.trim()
      ? rawTitle.trim()
      : "Untitled Resume";

  const resume = await createResumeForUser({
    userId: user.id,
    title,
  });

  revalidatePath("/resumes");
  redirect(`/resumes/${resume.id}`);
}
