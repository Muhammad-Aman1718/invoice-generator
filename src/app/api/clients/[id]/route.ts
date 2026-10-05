import { NextResponse } from "next/server";
import { clientToRow, rowToClient } from "@/src/lib/mappers";
import { throwNotFound, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import { getRouteId, parseRequestBody } from "@/src/lib/server/parseRequest";
import { clientSchema } from "@/src/lib/validation";
import { ENTITY_NAMES } from "@/src/constant/http";
import type { RouteContext } from "@/src/types/types";

// PATCH /api/clients/:id
export const PATCH = withErrorHandling(async (request: Request, context: RouteContext) => {
  const id = await getRouteId(context, ENTITY_NAMES.client);
  const { supabase, user } = await requireUser();
  const input = await parseRequestBody(request, clientSchema.partial());
  const { data, error } = await supabase
    .from("clients")
    .update(clientToRow(input))
    .eq("id", id)
    .eq("user_id", user.id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throwNotFound(ENTITY_NAMES.client);
  return NextResponse.json({ client: rowToClient(data) });
});

// DELETE /api/clients/:id — invoices keep their copied client details.
export const DELETE = withErrorHandling(async (_request: Request, context: RouteContext) => {
  const id = await getRouteId(context, ENTITY_NAMES.client);
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throwNotFound(ENTITY_NAMES.client);
  return NextResponse.json({ ok: true });
});
