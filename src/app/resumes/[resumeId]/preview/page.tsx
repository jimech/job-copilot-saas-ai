import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";
import { ResumePreview } from "@/components/resumes/resume-preview";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants/app";
import { requireUser } from "@/server/auth";
import { getResumeForUser } from "@/server/resumes";

type ResumePreviewPageProps = {
  params: Promise<{
    resumeId: string;
  }>;
};

export default async function PreviewResumePage({
  params,
}: ResumePreviewPageProps) {
  const { resumeId } = await params;
  const user = await requireUser();
  const resume = await getResumeForUser({
    userId: user.id,
    resumeId,
  });

  if (!resume) {
    notFound();
  }

  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Preview Resume"
        description="Review the formatted resume content saved to your account."
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline">
            <Link href={`/resumes/${resume.id}`}>Back to editor</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={APP_ROUTES.resumes}>All resumes</Link>
          </Button>
        </div>
        <ResumePreview content={resume.content} title={resume.title} />
      </PageShell>
    </DashboardShell>
  );
}
