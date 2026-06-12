import { MarketingShell } from "@/components/layout/marketing-shell";
import { APP_DESCRIPTION, APP_NAME, APP_ROUTES } from "@/lib/constants/app";

const features = [
  {
    title: "AI Resume Builder",
    description: "Create and tailor resumes for specific jobs.",
  },
  {
    title: "Application Assistant",
    description:
      "Generate cover letters, recruiter messages, and application answers.",
  },
  {
    title: "Job Tracker",
    description: "Save jobs, track statuses, deadlines, and follow-ups.",
  },
];

export default function Home() {
  return (
    <MarketingShell>
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {APP_NAME}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {APP_DESCRIPTION}
          </p>
          <a
            className="mt-10 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href={APP_ROUTES.signUp}
          >
            Get started
          </a>
        </div>
        <div className="mt-16 grid w-full gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-border bg-background p-6 text-left shadow-sm"
            >
              <h2 className="text-base font-semibold text-foreground">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
