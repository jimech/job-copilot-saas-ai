export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          AI Resume and Job Application Copilot
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
          Create tailored resumes, generate application materials, track
          applications, and discover job opportunities.
        </p>
        <a
          className="mt-10 inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          href="/sign-up"
        >
          Get started
        </a>
      </section>
    </main>
  );
}
