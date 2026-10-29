import type { PreviewNotesProps } from "@/src/types/types";

export default function PreviewSignature({ invoice }: PreviewNotesProps) {
  if (!invoice.stampUrl) return null;
  return (
    <div className="avoid-break mx-10 mt-6 flex justify-end">
      <div className="w-44 text-center">
        <img src={invoice.stampUrl} alt="Signature" className="mx-auto mb-1 h-12 object-contain" />
        <div className="border-t border-navy/20" />
        <p className="mt-1 text-[9.5px] uppercase tracking-[0.12em] text-navy/65">Authorized signature</p>
      </div>
    </div>
  );
}
