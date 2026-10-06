import PreviewLabel from "./PreviewLabel";
import type { PreviewNotesProps } from "@/src/types/types";

export default function PreviewNotes({ invoice }: PreviewNotesProps) {
  const blocks = [
    { label: "Notes", text: invoice.notes },
    { label: "Terms & conditions", text: invoice.terms },
  ].filter((block) => block.text);

  return (
    <div className="space-y-4 text-[11px] text-navy/65">
      {blocks.map((block) => (
        <div key={block.label}>
          <PreviewLabel>{block.label}</PreviewLabel>
          <p className="whitespace-pre-line leading-relaxed">{block.text}</p>
        </div>
      ))}
      {invoice.stampUrl && (
        <div className="pt-2">
          <img src={invoice.stampUrl} alt="Signature" className="mb-1 h-12 object-contain" />
          <div className="w-36 border-t border-navy/20" />
          <p className="mt-1 text-[9.5px] uppercase tracking-[0.12em] text-navy/45">Authorized signature</p>
        </div>
      )}
    </div>
  );
}
