import { NextResponse } from "next/server";
import { rowToClient } from "@/src/lib/mappers";
import { ApiError, handle, readJson, requireUser } from "@/src/lib/server/auth";
import { clientSchema, firstIssue } from "@/src/lib/validation";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/clients/:id
export const PATCH = handle(async (request: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const { supabase, user } = await requireUser();
  const parsed = clientSchema.partial().safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));
  const { taxId, ...rest } = parsed.data;

  const update: Record<string, unknown> = { ...rest };
  if (taxId !== undefined) update.tax_id = taxId;
  if (rest.email !== undefined) update.email = rest.email || null;

  const { data, error } = await supabase
    .from("clients")
    .update(update)
    .eq("id", id)
    .eq("user_id", user.id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new ApiError(404, "Client not found.");
  return NextResponse.json({ client: rowToClient(data) });
});

// DELETE /api/clients/:id  (invoices keep their copied client details)
export const DELETE = handle(async (_request: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new ApiError(404, "Client not found.");
  return NextResponse.json({ ok: true });
});
