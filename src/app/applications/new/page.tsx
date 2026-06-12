import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function CreateApplicationPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Applications"
        title="Create Application"
        description="Add a job application manually and connect it to a resume."
      />
    </DashboardShell>
  );
}
