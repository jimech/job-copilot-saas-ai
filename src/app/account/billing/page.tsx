import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function BillingPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Account"
        title="Billing"
        description="Manage your subscription plan, AI credits, and billing settings."
      />
    </DashboardShell>
  );
}
