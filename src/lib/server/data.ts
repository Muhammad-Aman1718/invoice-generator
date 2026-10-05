import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { rowToClient, rowToInvoiceSummary } from "@/src/lib/mappers";
import { INVOICE_SUMMARY_COLUMNS } from "@/src/constant/invoice";
import { getPlan } from "@/src/lib/plans";
import { getUtcMonthStart } from "@/src/lib/dateUtils";
import { getProfile, getSession, getSubscription } from "@/src/lib/server/auth";
import { ROUTES } from "@/src/constant/routes";
import type { Client, InvoiceSummary, Session, Viewer } from "@/src/types/types";

/** Current user + profile + plan for server components (deduped per request). */
export const getViewer = cache(async (): Promise<Viewer> => {
  const session = await getSession();
  if (!session) redirect(ROUTES.login);
  const [profile, subscription] = await Promise.all([getProfile(session), getSubscription(session)]);
  return { ...session, profile, subscription, plan: getPlan(subscription.plan) };
});

export async function listInvoiceSummaries({ supabase, user }: Session): Promise<InvoiceSummary[]> {
  const { data, error } = await supabase
    .from("invoices")
    .select(INVOICE_SUMMARY_COLUMNS)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load invoices: ${error.message}`);
  return (data ?? []).map(rowToInvoiceSummary);
}

export async function listClients({ supabase, user }: Session): Promise<Client[]> {
  const { data, error } = await supabase.from("clients").select("*").eq("user_id", user.id).order("name");
  if (error) throw new Error(`Could not load clients: ${error.message}`);
  return (data ?? []).map(rowToClient);
}

export async function countInvoicesThisMonth({ supabase, user }: Session): Promise<number> {
  const { count, error } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", getUtcMonthStart().toISOString());
  if (error) throw new Error(`Could not count invoices: ${error.message}`);
  return count ?? 0;
}
