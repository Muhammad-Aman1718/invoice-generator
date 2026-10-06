"use client";

import PreviewHeader from "./PreviewHeader";
import PreviewMeta from "./PreviewMeta";
import PreviewParties from "./PreviewParties";
import PreviewLineItems from "./PreviewLineItems";
import PreviewNotes from "./PreviewNotes";
import PreviewTotals from "./PreviewTotals";
import PreviewFooter from "./PreviewFooter";
import FitToWidth from "@/src/components/ui/FitToWidth";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { INVOICE_SHEET_WIDTH } from "@/src/constant/invoice";
import { formatCurrency } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import type { InvoicePreviewProps } from "@/src/types/types";

/** A4-proportioned HTML version of the invoice; mirrors the PDF layout. */
export default function InvoicePreview({
  id = "invoicePreview",
  className,
  invoice: sample,
}: InvoicePreviewProps) {
  const draft = useInvoiceStore();
  const invoice = sample ?? draft;
  const formatMoney = (amount: number) => formatCurrency(amount, invoice.currency);

  return (
    <FitToWidth designWidth={INVOICE_SHEET_WIDTH}>
      <article
        id={id}
        className={cn(
          "invoice-sheet tabular w-full overflow-hidden bg-white font-sans text-[12px] leading-normal text-navy",
          className,
        )}
      >
        <div className="flex h-1.5" aria-hidden="true">
          <div className="flex-1 bg-navy" />
          <div className="w-28 bg-gold" />
        </div>
        <PreviewHeader invoice={invoice} />
        <PreviewMeta invoice={invoice} formatMoney={formatMoney} />
        <PreviewParties invoice={invoice} />
        <PreviewLineItems invoice={invoice} formatMoney={formatMoney} />
        <div className="avoid-break grid grid-cols-[1fr_280px] items-start gap-8 px-10 pt-6">
          <PreviewNotes invoice={invoice} />
          <PreviewTotals invoice={invoice} formatMoney={formatMoney} />
        </div>
        <PreviewFooter invoice={invoice} />
      </article>
    </FitToWidth>
  );
}
