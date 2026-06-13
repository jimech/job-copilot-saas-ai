import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/lib/constants/app";
import { getSafeRedirectPath } from "@/server/auth/redirects";
import { createServerSupabaseClient } from "@/server/supabase/server";

type RequireUserOptions = {
  nextPath?: string;
};

export async function getCurrentUser() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function getCurrentSession() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();

  return user?.id ?? null;
}

export async function requireUser(options: RequireUserOptions = {}) {
  const user = await getCurrentUser();

  if (user) {
    return user;
  }

  if (!options.nextPath) {
    redirect(APP_ROUTES.signIn);
  }

  const params = new URLSearchParams({
    next: getSafeRedirectPath(options.nextPath, APP_ROUTES.dashboard),
  });

  redirect(`${APP_ROUTES.signIn}?${params.toString()}`);
}
