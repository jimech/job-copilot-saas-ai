import Link from "next/link";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_ROUTES } from "@/lib/constants/app";
import { getCurrentUser } from "@/server/auth";

const signedInLinks = [
  { href: APP_ROUTES.dashboard, label: "Dashboard" },
  { href: APP_ROUTES.resumes, label: "Resumes" },
  { href: APP_ROUTES.jobs, label: "Jobs" },
  { href: APP_ROUTES.applications, label: "Applications" },
  { href: APP_ROUTES.billing, label: "Billing" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-border bg-background/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href={APP_ROUTES.home}
          className="text-sm font-semibold tracking-tight text-foreground sm:text-base"
        >
          {APP_NAME}
        </Link>
        {user ? (
          <nav className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium text-muted-foreground sm:gap-5">
            {signedInLinks.map((link) => (
              <Link
                className="transition-colors hover:text-foreground"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <SignOutButton />
          </nav>
        ) : (
          <nav className="flex items-center gap-3 text-sm font-medium text-muted-foreground sm:gap-5">
            <Link
              className="transition-colors hover:text-foreground"
              href={APP_ROUTES.pricing}
            >
              Pricing
            </Link>
            <Link
              className="transition-colors hover:text-foreground"
              href={APP_ROUTES.signIn}
            >
              Sign in
            </Link>
            <Button asChild>
              <Link href={APP_ROUTES.signUp}>Get started</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
