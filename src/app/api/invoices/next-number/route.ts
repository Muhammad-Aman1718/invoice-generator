import { NextResponse } from "next/server";
import { handle, requireUser } from "@/src/lib/server/auth";

// GET /api/invoices/next-number → { next: 42 }
export const GET = handle(async () => {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase.rpc("get_next_invoice_number", {
    target_user_id: user.id,
  });
  if (!error && typeof data === "number") return NextResponse.json({ next: data });

  // Fallback if the RPC is not installed yet.
  const { data: last } = await supabase
    .from("invoices")
    .select("invoice_number")
    .eq("user_id", user.id)
    .order("invoice_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  return NextResponse.json({ next: (Number(last?.invoice_number) || 0) + 1 });
});
