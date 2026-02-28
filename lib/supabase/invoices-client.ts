import type {
  DBInvoiceRow,
  InvoiceData,
  InvoiceStatus,
} from "@/types/invoice-types";
import { supabase } from "@/lib/supabase/client";

/**
 * DB Row ko InvoiceData interface mein convert karta hai
 */

function mapRowToInvoice(row: DBInvoiceRow): InvoiceData & { id: string } {
  return {
    id: row.id!,
    userId: row.user_id,
    logoDataUrl: row.logo_data_url,
    stampUrl: row.stamp_url,
    invoiceNumber: row.invoice_number,
    currency: row.currency as string,
    businessName: row.business_name,
    bussinessInfo: row.bussiness_info,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    poNumber: row.po_number,
    clientName: row.client_name,
    clientAddress: row.client_address,
    shipTo: row.ship_to,
    lineItems: row.line_items || [], // JSONB array
    notes: row.notes,
    terms: row.terms,
    subtotal: Number(row.subtotal),
    overallDiscount: Number(row.overall_discount),
    status: row.status as InvoiceStatus, // Agar status field hai toh use karein, warna default "pending"
    taxRate: Number(row.tax_rate),
    totalAmount: Number(row.total_amount),
  };
}

export async function saveInvoiceToDb(
  data: InvoiceData,
): Promise<{ id: string } | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) return null;

  // DB Schema ke mutabiq payload taiyar karein
  const payload = {
    user_id: user.id,
    invoice_number: data.invoiceNumber,
    logo_data_url: data.logoDataUrl,
    stamp_url: data.stampUrl,
    currency: data.currency,
    business_name: data.businessName,
    bussiness_info: data.bussinessInfo,
    issue_date: data.issueDate,
    due_date: data.dueDate,
    po_number: data.poNumber,
    client_name: data.clientName,
    client_address: data.clientAddress,
    ship_to: data.shipTo,
    line_items: data.lineItems, // TypeScript array direct JSONB mein save ho jayega
    notes: data.notes,
    terms: data.terms,
    subtotal: data.subtotal,
    overall_discount: data.overallDiscount,
    tax_rate: data.taxRate,
    total_amount: data.totalAmount,
    updated_at: new Date().toISOString(),
  };

  try {
    if (data.id) {
      // Update
      const { error } = await supabase
        .from("invoices")
        .update(payload)
        .eq("id", data.id)
        .eq("user_id", user.id);
      if (error) throw error;
      // localStorage.removeItem("invoice-generator-data"); // Local storage se data remove karein after save
      return { id: data.id };
    } else {
      // Insert
      const { data: inserted, error } = await supabase
        .from("invoices")
        .insert([payload])
        .select("id")
        .single();

      if (error) throw error;
      // localStorage.removeItem("invoice-generator-data"); // Local storage se data remove karein after save
      return inserted;
    }
  } catch (err: any) {
    console.error("Save Error:", err.message);
    throw err;
  }
}

export async function fetchInvoiceById(
  id: string,
): Promise<(InvoiceData & { id: string }) | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) return null;

  return mapRowToInvoice(data);
}

// @/lib/supabase/invoices-client.ts

export async function deleteInvoiceFromDb(id: string) {
  // 1. Pehle session check karein
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("No active session found!");
    return { success: false, error: "Authentication required" };
  }

  console.log("Attempting to delete ID:", id, "for User:", user.id);

  // 2. Delete request with select() taake confirmation mile
  const { data, error, count } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select(); // Select lagane se deleted row wapas aati hai

  if (error) {
    console.error("Supabase DB Error:", error.message);
    throw error;
  }

  // Agar data khali hai, iska matlab hai ID ya UserID match nahi hui (RLS issue)
  if (!data || data.length === 0) {
    console.warn("No row was deleted. Check if ID exists and belongs to this user.");
    return { success: false, error: "Invoice not found or permission denied" };
  }

  return { success: true, data };
}