import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function JobsPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Jobs"
        title="Job Opportunities"
        description="Discover, save, and organize job opportunities from manual entries and approved sources."
      />
    </DashboardShell>
  );
}
