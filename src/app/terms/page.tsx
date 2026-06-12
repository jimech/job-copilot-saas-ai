import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function TermsPage() {
  return (
    <MarketingShell>
      <PageShell
        eyebrow="Legal"
        title="Terms"
        description="This placeholder is not legal advice and must be reviewed before launch."
      />
    </MarketingShell>
  );
}
