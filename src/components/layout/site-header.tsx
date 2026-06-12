import Link from "next/link";
import { APP_NAME, APP_ROUTES } from "@/lib/constants/app";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href={APP_ROUTES.home}
          className="text-sm font-semibold tracking-tight text-foreground sm:text-base"
        >
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-muted-foreground sm:gap-5">
          <Link className="transition-colors hover:text-foreground" href={APP_ROUTES.pricing}>
            Pricing
          </Link>
          <Link className="transition-colors hover:text-foreground" href={APP_ROUTES.signIn}>
            Sign in
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary/90"
            href={APP_ROUTES.signUp}
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
