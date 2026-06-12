import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function JobDetailsPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Jobs"
        title="Job Details"
        description="Review a saved job and start tailoring a resume for this opportunity."
      />
    </DashboardShell>
  );
}
