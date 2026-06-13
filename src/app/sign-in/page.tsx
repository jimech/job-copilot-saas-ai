import { SignInForm } from "@/components/auth/sign-in-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageShell } from "@/components/layout/page-shell";

type SignInPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

function getSafeCallbackErrorMessage(error: string | string[] | undefined) {
  const value = Array.isArray(error) ? error[0] : error;

  switch (value) {
    case "missing_callback_code":
      return "The sign-in link is missing required information. Please try again.";
    case "auth_callback_failed":
      return "We could not complete sign-in. Please try again.";
    case "auth_callback_unavailable":
      return "Authentication is temporarily unavailable. Please try again later.";
    default:
      return undefined;
  }
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialMessage = getSafeCallbackErrorMessage(
    resolvedSearchParams?.error,
  );

  return (
    <MarketingShell>
      <PageShell
        eyebrow="Sign in"
        title="Sign in"
        description="Access your resumes, job applications, saved jobs, and billing settings."
      >
        <SignInForm initialMessage={initialMessage} />
      </PageShell>
    </MarketingShell>
  );
}
