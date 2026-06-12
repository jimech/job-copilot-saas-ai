import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function ApplicationsPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Applications"
        title="Applications"
        description="Track saved, applied, interviewing, offer, rejected, and archived applications."
      />
    </DashboardShell>
  );
}
