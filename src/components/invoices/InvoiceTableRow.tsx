import Link from "next/link";
import InvoiceActionMenu from "./InvoiceActionMenu";
import StatusBadge from "@/src/components/ui/StatusBadge";
import { formatCurrency, formatShortDate } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import { ROUTES } from "@/src/constant/routes";
import type { InvoiceTableRowProps } from "@/src/types/types";

export default function InvoiceTableRow({ invoice, actions }: InvoiceTableRowProps) {
  const isOverdue = invoice.shownStatus === "overdue";
  return (
    <tr className="transition hover:bg-gold/[0.04]">
      <td className="px-5 py-3.5">
        <Link href={`${ROUTES.invoices}/${invoice.id}`} className="font-black text-navy hover:underline">
          #{invoice.invoiceNumber}
        </Link>
      </td>
      <td className="max-w-[220px] truncate px-4 py-3.5 font-semibold text-navy">
        {invoice.clientName || "Unnamed client"}
      </td>
      <td className="px-4 py-3.5 text-xs text-navy-500">{formatShortDate(invoice.issueDate)}</td>
      <td className={cn("px-4 py-3.5 text-xs", isOverdue ? "font-bold text-red-600" : "text-navy-500")}>
        {formatShortDate(invoice.dueDate)}
      </td>
      <td className="px-4 py-3.5 text-right font-black tabular-nums text-navy">
        {formatCurrency(invoice.totalAmount, invoice.currency)}
      </td>
      <td className="px-4 py-3.5 text-center">
        <StatusBadge status={invoice.shownStatus} />
      </td>
      <td className="px-4 py-3.5 text-right">
        <InvoiceActionMenu invoice={invoice} actions={actions} />
      </td>
    </tr>
  );
}
