import { rowToClient, rowToInvoice } from "@/src/lib/mappers";
import { unwrapResult, withErrorHandling } from "@/src/lib/server/apiError";
import { getProfile, getSubscription, requireUser } from "@/src/lib/server/auth";
import { JSON_INDENT } from "@/src/constant/app";

// GET /api/account/export → JSON copy of everything stored about the user (GDPR art. 20).
export const GET = withErrorHandling(async () => {
  const session = await requireUser();
  const { supabase, user } = session;
  const [profile, subscription, invoices, clients] = await Promise.all([
    getProfile(session),
    getSubscription(session),
    supabase.from("invoices").select("*").eq("user_id", user.id),
    supabase.from("clients").select("*").eq("user_id", user.id),
  ]);

  const exportedAt = new Date().toISOString();
  const body = {
    exportedAt,
    account: { id: user.id, email: user.email, createdAt: user.created_at },
    profile,
    subscription,
    clients: (unwrapResult(clients) ?? []).map(rowToClient),
    invoices: (unwrapResult(invoices) ?? []).map(rowToInvoice),
  };
  const fileDate = exportedAt.slice(0, 10).replace(/-/g, "");

  return new Response(JSON.stringify(body, null, JSON_INDENT), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="invoicegenExport${fileDate}.json"`,
    },
  });
});
