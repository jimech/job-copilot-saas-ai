import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";
import { APP_ROUTES } from "@/lib/constants/app";
import { requireUser } from "@/server/auth";

function getStringMetadataValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getTargetRolesMetadataValue(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value.filter((role) => typeof role === "string").join(", ");
}

export default async function OnboardingPage() {
  const user = await requireUser({ nextPath: APP_ROUTES.onboarding });
  const metadata = user.user_metadata;

  return (
    <DashboardShell>
      <PageShell
        eyebrow="Onboarding"
        title="Set up your profile"
        description="Tell us about your goals so we can personalize resumes, applications, and job recommendations."
      >
        <OnboardingForm
          initialValues={{
            fullName: getStringMetadataValue(metadata.full_name),
            country: getStringMetadataValue(metadata.country),
            preferredLanguage: getStringMetadataValue(
              metadata.preferred_language,
              "en",
            ),
            targetRoles: getTargetRolesMetadataValue(metadata.target_roles),
            experienceLevel: getStringMetadataValue(metadata.experience_level),
          }}
        />
      </PageShell>
    </DashboardShell>
  );
}
