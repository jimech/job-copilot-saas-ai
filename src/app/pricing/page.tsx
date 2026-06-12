import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function PricingPage() {
  return (
    <MarketingShell>
      <PageShell
        eyebrow="Pricing"
        title="Pricing"
        description="Choose a plan with the resume, tracking, and AI credits you need."
      />
    </MarketingShell>
  );
}
