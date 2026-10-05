import { describe, expect, it } from "vitest";
import { buildAuthCallbackUrl, buildNextUrl, getSafeRedirectPath } from "@/src/lib/redirects";
import { ROUTES } from "@/src/constant/routes";

const ORIGIN = "https://app.example.com";

describe("getSafeRedirectPath", () => {
  it("allows same-site relative paths", () => {
    expect(getSafeRedirectPath("/dashboard/invoices")).toBe("/dashboard/invoices");
  });

  it("blocks protocol-relative and absolute URLs", () => {
    expect(getSafeRedirectPath("//evil.com")).toBe(ROUTES.dashboard);
    expect(getSafeRedirectPath("https://evil.com")).toBe(ROUTES.dashboard);
    expect(getSafeRedirectPath(null, "/login")).toBe("/login");
  });
});

describe("buildNextUrl", () => {
  it("keeps the action parameter", () => {
    const params = new URLSearchParams({ next: "/dashboard/invoices/new", action: "save_pending" });
    expect(buildNextUrl(params, ORIGIN)).toBe("/dashboard/invoices/new?action=save_pending");
  });

  it("falls back to the dashboard for unsafe targets", () => {
    expect(buildNextUrl(new URLSearchParams({ next: "//evil.com" }), ORIGIN)).toBe(ROUTES.dashboard);
  });
});

describe("buildAuthCallbackUrl", () => {
  it("points at the auth callback with a safe next path", () => {
    const url = new URL(buildAuthCallbackUrl(new URLSearchParams({ next: "/dashboard/billing" }), ORIGIN));
    expect(url.origin + url.pathname).toBe(`${ORIGIN}${ROUTES.authCallback}`);
    expect(url.searchParams.get("next")).toBe("/dashboard/billing");
    expect(url.searchParams.has("action")).toBe(false);
  });
});
