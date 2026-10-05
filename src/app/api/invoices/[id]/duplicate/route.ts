import { NextResponse } from "next/server";
import { throwNotFound, unwrapResult, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import { getRouteId } from "@/src/lib/server/parseRequest";
import { getDaysBetween, getUtcIsoDate } from "@/src/lib/dateUtils";
import { ENTITY_NAMES, HTTP_STATUS } from "@/src/constant/http";
import type { DbRow, RouteContext } from "@/src/types/types";

/** Copy of an invoice row as a new pending invoice dated today, keeping its payment terms. */
function buildDuplicateRow(source: DbRow, invoiceNumber: number): DbRow {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, updated_at, paid_at, ...rest } = source;
  const termDays =
    source.issue_date && source.due_date ? getDaysBetween(source.issue_date, source.due_date) : 0;
  return {
    ...rest,
    invoice_number: invoiceNumber,
    issue_date: getUtcIsoDate(),
    due_date: getUtcIsoDate(termDays),
    status: "pending",
    paid_at: null,
  };
}

// POST /api/invoices/:id/duplicate
export const POST = withErrorHandling(async (_request: Request, context: RouteContext) => {
  const id = await getRouteId(context, ENTITY_NAMES.invoice);
  const { supabase, user } = await requireUser();

  const { data: source, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!source) throwNotFound(ENTITY_NAMES.invoice);

  const nextNumber = unwrapResult(
    await supabase.rpc("get_next_invoice_number", { target_user_id: user.id }),
  ) as number;
  const copy = unwrapResult(
    await supabase
      .from("invoices")
      .insert({ ...buildDuplicateRow(source, nextNumber || 1), user_id: user.id })
      .select("id")
      .single(),
  );
  return NextResponse.json({ invoice: copy }, { status: HTTP_STATUS.created });
});
