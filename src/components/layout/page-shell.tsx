type PageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageShell({ eyebrow, title, description }: PageShellProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-4 px-6 py-12">
      {eyebrow ? (
        <p className="text-sm font-medium text-gray-500">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="max-w-2xl text-gray-600">{description}</p>
    </main>
  );
}
