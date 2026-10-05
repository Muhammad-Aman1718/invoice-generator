import { NextResponse } from "next/server";
import { INVOICE_SUMMARY_COLUMNS, invoiceToRow, rowToInvoiceSummary } from "@/src/lib/mappers";
import { ApiError, check, handle, readJson, requireUser } from "@/src/lib/server/auth";
import { firstIssue, invoiceSchema } from "@/src/lib/validation";
import { INVOICE_STATUSES } from "@/src/types/invoice-types";

// GET /api/invoices?status=paid&q=acme&limit=50&offset=0
export const GET = handle(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const params = new URL(request.url).searchParams;
  const limit = Math.min(Number(params.get("limit")) || 200, 500);
  const offset = Math.max(Number(params.get("offset")) || 0, 0);

  let query = supabase
    .from("invoices")
    .select(INVOICE_SUMMARY_COLUMNS, { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  const status = params.get("status");
  if (status && (INVOICE_STATUSES as readonly string[]).includes(status)) {
    query = query.eq("status", status);
  }
  const q = params.get("q")?.trim();
  if (q) query = query.ilike("client_name", `%${q.replace(/[%_]/g, "")}%`);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return NextResponse.json({ invoices: (data ?? []).map(rowToInvoiceSummary), total: count ?? 0 });
});

// POST /api/invoices
export const POST = handle(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const parsed = invoiceSchema.safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));

  const data = check(
    await supabase
      .from("invoices")
      .insert({ ...invoiceToRow(parsed.data), user_id: user.id })
      .select("id")
      .single(),
  );
  return NextResponse.json({ invoice: data }, { status: 201 });
});
