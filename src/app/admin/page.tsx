import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function AdminPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Admin"
        title="Admin"
        description="Manage users, jobs, subscriptions, AI usage, and operational settings."
      />
    </DashboardShell>
  );
}
