import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function TailorResumePage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Tailor Resume"
        description="Paste a job description and generate tailored resume suggestions."
      />
    </DashboardShell>
  );
}
