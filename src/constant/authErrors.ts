/**
 * Friendly messages for Supabase Auth error codes.
 * See https://supabase.com/docs/guides/auth/debugging/error-codes
 */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Email or password is incorrect.",
  email_not_confirmed: "Please confirm your email first. Check your inbox (and spam folder) for the link.",
  user_already_exists: "An account with this email already exists. Please sign in instead.",
  email_exists: "An account with this email already exists. Please sign in instead.",
  weak_password: "This password is too weak. Use at least 8 characters with letters and numbers.",
  over_email_send_rate_limit: "Too many emails were sent recently. Please wait a few minutes and try again.",
  over_request_rate_limit: "Too many attempts. Please wait a minute and try again.",
  email_address_not_authorized:
    "We can't send a confirmation email to this address yet. Please contact support.",
  email_address_invalid: "Please enter a valid email address.",
  signup_disabled: "New sign-ups are currently disabled.",
  email_provider_disabled: "Email sign-up is currently disabled.",
  provider_disabled: "This sign-in method isn't enabled yet. Please use email and password.",
  otp_expired: "This link has expired or was already used. Please request a new one.",
  flow_state_not_found: "This link has expired or was already used. Please request a new one.",
  bad_code_verifier: "Please open the link in the same browser you used to request it.",
  pkce_code_verifier_not_found: "Please open the link in the same browser you used to request it.",
  same_password: "Your new password must be different from the old one.",
  session_not_found: "Your session has expired. Please sign in again.",
  unexpected_failure: "We couldn't complete that request right now. Please try again in a moment.",
};

/** Fallback patterns for errors that arrive without a code (older servers, network failures). */
export const AUTH_ERROR_PATTERNS: { pattern: RegExp; code: string }[] = [
  { pattern: /invalid login credentials/i, code: "invalid_credentials" },
  { pattern: /email not confirmed/i, code: "email_not_confirmed" },
  { pattern: /already registered/i, code: "user_already_exists" },
  { pattern: /rate limit/i, code: "over_email_send_rate_limit" },
  { pattern: /provider is not enabled|unsupported provider/i, code: "provider_disabled" },
  { pattern: /database error/i, code: "unexpected_failure" },
  { pattern: /code verifier/i, code: "bad_code_verifier" },
  { pattern: /link is invalid or has expired|otp.*expired|invalid flow state/i, code: "otp_expired" },
];

/** Codes meaning an email link was opened in a different browser than the one that requested it. */
export const MISSING_CODE_VERIFIER_CODES = ["bad_code_verifier", "pkce_code_verifier_not_found"];

export const AUTH_NETWORK_ERROR = "Can't reach the sign-in service. Check your connection and try again.";
export const AUTH_NOT_CONFIGURED_ERROR =
  "Sign-in isn't configured on this site yet. Please try again later or contact support.";
export const AUTH_NETWORK_PATTERN = /failed to fetch|fetch failed|networkerror|load failed/i;
export const AUTH_MISSING_CONFIG_PATTERN = /url and (api )?key are required/i;
