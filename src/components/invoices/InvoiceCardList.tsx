import Link from "next/link";
import InvoiceActionMenu from "./InvoiceActionMenu";
import StatusBadge from "@/src/components/ui/StatusBadge";
import { formatCurrency, formatShortDate } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import { ROUTES } from "@/src/constant/routes";
import type { InvoiceCardListProps } from "@/src/types/types";

export default function InvoiceCardList({ invoices, actions }: InvoiceCardListProps) {
  return (
    <ul className="space-y-3 md:hidden">
      {invoices.map((invoice) => (
        <li key={invoice.id} className="panel p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <Link href={`${ROUTES.invoices}/${invoice.id}`} className="min-w-0">
              <p className="font-bold text-navy">#{invoice.invoiceNumber}</p>
              <p className="truncate text-xs font-medium text-navy-500">
                {invoice.clientName || "Unnamed client"}
              </p>
            </Link>
            <div className="flex items-center gap-1">
              <StatusBadge status={invoice.shownStatus} />
              <InvoiceActionMenu invoice={invoice} actions={actions} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-navy/[0.06] pt-3">
            <span
              className={cn(
                "text-xs",
                invoice.shownStatus === "overdue" ? "font-bold text-red-600" : "text-navy-500",
              )}
            >
              Due {formatShortDate(invoice.dueDate)}
            </span>
            <span className="rounded-xl bg-gold/[0.12] px-2.5 py-1 text-sm font-bold tabular-nums text-navy">
              {formatCurrency(invoice.totalAmount, invoice.currency)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
