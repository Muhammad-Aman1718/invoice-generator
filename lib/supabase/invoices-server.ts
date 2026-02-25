import type { InvoiceData } from "@/types/invoice-types";
import { createClient } from "@/lib/supabase/server";

function deserializeInvoice(row: { data: unknown; id: string }): InvoiceData & { id: string } {
  const d = row.data as Record<string, unknown>;
  return {
    id: row.id,
    logoDataUrl: (d.logoDataUrl as string) ?? null,
    businessName: (d.businessName as string) ?? "",
    businessAddress: (d.businessAddress as string) ?? "",
    businessEmail: (d.businessEmail as string) ?? "",
    businessPhone: (d.businessPhone as string) ?? "",
    clientName: (d.clientName as string) ?? "",
    clientAddress: (d.clientAddress as string) ?? "",
    clientEmail: (d.clientEmail as string) ?? "",
    invoiceNumber: (d.invoiceNumber as number) ?? 1,
    issueDate: (d.issueDate as string) ?? new Date().toISOString().split("T")[0],
    dueDate: (d.dueDate as string) ?? "",
    currency: (d.currency as InvoiceData["currency"]) ?? "USD",
    lineItems: (d.lineItems as InvoiceData["lineItems"]) ?? [],
    tax: (d.tax as InvoiceData["tax"]) ?? { label: "Tax", type: "percentage", value: 0 },
    discount: (d.discount as InvoiceData["discount"]) ?? { label: "Discount", type: "percentage", value: 0 },
    paymentInstructions: (d.paymentInstructions as string) ?? "",
    notes: (d.notes as string) ?? "",
  };
}

export async function fetchUserInvoicesServer(): Promise<(InvoiceData & { id: string })[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("invoices")
    .select("id, data, grand_total, currency, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((r) => deserializeInvoice({ id: r.id, data: r.data }));
}
