import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function CreateResumePage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Create Resume"
        description="Start a new resume from scratch or prepare to import an existing file."
      />
    </DashboardShell>
  );
}
