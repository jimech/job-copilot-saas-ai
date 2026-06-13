export const protectedRoutePrefixes = [
  "/onboarding",
  "/dashboard",
  "/resumes",
  "/jobs",
  "/applications",
  "/account",
  "/admin",
] as const;

export const authRoutePrefixes = ["/sign-in", "/sign-up"] as const;

export function isProtectedRoute(pathname: string) {
  return protectedRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthRoute(pathname: string) {
  return authRoutePrefixes.some((prefix) => pathname === prefix);
}
