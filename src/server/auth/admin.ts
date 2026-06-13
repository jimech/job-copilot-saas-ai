import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/lib/constants/app";
import { requireUser } from "@/server/auth/session";

export function isAdminUser(user: User | null | undefined) {
  return user?.app_metadata?.role === "admin";
}

export async function requireAdmin() {
  const user = await requireUser({ nextPath: APP_ROUTES.admin });

  if (isAdminUser(user)) {
    return user;
  }

  redirect(APP_ROUTES.dashboard);
}
