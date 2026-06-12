import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function OnboardingPage() {
  return (
    <DashboardShell>
      <PageShell
        eyebrow="Onboarding"
        title="Onboarding"
        description="Tell us about your target roles, country, language, and resume goals."
      />
    </DashboardShell>
  );
}
