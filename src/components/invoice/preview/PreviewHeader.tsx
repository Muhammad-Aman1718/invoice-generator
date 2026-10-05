import { formatInvoiceDate } from "@/src/lib/format";
import type { PreviewHeaderProps } from "@/src/types/types";

export default function PreviewHeader({ invoice }: PreviewHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-6 border-b-2 border-navy px-9 pb-[18px] pt-7">
      <div className="flex flex-1 items-start gap-3">
        {invoice.logoDataUrl && (
          <img
            src={invoice.logoDataUrl}
            alt="Business logo"
            className="h-12 max-w-[80px] flex-shrink-0 object-contain"
          />
        )}
        <div>
          {invoice.businessName && (
            <p className="text-[13px] font-bold leading-tight">{invoice.businessName}</p>
          )}
          {invoice.bussinessInfo && (
            <p className="mt-1 whitespace-pre-line text-[9px] leading-normal text-navy/55">
              {invoice.bussinessInfo}
            </p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-[26px] font-bold leading-none tracking-[0.12em]">INVOICE</p>
        <div className="my-1.5 ml-auto h-0.5 w-16 bg-gold" />
        <p className="font-mono text-[11px] font-bold">#{invoice.invoiceNumber}</p>
        {invoice.issueDate && (
          <p className="mt-0.5 text-[9px] text-navy/55">Issued: {formatInvoiceDate(invoice.issueDate)}</p>
        )}
        {invoice.dueDate && (
          <p className="text-[9px] text-navy/55">Due: {formatInvoiceDate(invoice.dueDate)}</p>
        )}
      </div>
    </header>
  );
}
