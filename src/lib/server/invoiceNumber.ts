import "server-only";

import { ApiError } from "@/src/lib/server/apiError";
import { API_ERROR_CODES, HTTP_STATUS } from "@/src/constant/http";
import type { Session } from "@/src/types/types";

/** Invoice numbers must be unique per account (most tax authorities require it). */
export async function assertInvoiceNumberAvailable(
  { supabase, user }: Session,
  invoiceNumber: number | undefined,
  currentId?: string,
): Promise<void> {
  if (!invoiceNumber) return;
  let query = supabase
    .from("invoices")
    .select("id")
    .eq("user_id", user.id)
    .eq("invoice_number", invoiceNumber)
    .limit(1);
  if (currentId) query = query.neq("id", currentId);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  if (data?.length) {
    throw new ApiError(
      HTTP_STATUS.conflict,
      `Invoice #${invoiceNumber} already exists. Use another number.`,
      API_ERROR_CODES.duplicateInvoiceNumber,
    );
  }
}
