import { NextResponse } from "next/server";
import { unwrapResult, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";

// DELETE /api/account → permanently delete the signed-in user and all their data.
export const DELETE = withErrorHandling(async () => {
  const { supabase } = await requireUser();
  unwrapResult(await supabase.rpc("delete_my_account"));
  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
});
