import Link from "next/link";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Separator } from "@/components/ui/separator";
import { APP_ROUTES } from "@/lib/constants/app";
import { getCurrentUser } from "@/server/auth";

const dashboardLinks = [
  { href: APP_ROUTES.dashboard, label: "Dashboard" },
  { href: APP_ROUTES.resumes, label: "Resumes" },
  { href: APP_ROUTES.jobs, label: "Jobs" },
  { href: APP_ROUTES.applications, label: "Applications" },
  { href: APP_ROUTES.billing, label: "Billing" },
];

type DashboardShellProps = {
  children: React.ReactNode;
};

export async function DashboardShell({ children }: DashboardShellProps) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto grid min-h-screen max-w-7xl md:grid-cols-[240px_1fr]">
        <aside className="flex flex-col border-b border-border bg-background px-6 py-5 md:border-b-0 md:border-r">
          <Link
            href={APP_ROUTES.dashboard}
            className="font-semibold tracking-tight"
          >
            Job Copilot
          </Link>
          <Separator className="mt-5" />
          <nav className="mt-6 flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            {dashboardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 md:mt-auto">
            {user?.email ? (
              <p className="break-words text-xs leading-5 text-muted-foreground">
                Signed in as {user.email}
              </p>
            ) : null}
            <SignOutButton className="w-full [&_button]:w-full" />
          </div>
        </aside>
        <main className="bg-background">{children}</main>
      </div>
    </div>
  );
}
