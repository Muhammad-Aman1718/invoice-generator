import Link from "next/link";
import { ArrowRight, FileText, Plus } from "lucide-react";
import StatusBadge from "@/src/components/ui/StatusBadge";
import { formatCurrency, formatShortDate } from "@/src/lib/format";
import { getDisplayStatus } from "@/src/lib/invoiceCalculations";
import { ROUTES } from "@/src/constant/routes";
import type { RecentInvoicesProps } from "@/src/types/types";

export default function RecentInvoices({ invoices }: RecentInvoicesProps) {
  return (
    <section className="panel overflow-hidden" aria-labelledby="recentTitle">
      <div className="flex items-center justify-between border-b border-navy/5 px-5 py-4 sm:px-6">
        <h2 id="recentTitle" className="text-base font-bold text-navy">
          Recent invoices
        </h2>
        <Link
          href={ROUTES.invoices}
          className="flex items-center gap-1 text-xs font-bold text-navy hover:underline"
        >
          View all <ArrowRight size={13} />
        </Link>
      </div>
      {invoices.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <FileText className="text-navy-300" size={28} />
          <p className="text-sm text-navy-500">No invoices yet. Your first one takes under a minute.</p>
          <Link href={ROUTES.newInvoice} className="btn-primary btn-sm">
            <Plus size={14} /> Create invoice
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-navy/5">
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <Link
                href={`${ROUTES.invoices}/${invoice.id}`}
                className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-gold/[0.04] sm:px-6"
              >
                <span className="w-14 flex-shrink-0 text-sm font-bold text-navy">
                  #{invoice.invoiceNumber}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-navy">
                    {invoice.clientName || "Unnamed client"}
                  </span>
                  <span className="block text-xs text-navy-500">Due {formatShortDate(invoice.dueDate)}</span>
                </span>
                <StatusBadge
                  status={getDisplayStatus(invoice.status, invoice.dueDate)}
                  className="hidden xs:inline-flex"
                />
                <span className="w-28 text-right text-sm font-bold tabular-nums text-navy">
                  {formatCurrency(invoice.totalAmount, invoice.currency)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
