import { NextResponse } from "next/server";
import { invoiceToRow, rowToInvoice } from "@/src/lib/mappers";
import { ApiError, handle, readJson, requireUser } from "@/src/lib/server/auth";
import { firstIssue, invoicePatchSchema } from "@/src/lib/validation";

type Ctx = { params: Promise<{ id: string }> };

const UUID = /^[0-9a-f-]{36}$/i;

async function resolveId(ctx: Ctx) {
  const { id } = await ctx.params;
  if (!UUID.test(id)) throw new ApiError(404, "Invoice not found.");
  return id;
}

// GET /api/invoices/:id
export const GET = handle(async (_request: Request, ctx: Ctx) => {
  const id = await resolveId(ctx);
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new ApiError(404, "Invoice not found.");
  return NextResponse.json({ invoice: rowToInvoice(data) });
});

// PATCH /api/invoices/:id  (full or partial update, e.g. { status: "paid" })
export const PATCH = handle(async (request: Request, ctx: Ctx) => {
  const id = await resolveId(ctx);
  const { supabase, user } = await requireUser();
  const parsed = invoicePatchSchema.safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));

  const { data, error } = await supabase
    .from("invoices")
    .update(invoiceToRow(parsed.data))
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new ApiError(404, "Invoice not found.");
  return NextResponse.json({ invoice: data });
});

// DELETE /api/invoices/:id
export const DELETE = handle(async (_request: Request, ctx: Ctx) => {
  const id = await resolveId(ctx);
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new ApiError(404, "Invoice not found.");
  return NextResponse.json({ ok: true });
});
