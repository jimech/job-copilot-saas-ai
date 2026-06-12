import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageShell } from "@/components/layout/page-shell";

export default function SignUpPage() {
  return (
    <MarketingShell>
      <PageShell
        eyebrow="Create your account"
        title="Create your account"
        description="Start building tailored resumes and organizing your job search."
      />
    </MarketingShell>
  );
}
