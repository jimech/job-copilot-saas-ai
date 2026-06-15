import Link from "next/link";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireUser } from "@/server/auth";
import { listResumesForUser } from "@/server/resumes";

import { createResumeAction } from "./actions";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

type ResumesPageProps = {
  searchParams: Promise<{
    deleted?: string;
  }>;
};

export default async function ResumesPage({ searchParams }: ResumesPageProps) {
  const query = await searchParams;
  const user = await requireUser();
  const resumes = await listResumesForUser(user.id);

  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Resumes"
        description="Review the resumes saved to your account. Create, edit, export, and tailoring flows are coming next."
      >
        {query.deleted === "1" ? (
          <p className="mb-6 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground">
            Resume deleted.
          </p>
        ) : null}

        <form
          action={createResumeAction}
          className="mb-6 rounded-lg border border-border bg-background p-4"
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="grid gap-2">
              <Label htmlFor="title">Resume title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Software Engineer Resume"
                maxLength={200}
              />
            </div>
            <Button type="submit">Create resume</Button>
          </div>
        </form>

        {resumes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6">
            <h2 className="text-lg font-semibold tracking-tight">
              No resumes yet
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use the form above to create your first resume.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {resumes.map((resume) => (
              <article
                key={resume.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold tracking-tight">
                      {resume.title}
                    </h2>
                    <dl className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      <div>
                        <dt className="font-medium text-foreground">
                          Last updated
                        </dt>
                        <dd>{formatDate(resume.updatedAt)}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-foreground">
                          Created
                        </dt>
                        <dd>{formatDate(resume.createdAt)}</dd>
                      </div>
                    </dl>
                  </div>
                  <Button asChild className="w-fit" variant="outline">
                    <Link href={`/resumes/${resume.id}`}>Open editor</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </PageShell>
    </DashboardShell>
  );
}
