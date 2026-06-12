import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function PreviewResumePage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Preview Resume"
        description="Preview your resume before exporting it as a PDF."
      />
    </DashboardShell>
  );
}
