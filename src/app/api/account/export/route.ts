import { rowToClient, rowToInvoice } from "@/src/lib/mappers";
import { check, getProfile, getSubscription, handle, requireUser } from "@/src/lib/server/auth";

// GET /api/account/export → JSON copy of everything stored about the user (GDPR art. 20).
export const GET = handle(async () => {
  const session = await requireUser();
  const { supabase, user } = session;
  const [profile, subscription, invoices, clients] = await Promise.all([
    getProfile(session),
    getSubscription(session),
    supabase.from("invoices").select("*").eq("user_id", user.id),
    supabase.from("clients").select("*").eq("user_id", user.id),
  ]);

  const body = {
    exportedAt: new Date().toISOString(),
    account: { id: user.id, email: user.email, createdAt: user.created_at },
    profile,
    subscription,
    clients: (check(clients) ?? []).map(rowToClient),
    invoices: (check(invoices) ?? []).map(rowToInvoice),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="invoicegen-export-${body.exportedAt.slice(0, 10)}.json"`,
    },
  });
});
