"use client";

import PreviewHeader from "./PreviewHeader";
import PreviewParties from "./PreviewParties";
import PreviewLineItems from "./PreviewLineItems";
import PreviewNotes from "./PreviewNotes";
import PreviewTotals from "./PreviewTotals";
import PreviewFooter from "./PreviewFooter";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { formatCurrency } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import type { InvoicePreviewProps } from "@/src/types/types";

/** Printer-friendly, ink-saving HTML version of the invoice (white background, thin borders). */
export default function InvoicePreview({ id = "invoicePreview", className }: InvoicePreviewProps) {
  const invoice = useInvoiceStore();
  const formatMoney = (amount: number) => formatCurrency(amount, invoice.currency);

  return (
    <article
      id={id}
      className={cn(
        "invoice-sheet w-full max-w-[794px] bg-white font-serif text-[11px] leading-normal text-navy",
        className,
      )}
    >
      <PreviewHeader invoice={invoice} />
      <PreviewParties invoice={invoice} />
      <PreviewLineItems invoice={invoice} formatMoney={formatMoney} />
      <div className="avoid-break mt-2 grid grid-cols-2 items-start gap-6 border-t border-navy/10 px-9 pb-5 pt-3">
        <PreviewNotes invoice={invoice} />
        <PreviewTotals invoice={invoice} formatMoney={formatMoney} />
      </div>
      <PreviewFooter invoice={invoice} />
    </article>
  );
}
