import { SignInForm } from "@/components/auth/sign-in-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageShell } from "@/components/layout/page-shell";
import { APP_ROUTES } from "@/lib/constants/app";
import { getSafeRedirectPath } from "@/server/auth/redirects";

type SignInPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
    next?: string | string[];
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
    case "auth_unconfigured":
      return "Authentication is not configured yet. Add Supabase environment variables to continue.";
    default:
      return undefined;
  }
}

function getSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialMessage = getSafeCallbackErrorMessage(
    resolvedSearchParams?.error,
  );
  const redirectTo = getSafeRedirectPath(
    getSearchParamValue(resolvedSearchParams?.next) ?? null,
    APP_ROUTES.dashboard,
  );

  return (
    <MarketingShell>
      <PageShell
        eyebrow="Sign in"
        title="Sign in"
        description="Access your resumes, job applications, saved jobs, and billing settings."
      >
        <SignInForm initialMessage={initialMessage} redirectTo={redirectTo} />
      </PageShell>
    </MarketingShell>
  );
}
