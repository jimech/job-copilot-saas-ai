import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { APP_ROUTES } from "@/lib/constants/app";
import { createSignInRedirectUrl } from "@/server/auth/redirects";
import { isAuthRoute, isProtectedRoute } from "@/server/auth/routes";
import { refreshSession } from "@/server/supabase/middleware";

function copySessionCookies(response: NextResponse, sessionResponse: NextResponse) {
  sessionResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });

  return response;
}

export async function proxy(request: NextRequest) {
  const session = await refreshSession(request);
  const { pathname, search } = request.nextUrl;
  const isProtected = isProtectedRoute(pathname);
  const isAuth = isAuthRoute(pathname);

  if (!session.isConfigured && isProtected) {
    const url = new URL(APP_ROUTES.signIn, request.nextUrl.origin);
    url.searchParams.set("error", "auth_unconfigured");

    return copySessionCookies(NextResponse.redirect(url), session.response);
  }

  if (session.user && isAuth) {
    return copySessionCookies(
      NextResponse.redirect(new URL(APP_ROUTES.dashboard, request.nextUrl.origin)),
      session.response,
    );
  }

  if (!session.user && isProtected) {
    const signInUrl = createSignInRedirectUrl(
      request.nextUrl.origin,
      `${pathname}${search}`,
    );

    return copySessionCookies(NextResponse.redirect(signInUrl), session.response);
  }

  return session.response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
