import { ROUTES } from "@/src/constant/routes";

/** Allow only same-site relative paths (blocks open redirects like //evil.com). */
export function getSafeRedirectPath(
  value: string | null | undefined,
  fallback: string = ROUTES.dashboard,
): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

/** `next` path plus the optional `action` query param, e.g. "/dashboard/invoices/new?action=save_pending". */
export function buildNextUrl(params: URLSearchParams, origin: string): string {
  const target = new URL(getSafeRedirectPath(params.get("next")), origin);
  const action = params.get("action");
  if (action) target.searchParams.set("action", action);
  return target.pathname + target.search;
}

/** OAuth / email-link callback that returns the user to `next` afterwards. */
export function buildAuthCallbackUrl(params: URLSearchParams, origin: string): string {
  const query = new URLSearchParams({ next: getSafeRedirectPath(params.get("next")) });
  const action = params.get("action");
  if (action) query.set("action", action);
  return `${origin}${ROUTES.authCallback}?${query}`;
}

/**
 * Supabase sends users to the Site URL when a redirect URL isn't allow-listed, so an
 * auth `code` or `token_hash` can land on any page. Returns the route that handles it.
 */
export function getStrayAuthLinkTarget(url: URL): string | null {
  const { pathname, searchParams } = url;
  if (pathname.startsWith("/auth/")) return null;
  if (searchParams.has("code")) return `${ROUTES.authCallback}?${searchParams}`;
  if (searchParams.has("token_hash") && searchParams.has("type")) {
    return `${ROUTES.authConfirm}?${searchParams}`;
  }
  const description = searchParams.get("error_description");
  return description ? `${ROUTES.authError}?error=${encodeURIComponent(description)}` : null;
}

/** Login page that tells the user their email is confirmed and keeps the `next` target. */
export function buildVerifiedLoginUrl(params: URLSearchParams): string {
  const query = new URLSearchParams({ verified: "true" });
  const next = params.get("next");
  if (next) query.set("next", getSafeRedirectPath(next));
  return `${ROUTES.login}?${query}`;
}
