import { describe, expect, it } from "vitest";
import {
  getAuthErrorCode,
  getAuthErrorMessage,
  isEmailNotConfirmedError,
  isMissingCodeVerifierError,
} from "@/src/lib/authErrors";
import {
  AUTH_ERROR_MESSAGES,
  AUTH_NETWORK_ERROR,
  AUTH_NOT_CONFIGURED_ERROR,
} from "@/src/constant/authErrors";

function makeAuthError(message: string, code?: string) {
  return Object.assign(new Error(message), code ? { code } : {});
}

describe("getAuthErrorMessage", () => {
  it("uses the Supabase error code when present", () => {
    const error = makeAuthError("Invalid login credentials", "invalid_credentials");
    expect(getAuthErrorMessage(error)).toBe(AUTH_ERROR_MESSAGES.invalid_credentials);
  });

  it("recognises errors by message when there is no code", () => {
    expect(getAuthErrorMessage(makeAuthError("Database error saving new user"))).toBe(
      AUTH_ERROR_MESSAGES.unexpected_failure,
    );
    expect(getAuthErrorMessage(makeAuthError("Unsupported provider: provider is not enabled"))).toBe(
      AUTH_ERROR_MESSAGES.provider_disabled,
    );
    expect(getAuthErrorMessage("Email link is invalid or has expired")).toBe(AUTH_ERROR_MESSAGES.otp_expired);
  });

  it("explains network failures and missing configuration", () => {
    expect(getAuthErrorMessage(new TypeError("Failed to fetch"))).toBe(AUTH_NETWORK_ERROR);
    const configError = new Error("@supabase/ssr: Your project's URL and API key are required!");
    expect(getAuthErrorMessage(configError)).toBe(AUTH_NOT_CONFIGURED_ERROR);
  });

  it("keeps unknown messages and falls back for empty errors", () => {
    expect(getAuthErrorMessage(makeAuthError("Something odd", "brand_new_code"))).toBe("Something odd");
    expect(getAuthErrorMessage(null, "Fallback")).toBe("Fallback");
  });
});

describe("error classification", () => {
  it("detects unconfirmed emails", () => {
    expect(isEmailNotConfirmedError(makeAuthError("Email not confirmed", "email_not_confirmed"))).toBe(true);
    expect(isEmailNotConfirmedError(makeAuthError("Email not confirmed"))).toBe(true);
    expect(isEmailNotConfirmedError(makeAuthError("Invalid login credentials"))).toBe(false);
  });

  it("detects links opened in another browser", () => {
    const missing = makeAuthError("PKCE code verifier not found in storage.", "pkce_code_verifier_not_found");
    const legacy = makeAuthError("invalid request: both auth code and code verifier should be non-empty");
    expect(isMissingCodeVerifierError(missing)).toBe(true);
    expect(isMissingCodeVerifierError(legacy)).toBe(true);
    expect(getAuthErrorCode(makeAuthError("Invalid login credentials"))).toBe("invalid_credentials");
  });
});
