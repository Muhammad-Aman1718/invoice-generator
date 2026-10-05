import { NextResponse } from "next/server";
import { invoiceToRow, rowToInvoice } from "@/src/lib/mappers";
import { throwNotFound, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import { getRouteId, parseRequestBody } from "@/src/lib/server/parseRequest";
import { invoicePatchSchema } from "@/src/lib/validation";
import { ENTITY_NAMES } from "@/src/constant/http";
import type { RouteContext } from "@/src/types/types";

// GET /api/invoices/:id
export const GET = withErrorHandling(async (_request: Request, context: RouteContext) => {
  const id = await getRouteId(context, ENTITY_NAMES.invoice);
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throwNotFound(ENTITY_NAMES.invoice);
  return NextResponse.json({ invoice: rowToInvoice(data) });
});

// PATCH /api/invoices/:id — full or partial update, e.g. { "status": "paid" }
export const PATCH = withErrorHandling(async (request: Request, context: RouteContext) => {
  const id = await getRouteId(context, ENTITY_NAMES.invoice);
  const { supabase, user } = await requireUser();
  const input = await parseRequestBody(request, invoicePatchSchema);
  const { data, error } = await supabase
    .from("invoices")
    .update(invoiceToRow(input))
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throwNotFound(ENTITY_NAMES.invoice);
  return NextResponse.json({ invoice: data });
});

// DELETE /api/invoices/:id
export const DELETE = withErrorHandling(async (_request: Request, context: RouteContext) => {
  const id = await getRouteId(context, ENTITY_NAMES.invoice);
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throwNotFound(ENTITY_NAMES.invoice);
  return NextResponse.json({ ok: true });
});
