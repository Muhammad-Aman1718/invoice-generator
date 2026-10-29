import PreviewLabel from "./PreviewLabel";
import type { PreviewNotesProps } from "@/src/types/types";

/** Bank / wallet details beside the totals, where clients look when they pay. */
export default function PreviewPayment({ invoice }: PreviewNotesProps) {
  if (!invoice.paymentDetails.trim()) return <div />;
  return (
    <div className="avoid-break min-w-0 rounded-xl border border-navy/[0.08] px-4 py-3.5">
      <PreviewLabel>Payment details</PreviewLabel>
      <p className="wrap-anywhere whitespace-pre-line text-[11px] leading-relaxed text-navy/75">
        {invoice.paymentDetails.trim()}
      </p>
    </div>
  );
}
