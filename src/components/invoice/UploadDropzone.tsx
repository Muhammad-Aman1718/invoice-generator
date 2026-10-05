import { ImageIcon } from "lucide-react";
import { LOGO_MAX_SIZE } from "@/src/constant/app";
import type { UploadDropzoneProps } from "@/src/types/types";

export default function UploadDropzone({ onBrowse }: UploadDropzoneProps) {
  return (
    <button
      type="button"
      onClick={onBrowse}
      className="flex h-20 w-full flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-navy/15 bg-navy/[0.02] transition hover:border-gold hover:bg-gold/[0.04]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/[0.06]">
        <ImageIcon size={14} className="text-navy-400" />
      </span>
      <span className="text-[10px] font-bold text-navy/80">
        Upload image · max {LOGO_MAX_SIZE.maxWidth}×{LOGO_MAX_SIZE.maxHeight}px
      </span>
    </button>
  );
}
