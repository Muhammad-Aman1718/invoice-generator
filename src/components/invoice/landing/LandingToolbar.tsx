import { Download, Eye, FileText, Loader2, Save } from "lucide-react";
import type { LandingToolbarProps } from "@/src/types/types";

export default function LandingToolbar({
  isSaving,
  isDownloading,
  onPreview,
  onDownload,
  onSave,
}: LandingToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl bg-navy px-3 py-3 shadow-card sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold/15">
          <FileText size={14} className="text-gold" />
        </span>
        <div className="min-w-0 max-xs:hidden">
          <h2 className="truncate text-[13px] font-black leading-tight text-white">Builder</h2>
          <p className="truncate text-[9px] text-white/70">Fill · Preview · Export</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPreview}
          className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80 hover:bg-white/10 sm:flex"
        >
          <Eye size={13} /> Preview
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          aria-label="Download PDF"
          className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 text-white/80 hover:bg-white/10 disabled:opacity-50 min-[400px]:px-3"
        >
          {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
          <span className="hidden text-xs font-bold min-[400px]:inline">PDF</span>
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          aria-label="Save invoice"
          className="btn-primary btn-sm h-8"
        >
          {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          <span className="hidden min-[320px]:inline">Save</span>
        </button>
      </div>
    </div>
  );
}
