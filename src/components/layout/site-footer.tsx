import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { APP_DESCRIPTION, APP_NAME, APP_ROUTES } from "@/lib/constants/app";

export function SiteFooter() {
  return (
    <footer className="bg-muted">
      <Separator />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="font-semibold text-foreground">{APP_NAME}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {APP_DESCRIPTION}
          </p>
        </div>
        <nav className="flex gap-5 text-sm font-medium text-muted-foreground">
          <Link className="transition-colors hover:text-foreground" href={APP_ROUTES.pricing}>
            Pricing
          </Link>
          <Link className="transition-colors hover:text-foreground" href={APP_ROUTES.terms}>
            Terms
          </Link>
          <Link className="transition-colors hover:text-foreground" href={APP_ROUTES.privacy}>
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
