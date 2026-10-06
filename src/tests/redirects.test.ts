import { describe, expect, it } from "vitest";
import {
  buildAuthCallbackUrl,
  buildNextUrl,
  buildVerifiedLoginUrl,
  getSafeRedirectPath,
  getStrayAuthLinkTarget,
} from "@/src/lib/redirects";
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

describe("getStrayAuthLinkTarget", () => {
  const target = (path: string) => getStrayAuthLinkTarget(new URL(path, ORIGIN));

  it("forwards a code that landed on the home page to the auth callback", () => {
    expect(target("/?code=abc")).toBe(`${ROUTES.authCallback}?code=abc`);
  });

  it("forwards token-hash links to the confirm route", () => {
    expect(target("/?token_hash=t1&type=signup")).toBe(`${ROUTES.authConfirm}?token_hash=t1&type=signup`);
  });

  it("shows auth errors on the error page", () => {
    expect(target("/?error=access_denied&error_description=Email+link+expired")).toBe(
      `${ROUTES.authError}?error=Email%20link%20expired`,
    );
  });

  it("leaves auth routes and normal pages alone", () => {
    expect(target("/auth/callback?code=abc")).toBeNull();
    expect(target("/pricing?plan=pro")).toBeNull();
  });
});

describe("buildVerifiedLoginUrl", () => {
  it("keeps a safe next path", () => {
    expect(buildVerifiedLoginUrl(new URLSearchParams({ next: "/dashboard/billing" }))).toBe(
      `${ROUTES.login}?verified=true&next=%2Fdashboard%2Fbilling`,
    );
    expect(buildVerifiedLoginUrl(new URLSearchParams({ next: "//evil.com" }))).toBe(
      `${ROUTES.login}?verified=true&next=%2Fdashboard`,
    );
  });
});
