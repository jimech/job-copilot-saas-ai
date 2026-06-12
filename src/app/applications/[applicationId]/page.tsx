import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function ApplicationDetailsPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Applications"
        title="Application Details"
        description="Review application status, notes, deadlines, linked resume, and generated documents."
      />
    </DashboardShell>
  );
}
