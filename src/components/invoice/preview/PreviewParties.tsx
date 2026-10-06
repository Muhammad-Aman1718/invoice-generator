import PreviewLabel from "./PreviewLabel";
import { cn } from "@/src/lib/utils";
import type { PreviewPartiesProps } from "@/src/types/types";

export default function PreviewParties({ invoice }: PreviewPartiesProps) {
  const hasShipTo = Boolean(invoice.shipTo);
  return (
    <div className={cn("avoid-break mx-10 mt-5 grid gap-3", hasShipTo ? "grid-cols-2" : "grid-cols-1")}>
      <div className="rounded-xl bg-mist/70 px-4 py-3.5">
        <PreviewLabel>Bill to</PreviewLabel>
        <p className="text-[13px] font-semibold">{invoice.clientName || "Client name"}</p>
        {invoice.clientAddress && (
          <p className="mt-0.5 whitespace-pre-line text-[11px] leading-relaxed text-navy/60">
            {invoice.clientAddress}
          </p>
        )}
      </div>
      {hasShipTo && (
        <div className="rounded-xl bg-mist/70 px-4 py-3.5">
          <PreviewLabel>Ship to</PreviewLabel>
          <p className="whitespace-pre-line text-[11px] leading-relaxed text-navy/70">{invoice.shipTo}</p>
        </div>
      )}
    </div>
  );
}
