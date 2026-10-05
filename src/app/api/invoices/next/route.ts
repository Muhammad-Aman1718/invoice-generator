import { NextResponse } from "next/server";
import { withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import type { Session } from "@/src/types/types";

/** Used when the get_next_invoice_number RPC hasn't been installed yet. */
async function getNextNumberFallback({ supabase, user }: Session): Promise<number> {
  const { data, error } = await supabase
    .from("invoices")
    .select("invoice_number")
    .eq("user_id", user.id)
    .order("invoice_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (Number(data?.invoice_number) || 0) + 1;
}

// GET /api/invoices/next → { next: 42 }
export const GET = withErrorHandling(async () => {
  const session = await requireUser();
  const { data, error } = await session.supabase.rpc("get_next_invoice_number", {
    target_user_id: session.user.id,
  });
  if (!error && typeof data === "number") return NextResponse.json({ next: data });
  console.warn("[api] get_next_invoice_number unavailable, using fallback:", error?.message);
  return NextResponse.json({ next: await getNextNumberFallback(session) });
});
