import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function EditResumePage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Edit Resume"
        description="Edit resume sections including basics, experience, education, skills, projects, and certifications."
      />
    </DashboardShell>
  );
}
