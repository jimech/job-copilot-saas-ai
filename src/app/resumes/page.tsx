import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/server/auth";
import { listResumesForUser } from "@/server/resumes";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export default async function ResumesPage() {
  const user = await requireUser();
  const resumes = await listResumesForUser(user.id);

  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resumes"
        title="Resumes"
        description="Review the resumes saved to your account. Create, edit, export, and tailoring flows are coming next."
      >
        {resumes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6">
            <h2 className="text-lg font-semibold tracking-tight">
              No resumes yet
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Create your first resume in the next step.
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
                  <Badge className="w-fit" variant="secondary">
                    Editor coming soon
                  </Badge>
                </div>
              </article>
            ))}
          </div>
        )}
      </PageShell>
    </DashboardShell>
  );
}
