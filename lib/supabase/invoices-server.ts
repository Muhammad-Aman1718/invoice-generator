// import type { InvoiceData, RawInvoiceRow } from "@/types/invoice-types";
import { createClient } from "@/lib/supabase/server";
import { DBInvoiceRow, InvoiceData } from "@/types/invoice-types";

// invoices-server.ts

// Types jo Supabase se direct aati hain (Snake Case)

function deserializeInvoice(row: DBInvoiceRow): InvoiceData {
  return {
    id: row.id,
    userId: row.user_id ?? undefined,
    logoDataUrl: row.logo_data_url ?? null,
    stampUrl: row.stamp_url ?? null,
    invoiceNumber: row.invoice_number ?? 0,
    currency: (row.currency as string) ?? "USD",
    businessName: row.business_name ?? "",
    bussinessInfo: row.bussiness_info ?? "", // Mapping DB snake_case to camelCase
    issueDate: row.issue_date ?? "",
    dueDate: row.due_date ?? "",
    poNumber: row.po_number ?? "",
    clientName: row.client_name ?? "",
    clientAddress: row.client_address ?? "",
    shipTo: row.ship_to ?? "",
    lineItems: Array.isArray(row.line_items) ? row.line_items : [],
    notes: row.notes ?? "",
    terms: row.terms ?? "",
    // Numeric values ko hamesha Number() mein wrap karein kyunke DB se string bhi aa sakti hai
    subtotal: Number(row.subtotal) || 0,
    overallDiscount: Number(row.overall_discount) || 0,
    taxRate: Number(row.tax_rate) || 0,
    totalAmount: Number(row.total_amount) || 0,
  };
}

export async function fetchUserInvoicesServer(): Promise<InvoiceData[]> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("Auth Error:", authError);
    return [];
  }

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    // Ye line aapko terminal mein batayegi ke masla kya hai (e.g., "column grand_total does not exist")
    console.error("Full Supabase Error:", JSON.stringify(error, null, 2));
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => deserializeInvoice(row));
}
