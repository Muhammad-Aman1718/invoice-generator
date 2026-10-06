import { NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/server";
import { buildNextUrl, buildVerifiedLoginUrl } from "@/src/lib/redirects";
import { getAuthErrorMessage, isMissingCodeVerifierError } from "@/src/lib/authErrors";
import { ROUTES } from "@/src/constant/routes";

function redirectToError(origin: string, message: string) {
  return NextResponse.redirect(`${origin}${ROUTES.authError}?error=${encodeURIComponent(message)}`);
}

// OAuth, email-confirmation and password-reset links land here with ?code=…
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) {
    return redirectToError(origin, searchParams.get("error_description") ?? "Missing authorization code");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (!error) return NextResponse.redirect(new URL(buildNextUrl(searchParams, origin), origin));

  // A confirmation link opened in another browser (e.g. the phone's mail app): Supabase has
  // already verified the email, only the session can't be created here — so ask them to sign in.
  const isPasswordReset = searchParams.get("next") === ROUTES.updatePassword;
  if (isMissingCodeVerifierError(error) && !isPasswordReset) {
    return NextResponse.redirect(new URL(buildVerifiedLoginUrl(searchParams), origin));
  }
  return redirectToError(origin, getAuthErrorMessage(error));
}
