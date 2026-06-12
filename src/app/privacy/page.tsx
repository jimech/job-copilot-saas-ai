import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <PageShell
        eyebrow="Legal"
        title="Privacy"
        description="This placeholder is not legal advice and must be reviewed before launch."
      />
    </MarketingShell>
  );
}
