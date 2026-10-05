import { rowToInvoiceSummary } from "@/src/lib/mappers";
import { INVOICE_CSV_HEADER, INVOICE_SUMMARY_COLUMNS } from "@/src/constant/invoice";
import { ApiError, withErrorHandling } from "@/src/lib/server/apiError";
import { getSubscription, requireUser } from "@/src/lib/server/auth";
import { getDisplayStatus } from "@/src/lib/invoiceCalculations";
import { getPlan } from "@/src/lib/plans";
import { toCsv } from "@/src/lib/csv";
import { API_ERROR_CODES, HTTP_STATUS } from "@/src/constant/http";
import type { InvoiceSummary } from "@/src/types/types";

function toCsvRow(invoice: InvoiceSummary): unknown[] {
  return [
    invoice.invoiceNumber,
    invoice.clientName,
    invoice.issueDate,
    invoice.dueDate,
    getDisplayStatus(invoice.status, invoice.dueDate),
    invoice.currency,
    invoice.totalAmount.toFixed(2),
  ];
}

// GET /api/invoices/export → CSV download (Pro & Business plans)
export const GET = withErrorHandling(async () => {
  const session = await requireUser();
  const subscription = await getSubscription(session);
  if (!getPlan(subscription.plan).perks.csvExport) {
    throw new ApiError(
      HTTP_STATUS.paymentRequired,
      "CSV export is available on the Pro and Business plans.",
      API_ERROR_CODES.planLimit,
    );
  }

  const { data, error } = await session.supabase
    .from("invoices")
    .select(INVOICE_SUMMARY_COLUMNS)
    .eq("user_id", session.user.id)
    .order("invoice_number", { ascending: true });
  if (error) throw new Error(error.message);

  const rows = (data ?? []).map(rowToInvoiceSummary).map(toCsvRow);
  const fileDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return new Response(toCsv([INVOICE_CSV_HEADER, ...rows]), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="invoices${fileDate}.csv"`,
    },
  });
});
