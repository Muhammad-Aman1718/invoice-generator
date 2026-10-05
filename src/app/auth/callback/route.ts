import { NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/server";
import { buildNextUrl } from "@/src/lib/redirects";
import { ROUTES } from "@/src/constant/routes";

function redirectToError(origin: string, message: string) {
  return NextResponse.redirect(`${origin}${ROUTES.authError}?error=${encodeURIComponent(message)}`);
}

// OAuth, email-confirmation and password-reset links land here with ?code=…
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code)
    return redirectToError(origin, searchParams.get("error_description") ?? "Missing authorization code");

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return redirectToError(origin, error.message);

  return NextResponse.redirect(new URL(buildNextUrl(searchParams, origin), origin));
}
