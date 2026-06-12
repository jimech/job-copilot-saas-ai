import { MarketingShell } from "@/components/layout/marketing-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Button asChild className="mt-10" size="lg">
            <a href={APP_ROUTES.signUp}>Get started</a>
          </Button>
        </div>
        <div className="mt-16 grid w-full gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-left">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
