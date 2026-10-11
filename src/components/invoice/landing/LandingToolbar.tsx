import { Download, Eye, Loader2, Save } from "lucide-react";
import type { LandingToolbarProps } from "@/src/types/types";

export default function LandingToolbar({
  isSaving,
  isDownloading,
  onPreview,
  onDownload,
  onSave,
}: LandingToolbarProps) {
  return (
    <div className="glass-bar sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-navy/[0.08] px-4 py-3 shadow-card sm:px-5">
      <p className="text-sm text-navy-500">
        <span className="font-semibold text-navy">Free builder.</span> Your draft stays in this browser.
      </p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onPreview} className="btn-outline h-10" aria-label="Preview invoice">
          <Eye size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Preview</span>
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          className="btn-outline h-10"
          aria-label="Download PDF"
        >
          {isDownloading ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Download size={16} aria-hidden="true" />
          )}
          <span className="hidden sm:inline">PDF</span>
        </button>
        <button type="button" onClick={onSave} disabled={isSaving} className="btn-primary h-10">
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Save size={16} aria-hidden="true" />
          )}
          Save
        </button>
      </div>
    </div>
  );
}
