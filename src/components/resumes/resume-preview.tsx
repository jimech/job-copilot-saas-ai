import type { ResumeContent } from "@/types/resume";

type ResumePreviewProps = {
  content: ResumeContent;
  title?: string;
};

function hasText(value?: string) {
  return Boolean(value?.trim());
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) {
    return null;
  }

  return `${startDate || "Present"} - ${endDate || "Present"}`;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-6 first:border-t-0 first:pt-0">
      <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function ResumePreview({ content, title }: ResumePreviewProps) {
  const { basics } = content;
  const contactItems = [
    basics.email,
    basics.phone,
    basics.location,
    basics.website,
    basics.linkedin,
    basics.github,
  ].filter(hasText);

  return (
    <article className="mx-auto max-w-3xl rounded-lg border border-border bg-white p-8 text-slate-950 shadow-sm print:border-0 print:p-0 print:shadow-none">
      <header>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>
        {hasText(basics.fullName) ? (
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {basics.fullName}
          </h1>
        ) : null}
        {contactItems.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
            {contactItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-8 space-y-6">
        {hasText(basics.summary) ? (
          <Section title="Summary">
            <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
              {basics.summary}
            </p>
          </Section>
        ) : null}

        {content.skills.length > 0 ? (
          <Section title="Skills">
            <ul className="flex flex-wrap gap-2">
              {content.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-slate-200 px-2 py-1 text-sm text-slate-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {content.experience.length > 0 ? (
          <Section title="Experience">
            <div className="space-y-5">
              {content.experience.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{item.role}</h3>
                      <p className="text-sm text-slate-600">
                        {[item.company, item.location].filter(hasText).join(" | ")}
                      </p>
                    </div>
                    {formatDateRange(item.startDate, item.endDate) ? (
                      <p className="text-sm text-slate-500">
                        {formatDateRange(item.startDate, item.endDate)}
                      </p>
                    ) : null}
                  </div>
                  {item.bullets.length > 0 ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {content.education.length > 0 ? (
          <Section title="Education">
            <div className="space-y-4">
              {content.education.map((item) => (
                <div key={item.id}>
                  <h3 className="font-semibold">{item.institution}</h3>
                  <p className="text-sm text-slate-700">
                    {[item.degree, item.field].filter(hasText).join(", ")}
                  </p>
                  {formatDateRange(item.startDate, item.endDate) ? (
                    <p className="text-sm text-slate-500">
                      {formatDateRange(item.startDate, item.endDate)}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {content.projects.length > 0 ? (
          <Section title="Projects">
            <div className="space-y-5">
              {content.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold">{project.name}</h3>
                  {hasText(project.description) ? (
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {project.description}
                    </p>
                  ) : null}
                  {project.technologies?.length ? (
                    <p className="mt-1 text-sm text-slate-500">
                      {project.technologies.join(", ")}
                    </p>
                  ) : null}
                  {project.bullets.length > 0 ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                      {project.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {hasText(project.url) ? (
                    <p className="mt-1 text-sm text-slate-500">{project.url}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {content.certifications.length > 0 ? (
          <Section title="Certifications">
            <ul className="space-y-3">
              {content.certifications.map((item) => (
                <li key={item.id}>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-slate-600">
                    {[item.issuer, item.date].filter(hasText).join(" | ")}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {content.languages.length > 0 ? (
          <Section title="Languages">
            <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {content.languages.map((item) => (
                <li key={item.id}>
                  <span className="font-medium">{item.language}</span>
                  {hasText(item.proficiency) ? ` - ${item.proficiency}` : null}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </div>
    </article>
  );
}
