import PreviewLabel from "./PreviewLabel";
import { getCurrency } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import type { PreviewPartiesProps } from "@/src/types/types";

export default function PreviewParties({ invoice }: PreviewPartiesProps) {
  const hasShipTo = Boolean(invoice.shipTo);
  return (
    <div
      className={cn(
        "avoid-break grid gap-5 border-b border-navy/10 px-9 py-3.5",
        hasShipTo ? "grid-cols-3" : "grid-cols-2",
      )}
    >
      <div>
        <PreviewLabel accent="gold">Bill To</PreviewLabel>
        {invoice.clientName && <p className="mb-0.5 text-[11px] font-bold">{invoice.clientName}</p>}
        {invoice.clientAddress && (
          <p className="whitespace-pre-line text-[9.5px] leading-normal text-navy/60">
            {invoice.clientAddress}
          </p>
        )}
      </div>
      {hasShipTo && (
        <div>
          <PreviewLabel>Ship To</PreviewLabel>
          <p className="whitespace-pre-line text-[9.5px] leading-normal text-navy/60">{invoice.shipTo}</p>
        </div>
      )}
      <div className={hasShipTo ? "text-left" : "text-right"}>
        <PreviewLabel>Details</PreviewLabel>
        {invoice.poNumber && (
          <p className="text-[9.5px]">
            PO: <strong>{invoice.poNumber}</strong>
          </p>
        )}
        <p className="text-[9.5px]">
          Currency: <strong className="font-mono">{invoice.currency}</strong> (
          {getCurrency(invoice.currency).symbol})
        </p>
        {invoice.taxRate > 0 && (
          <p className="text-[9.5px]">
            Tax: <strong>{invoice.taxRate}%</strong>
          </p>
        )}
      </div>
    </div>
  );
}
