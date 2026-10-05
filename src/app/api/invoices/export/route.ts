import { INVOICE_SUMMARY_COLUMNS, displayStatus, rowToInvoiceSummary } from "@/src/lib/mappers";
import { ApiError, getSubscription, handle, requireUser } from "@/src/lib/server/auth";
import { getPlan } from "@/src/config/plans";

function csvCell(value: unknown) {
  const s = String(value ?? "");
  // Neutralise spreadsheet formula injection and escape quotes.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

// GET /api/invoices/export → CSV download (Pro & Business plans)
export const GET = handle(async () => {
  const session = await requireUser();
  const subscription = await getSubscription(session);
  if (!getPlan(subscription.plan).perks.csvExport) {
    throw new ApiError(402, "CSV export is available on the Pro and Business plans.", "PLAN_LIMIT");
  }

  const { data, error } = await session.supabase
    .from("invoices")
    .select(INVOICE_SUMMARY_COLUMNS)
    .eq("user_id", session.user.id)
    .order("invoice_number", { ascending: true });
  if (error) throw new Error(error.message);

  const header = ["Invoice #", "Client", "Issue date", "Due date", "Status", "Currency", "Total"];
  const rows = (data ?? []).map(rowToInvoiceSummary).map((inv) =>
    [
      inv.invoiceNumber,
      inv.clientName,
      inv.issueDate,
      inv.dueDate,
      displayStatus(inv.status, inv.dueDate),
      inv.currency,
      inv.totalAmount.toFixed(2),
    ]
      .map(csvCell)
      .join(","),
  );

  const csv = [header.map(csvCell).join(","), ...rows].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="invoices-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
});
