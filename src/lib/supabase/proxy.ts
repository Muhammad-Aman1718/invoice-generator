import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { hasEnvVars } from "@/src/lib/utils";
import { buildNextUrl } from "@/src/lib/redirects";
import { GUEST_ONLY_ROUTES, PROTECTED_PREFIXES, ROUTES } from "@/src/constant/routes";

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function createProxyClient(request: NextRequest, responseRef: { current: NextResponse }) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          responseRef.current = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            responseRef.current.cookies.set(name, value, options),
          );
        },
      },
    },
  );
}

async function isAdmin(supabase: SupabaseClient, userId: string): Promise<boolean> {
  const { data } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
  return data?.role === "admin";
}

/** Refresh the Supabase session and enforce route access rules. */
export async function updateSession(request: NextRequest) {
  const response = { current: NextResponse.next({ request }) };
  if (!hasEnvVars) return response.current;

  const supabase = createProxyClient(request, response);
  // getUser() also refreshes an expiring session.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname, searchParams } = request.nextUrl;

  const redirectTo = (path: string) => {
    const redirect = NextResponse.redirect(new URL(path, request.url));
    // Keep refreshed auth cookies on the redirect.
    response.current.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  };

  if (!user && PROTECTED_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))) {
    const next = encodeURIComponent(pathname + request.nextUrl.search);
    return redirectTo(`${ROUTES.login}?next=${next}`);
  }
  if (!user) return response.current;

  const isHome = pathname === ROUTES.home;
  // Visitors who explicitly want the free builder (`/?builder`) can still open it.
  if ((isHome && !searchParams.has("builder")) || GUEST_ONLY_ROUTES.includes(pathname)) {
    return redirectTo(buildNextUrl(searchParams, request.url));
  }
  if (matchesPrefix(pathname, ROUTES.admin) && !(await isAdmin(supabase, user.id))) {
    return redirectTo(ROUTES.dashboard);
  }
  return response.current;
}
