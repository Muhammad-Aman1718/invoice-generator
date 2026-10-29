import { getDocumentTitleLabel } from "@/src/constant/invoice";
import type { PreviewFooterProps } from "@/src/types/types";

export default function PreviewFooter({ invoice }: PreviewFooterProps) {
  return (
    <footer className="mt-8 flex items-center justify-between gap-4 border-t border-navy/[0.08] px-10 py-4 text-[10px] text-navy/65">
      <p className="font-semibold text-navy/70">Thank you for your business!</p>
      <p>
        {getDocumentTitleLabel(invoice.documentTitle)} #{invoice.invoiceNumber} · {invoice.currency}
      </p>
    </footer>
  );
}
