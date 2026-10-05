import { NextResponse } from "next/server";
import { check, handle, requireUser } from "@/src/lib/server/auth";

// DELETE /api/account → permanently delete the signed-in user and all their data.
export const DELETE = handle(async () => {
  const { supabase } = await requireUser();
  check(await supabase.rpc("delete_my_account"));
  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
});
