import { getDocumentHeading } from "@/src/lib/invoiceText";
import type { PreviewHeaderProps } from "@/src/types/types";

export default function PreviewHeader({ invoice }: PreviewHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-6 px-10 pb-6 pt-8">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        {invoice.logoDataUrl && (
          <img
            src={invoice.logoDataUrl}
            alt="Business logo"
            className="h-14 max-w-[110px] flex-shrink-0 object-contain"
          />
        )}
        <div className="min-w-0">
          <p className="wrap-anywhere font-display text-lg font-bold leading-tight">
            {invoice.businessName || "Your business"}
          </p>
          {invoice.bussinessInfo && (
            <p className="wrap-anywhere mt-1 whitespace-pre-line text-[11px] leading-relaxed text-navy/70">
              {invoice.bussinessInfo}
            </p>
          )}
        </div>
      </div>
      <div className="max-w-[45%] flex-shrink-0 text-right">
        <p className="font-display text-3xl font-extrabold leading-none tracking-[0.06em]">
          {getDocumentHeading(invoice)}
        </p>
        <p className="mt-2 text-sm font-semibold text-navy/70">#{invoice.invoiceNumber}</p>
        {invoice.status === "paid" && (
          <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Paid
          </span>
        )}
      </div>
    </header>
  );
}
