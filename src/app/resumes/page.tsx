import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function ResumesPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Resumes"
        description="Create, edit, tailor, duplicate, and export your resumes."
      />
    </DashboardShell>
  );
}
