import { NextResponse } from "next/server";
import { profileToRow, rowToProfile } from "@/src/lib/mappers";
import { unwrapResult, withErrorHandling } from "@/src/lib/server/apiError";
import { getProfile, getSubscription, requireUser } from "@/src/lib/server/auth";
import { parseRequestBody } from "@/src/lib/server/parseRequest";
import { profileSchema } from "@/src/lib/validation";

// GET /api/profile → profile, business defaults and current plan
export const GET = withErrorHandling(async () => {
  const session = await requireUser();
  const [profile, subscription] = await Promise.all([getProfile(session), getSubscription(session)]);
  return NextResponse.json({ profile, subscription });
});

// PATCH /api/profile
export const PATCH = withErrorHandling(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const input = await parseRequestBody(request, profileSchema);
  const row = unwrapResult(
    await supabase
      .from("profiles")
      .upsert({ id: user.id, email: user.email, ...profileToRow(input) })
      .select("*")
      .single(),
  );
  return NextResponse.json({ profile: rowToProfile(row) });
});
