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
