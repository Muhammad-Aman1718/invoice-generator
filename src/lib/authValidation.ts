import { PASSWORD_MIN_LENGTH } from "@/src/constant/app";
import type { SignUpValues } from "@/src/types/types";

/** First problem with the form, or null when it can be submitted. */
export function getSignUpProblem(values: SignUpValues): string | null {
  const passwordProblem = getPasswordProblem(values.password, values.repeatPassword);
  if (passwordProblem) return passwordProblem;
  if (!values.acceptedTerms) return "Please accept the Terms of Service and Privacy Policy.";
  return null;
}

export function getPasswordProblem(password: string, confirmation: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Use at least ${PASSWORD_MIN_LENGTH} characters for your password.`;
  }
  return password === confirmation ? null : "Passwords must be identical.";
}
