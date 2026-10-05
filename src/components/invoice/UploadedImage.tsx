import { Upload, X } from "lucide-react";
import type { UploadedImageProps } from "@/src/types/types";

export default function UploadedImage({ src, onReplace, onRemove }: UploadedImageProps) {
  return (
    <div className="group relative flex h-20 items-center justify-center overflow-hidden rounded-xl border-[1.5px] border-navy/10 bg-white">
      <img src={src} alt="Uploaded logo" className="max-h-16 max-w-[220px] object-contain" />
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove image"
        className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white"
      >
        <X size={10} />
      </button>
      <button
        type="button"
        onClick={onReplace}
        className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-navy/75 py-1 text-[9px] font-black uppercase tracking-widest text-gold opacity-0 backdrop-blur-sm transition group-hover:opacity-100 focus:opacity-100"
      >
        <Upload size={8} /> Replace
      </button>
    </div>
  );
}
