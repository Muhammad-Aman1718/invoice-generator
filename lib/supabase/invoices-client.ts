import type { InvoiceData } from "@/types/invoice-types";
import { createClient } from "@/lib/supabase/client";
import { INVOICE_KEYS } from "@/constant/data";

function serializeInvoice(data: InvoiceData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const k of INVOICE_KEYS) {
    obj[k] = data[k];
  }
  return obj;
}

function deserializeInvoice(row: {
  data: unknown;
  id: string;
}): InvoiceData & { id: string } {
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
    issueDate:
      (d.issueDate as string) ?? new Date().toISOString().split("T")[0],
    dueDate: (d.dueDate as string) ?? "",
    currency: (d.currency as InvoiceData["currency"]) ?? "USD",
    lineItems: (d.lineItems as InvoiceData["lineItems"]) ?? [],
    tax: (d.tax as InvoiceData["tax"]) ?? {
      label: "Tax",
      type: "percentage",
      value: 0,
    },
    discount: (d.discount as InvoiceData["discount"]) ?? {
      label: "Discount",
      type: "percentage",
      value: 0,
    },
    paymentInstructions: (d.paymentInstructions as string) ?? "",
    notes: (d.notes as string) ?? "",
  };
}

// export async function saveInvoiceToDb(
//   data: InvoiceData,
//   grandTotal: number,
// ): Promise<{ id: string } | null> {
//   const supabase = createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) return null;

//   const payload = {
//     user_id: user.id,
//     data: serializeInvoice(data),
//     grand_total: grandTotal,
//     currency: data.currency,
//     status: data.status ?? "draft",
//   };

//   if (data.id) {
//     const { error } = await supabase
//       .from("invoices")
//       .update({ ...payload, updated_at: new Date().toISOString() })
//       .eq("id", data.id);
//     if (error) throw error;
//     return { id: data.id };
//   }

//   const { data: inserted, error } = await supabase
//     .from("invoices")
//     .insert(payload)
//     .select("id")
//     .single();
//   if (error) throw error;
//   return inserted;
// }




export async function saveInvoiceToDb(
  storeData: any, // Form ka poora store yahan aayega
  grandTotal: number,
): Promise<{ id: string } | null> {
  const supabase = createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("Auth Error:", authError);
    return null;
  }

  // Payload ko store ki keys ke mutabiq map karna
  const payload = {
    user_id: user.id,
    invoice_number: storeData.invoiceNumber?.toString() || "001",
    total_amount: grandTotal,
    currency_code: storeData.currency || "USD",
    status: storeData.status || "draft",
    // Poora invoice data (items, notes, logos) JSONB column mein save hoga
    invoice_details: storeData, 
    updated_at: new Date().toISOString(),
  };

  try {
    if (storeData.id) {
      // UPDATE existing invoice
      const { error } = await supabase
        .from("invoices")
        .update(payload)
        .eq("id", storeData.id);
      
      if (error) throw error;
      return { id: storeData.id };
    } else {
      // INSERT new invoice
      const { data: inserted, error } = await supabase
        .from("invoices")
        .insert([payload])
        .select("id")
        .single();

      if (error) throw error;
      return inserted;
    }
  } catch (err: any) {
    console.error("Database Operation Failed:", err.message);
    throw err;
  }
}





export async function fetchInvoiceById(
  id: string,
): Promise<(InvoiceData & { id: string }) | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("invoices")
    .select("id, data")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (error || !data) return null;
  return deserializeInvoice({ id: data.id, data: data.data });
}

export async function deleteInvoiceFromDb(id: string): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) throw error;
}
