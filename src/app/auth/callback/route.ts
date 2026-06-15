import { NextResponse, type NextRequest } from "next/server";

import { APP_ROUTES } from "@/lib/constants/app";
import { getSafeRedirectPath } from "@/server/auth/redirects";
import { createServerSupabaseClient } from "@/server/supabase/server";
import { syncAuthUserToDatabase } from "@/server/users/sync-user";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeRedirectPath(
    requestUrl.searchParams.get("next"),
    APP_ROUTES.dashboard,
  );

  if (!code) {
    return NextResponse.redirect(
      new URL(
        `${APP_ROUTES.signIn}?error=missing_callback_code`,
        requestUrl.origin,
      ),
    );
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        new URL(
          `${APP_ROUTES.signIn}?error=auth_callback_failed`,
          requestUrl.origin,
        ),
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(
        new URL(`${APP_ROUTES.signIn}?error=user_sync_failed`, requestUrl.origin),
      );
    }

    try {
      await syncAuthUserToDatabase(user);
    } catch {
      return NextResponse.redirect(
        new URL(`${APP_ROUTES.signIn}?error=user_sync_failed`, requestUrl.origin),
      );
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin));
  } catch {
    return NextResponse.redirect(
      new URL(
        `${APP_ROUTES.signIn}?error=auth_callback_unavailable`,
        requestUrl.origin,
      ),
    );
  }
}
