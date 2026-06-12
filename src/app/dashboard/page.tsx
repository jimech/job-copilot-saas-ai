import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Dashboard"
        title="Dashboard"
        description="View resume activity, job applications, deadlines, and AI credits."
      />
    </DashboardShell>
  );
}
