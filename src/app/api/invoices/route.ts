import { NextResponse } from "next/server";
import { invoiceToRow, rowToInvoiceSummary } from "@/src/lib/mappers";
import { INVOICE_STATUSES, INVOICE_SUMMARY_COLUMNS } from "@/src/constant/invoice";
import { unwrapResult, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import { parseRequestBody } from "@/src/lib/server/parseRequest";
import { invoiceSchema } from "@/src/lib/validation";
import { DEFAULT_API_PAGE_SIZE, MAX_API_PAGE_SIZE } from "@/src/constant/app";
import { HTTP_STATUS } from "@/src/constant/http";
import type { InvoiceStatus } from "@/src/types/types";

function getPaging(params: URLSearchParams) {
  const limit = Math.min(Number(params.get("limit")) || DEFAULT_API_PAGE_SIZE, MAX_API_PAGE_SIZE);
  const offset = Math.max(Number(params.get("offset")) || 0, 0);
  return { from: offset, to: offset + limit - 1 };
}

/** Escape LIKE wildcards so user input is matched literally. */
function toSearchPattern(query: string): string {
  return `%${query.replace(/[%_]/g, "")}%`;
}

// GET /api/invoices?status=paid&q=acme&limit=50&offset=0
export const GET = withErrorHandling(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const params = new URL(request.url).searchParams;
  const { from, to } = getPaging(params);

  let query = supabase
    .from("invoices")
    .select(INVOICE_SUMMARY_COLUMNS, { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  const status = params.get("status") as InvoiceStatus | null;
  if (status && INVOICE_STATUSES.includes(status)) query = query.eq("status", status);
  const search = params.get("q")?.trim();
  if (search) query = query.ilike("client_name", toSearchPattern(search));

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return NextResponse.json({ invoices: (data ?? []).map(rowToInvoiceSummary), total: count ?? 0 });
});

// POST /api/invoices
export const POST = withErrorHandling(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const input = await parseRequestBody(request, invoiceSchema);
  const invoice = unwrapResult(
    await supabase
      .from("invoices")
      .insert({ ...invoiceToRow(input), user_id: user.id })
      .select("id")
      .single(),
  );
  return NextResponse.json({ invoice }, { status: HTTP_STATUS.created });
});
