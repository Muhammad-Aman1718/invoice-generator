import Link from "next/link";
import { ArrowLeft, Download, Eye, Loader2, Save } from "lucide-react";
import { ROUTES } from "@/src/constant/routes";
import type { EditorToolbarProps } from "@/src/types/types";

/** Sticky bar: back link, title + save state, and the three invoice actions (Save is primary). */
export default function EditorToolbar(props: EditorToolbarProps) {
  const { title, shortTitle, subtitle, isSaving, isDownloading, onPreview, onDownload, onSave } = props;
  return (
    <div className="glass-bar sticky top-14 z-30 border-b border-navy/[0.07] lg:top-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={ROUTES.invoices}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-navy/10 text-navy transition hover:bg-mist"
            aria-label="Back to invoices"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-navy sm:text-lg">
              <span className="sm:hidden" aria-hidden="true">
                {shortTitle}
              </span>
              <span className="max-sm:sr-only">{title}</span>
            </h1>
            <p className="truncate text-xs text-navy-500" aria-live="polite">
              {subtitle}
            </p>
          </div>
        </div>
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
    </div>
  );
}
