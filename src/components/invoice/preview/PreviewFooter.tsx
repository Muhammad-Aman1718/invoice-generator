import type { PreviewFooterProps } from "@/src/types/types";

export default function PreviewFooter({ invoice }: PreviewFooterProps) {
  const details = [
    invoice.businessName,
    invoice.currency,
    invoice.overallDiscount > 0 && `${invoice.overallDiscount}% Discount`,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <div className="flex items-center justify-between border-t border-navy/10 px-9 py-2 font-mono text-[8px] text-navy/30">
      <p>{details}</p>
      <p className="flex items-center gap-1.5">
        <span className="inline-block h-[5px] w-[5px] rounded-full bg-gold" />
        Invoice #{invoice.invoiceNumber}
      </p>
    </div>
  );
}
