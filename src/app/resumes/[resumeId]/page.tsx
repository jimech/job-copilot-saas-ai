import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { APP_ROUTES } from "@/lib/constants/app";
import { requireUser } from "@/server/auth";
import { getResumeForUser } from "@/server/resumes";

import { deleteResumeAction, updateResumeBasicsAction } from "./actions";

type ResumeEditorPageProps = {
  params: Promise<{
    resumeId: string;
  }>;
  searchParams: Promise<{
    saved?: string;
    deleteError?: string;
  }>;
};

export default async function ResumeEditorPage({
  params,
  searchParams,
}: ResumeEditorPageProps) {
  const [{ resumeId }, query] = await Promise.all([params, searchParams]);
  const user = await requireUser();
  const resume = await getResumeForUser({
    userId: user.id,
    resumeId,
  });

  if (!resume) {
    notFound();
  }

  const updateResume = updateResumeBasicsAction.bind(null, resume.id);
  const deleteResume = deleteResumeAction.bind(null, resume.id);
  const basics = resume.content.basics;

  return (
    <DashboardShell>
      <PageShell
        eyebrow="Resume Editor"
        title={resume.title}
        description="Edit resume settings, basic contact information, professional summary, and skills."
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link href={APP_ROUTES.resumes}>Back to resumes</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/resumes/${resume.id}/preview`}>Preview resume</Link>
            </Button>
          </div>
          {query.saved === "1" ? (
            <p className="rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground">
              Resume saved.
            </p>
          ) : null}
        </div>

        <form action={updateResume} className="flex flex-col gap-8">
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Resume Settings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Name this resume so it is easy to recognize later.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Resume title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={resume.title}
                maxLength={200}
                required
              />
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep contact details accurate and ready for recruiters.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={basics.fullName}
                  maxLength={160}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={basics.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={basics.phone}
                  maxLength={80}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={basics.location}
                  maxLength={160}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={basics.website}
                  maxLength={300}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  defaultValue={basics.linkedin}
                  maxLength={300}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  defaultValue={basics.github}
                  maxLength={300}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Professional Summary
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Summarize the value you bring to a role.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                defaultValue={basics.summary}
                maxLength={1200}
                rows={6}
              />
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Separate skills with commas.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                defaultValue={resume.content.skills.join(", ")}
                maxLength={1000}
                rows={4}
              />
            </div>
          </section>

          <div className="flex justify-end border-t border-border pt-6">
            <Button type="submit">Save resume</Button>
          </div>
        </form>

        <section className="mt-10 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Danger zone
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Delete this resume permanently from your account.
            </p>
          </div>
          {query.deleteError === "confirm" ? (
            <p className="mt-4 rounded-lg border border-destructive/30 bg-background px-3 py-2 text-sm font-medium text-destructive">
              Please confirm before deleting this resume.
            </p>
          ) : null}
          <form action={deleteResume} className="mt-4 flex flex-col gap-4">
            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                className="mt-1 size-4 rounded border-border"
                name="confirmDelete"
                type="checkbox"
                value="yes"
              />
              <span>
                I understand this will permanently delete this resume.
              </span>
            </label>
            <div>
              <Button type="submit" variant="destructive">
                Delete resume
              </Button>
            </div>
          </form>
        </section>
      </PageShell>
    </DashboardShell>
  );
}
