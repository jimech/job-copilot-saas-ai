import { NextResponse, type NextRequest } from "next/server";

import { APP_ROUTES } from "@/lib/constants/app";
import { getSafeRedirectPath } from "@/server/auth/redirects";
import { createServerSupabaseClient } from "@/server/supabase/server";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = getSafeRedirectPath(
    requestUrl.searchParams.get("next"),
    APP_ROUTES.signIn,
  );

  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  } catch {
    // Supabase may be unconfigured during foundation-only local development.
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin), {
    status: 303,
  });
}
