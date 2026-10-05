import { NextResponse } from "next/server";
import { rowToClient } from "@/src/lib/mappers";
import { ApiError, check, handle, readJson, requireUser } from "@/src/lib/server/auth";
import { clientSchema, firstIssue } from "@/src/lib/validation";

// GET /api/clients
export const GET = handle(async () => {
  const { supabase, user } = await requireUser();
  const data = check(
    await supabase.from("clients").select("*").eq("user_id", user.id).order("name"),
  );
  return NextResponse.json({ clients: (data ?? []).map(rowToClient) });
});

// POST /api/clients
export const POST = handle(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const parsed = clientSchema.safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));
  const { taxId, ...rest } = parsed.data;

  const data = check(
    await supabase
      .from("clients")
      .insert({ ...rest, tax_id: taxId, email: rest.email || null, user_id: user.id })
      .select("*")
      .single(),
  );
  return NextResponse.json({ client: rowToClient(data) }, { status: 201 });
});
