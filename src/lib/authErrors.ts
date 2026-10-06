import {
  AUTH_ERROR_MESSAGES,
  AUTH_ERROR_PATTERNS,
  AUTH_MISSING_CONFIG_PATTERN,
  AUTH_NETWORK_ERROR,
  AUTH_NETWORK_PATTERN,
  AUTH_NOT_CONFIGURED_ERROR,
  MISSING_CODE_VERIFIER_CODES,
} from "@/src/constant/authErrors";

function getErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== "object" || !("code" in error)) return undefined;
  return typeof error.code === "string" ? error.code : undefined;
}

function getRawMessage(error: unknown): string {
  return error instanceof Error ? error.message : typeof error === "string" ? error : "";
}

/** Supabase error code, read from `error.code` or recognised from the message. */
export function getAuthErrorCode(error: unknown): string | undefined {
  const code = getErrorCode(error);
  if (code && AUTH_ERROR_MESSAGES[code]) return code;
  const message = getRawMessage(error);
  return AUTH_ERROR_PATTERNS.find(({ pattern }) => pattern.test(message))?.code ?? code;
}

/** A message a user can act on, instead of Supabase's raw wording. */
export function getAuthErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  const message = getRawMessage(error);
  if (AUTH_MISSING_CONFIG_PATTERN.test(message)) return AUTH_NOT_CONFIGURED_ERROR;
  if (AUTH_NETWORK_PATTERN.test(message)) return AUTH_NETWORK_ERROR;

  const code = getAuthErrorCode(error);
  return (code && AUTH_ERROR_MESSAGES[code]) || message || fallback;
}

export function isEmailNotConfirmedError(error: unknown): boolean {
  return getAuthErrorCode(error) === "email_not_confirmed";
}

/** The email link was opened in another browser, so the PKCE code can't be exchanged here. */
export function isMissingCodeVerifierError(error: unknown): boolean {
  return MISSING_CODE_VERIFIER_CODES.includes(getAuthErrorCode(error) ?? "");
}
