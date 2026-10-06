import PreviewLabel from "./PreviewLabel";
import { formatInvoiceDate } from "@/src/lib/format";
import { cn } from "@/src/lib/utils";
import type { PreviewMetaProps } from "@/src/types/types";

export default function PreviewMeta({ invoice, formatMoney }: PreviewMetaProps) {
  const details = [
    { label: "Issue date", value: invoice.issueDate ? formatInvoiceDate(invoice.issueDate) : "-" },
    { label: "Due date", value: invoice.dueDate ? formatInvoiceDate(invoice.dueDate) : "-" },
    ...(invoice.poNumber ? [{ label: "PO number", value: invoice.poNumber }] : []),
  ];

  return (
    <div className="avoid-break mx-10 grid grid-cols-4 gap-3">
      {details.map((detail) => (
        <div key={detail.label} className="rounded-xl border border-navy/[0.08] px-4 py-3">
          <PreviewLabel>{detail.label}</PreviewLabel>
          <p className="text-[13px] font-semibold">{detail.value}</p>
        </div>
      ))}
      <div className={cn("rounded-xl bg-navy px-4 py-3 text-white", details.length === 2 && "col-span-2")}>
        <PreviewLabel tone="inverse">Amount due</PreviewLabel>
        <p className="truncate font-display text-[15px] font-bold text-gold">
          {formatMoney(invoice.totalAmount)}
        </p>
      </div>
    </div>
  );
}
