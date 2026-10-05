import { NextResponse } from "next/server";
import { ApiError, check, handle, requireUser } from "@/src/lib/server/auth";

type Ctx = { params: Promise<{ id: string }> };

// POST /api/invoices/:id/duplicate → copy as a new pending invoice dated today.
export const POST = handle(async (_request: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const { supabase, user } = await requireUser();

  const { data: source, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!source) throw new ApiError(404, "Invoice not found.");

  const next = check(
    await supabase.rpc("get_next_invoice_number", { target_user_id: user.id }),
  ) as number;

  const today = new Date().toISOString().slice(0, 10);
  const termDays =
    source.issue_date && source.due_date
      ? Math.max(
          0,
          Math.round(
            (new Date(source.due_date).getTime() - new Date(source.issue_date).getTime()) /
              86_400_000,
          ),
        )
      : 0;
  const due = new Date(Date.now() + termDays * 86_400_000).toISOString().slice(0, 10);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, created_at, updated_at, paid_at, ...rest } = source;
  const copy = check(
    await supabase
      .from("invoices")
      .insert({
        ...rest,
        user_id: user.id,
        invoice_number: next || 1,
        issue_date: today,
        due_date: due,
        status: "pending",
        paid_at: null,
      })
      .select("id")
      .single(),
  );
  return NextResponse.json({ invoice: copy }, { status: 201 });
});
