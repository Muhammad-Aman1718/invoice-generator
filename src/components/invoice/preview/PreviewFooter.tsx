import type { PreviewFooterProps } from "@/src/types/types";

export default function PreviewFooter({ invoice }: PreviewFooterProps) {
  return (
    <footer className="mt-8 flex items-center justify-between gap-4 border-t border-navy/[0.08] px-10 py-4 text-[10px] text-navy/45">
      <p className="font-semibold text-navy/60">Thank you for your business!</p>
      <p className="flex items-center gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
        Invoice #{invoice.invoiceNumber} · {invoice.currency}
      </p>
    </footer>
  );
}
