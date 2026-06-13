export function getSafeRedirectPath(
  value: string | null,
  fallback: string,
): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;

  return value;
}

export function createSignInRedirectUrl(origin: string, nextPath: string) {
  const url = new URL("/sign-in", origin);
  url.searchParams.set("next", getSafeRedirectPath(nextPath, "/dashboard"));

  return url;
}
