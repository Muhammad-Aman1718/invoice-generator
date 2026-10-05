import { NextResponse } from "next/server";
import { clientToRow, rowToClient } from "@/src/lib/mappers";
import { unwrapResult, withErrorHandling } from "@/src/lib/server/apiError";
import { requireUser } from "@/src/lib/server/auth";
import { parseRequestBody } from "@/src/lib/server/parseRequest";
import { clientSchema } from "@/src/lib/validation";
import { HTTP_STATUS } from "@/src/constant/http";

// GET /api/clients
export const GET = withErrorHandling(async () => {
  const { supabase, user } = await requireUser();
  const rows = unwrapResult(await supabase.from("clients").select("*").eq("user_id", user.id).order("name"));
  return NextResponse.json({ clients: (rows ?? []).map(rowToClient) });
});

// POST /api/clients
export const POST = withErrorHandling(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const input = await parseRequestBody(request, clientSchema);
  const row = unwrapResult(
    await supabase
      .from("clients")
      .insert({ ...clientToRow(input), user_id: user.id })
      .select("*")
      .single(),
  );
  return NextResponse.json({ client: rowToClient(row) }, { status: HTTP_STATUS.created });
});
