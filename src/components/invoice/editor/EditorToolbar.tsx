import Link from "next/link";
import { ArrowLeft, Download, Loader2, Save, SplitSquareHorizontal } from "lucide-react";
import StatusSelect from "./StatusSelect";
import EditPreviewTabs from "./EditPreviewTabs";
import { ROUTES } from "@/src/constant/routes";
import { cn } from "@/src/lib/utils";
import type { EditorToolbarProps } from "@/src/types/types";

export default function EditorToolbar(props: EditorToolbarProps) {
  const { title, subtitle, tab, showPreviewPanel, isSaving, isDownloading } = props;
  return (
    <div className="z-30 flex-shrink-0 border-b border-navy/10 bg-white">
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href={ROUTES.invoices}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-mist text-navy transition hover:bg-mist-dark"
            aria-label="Back to invoices"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-black text-navy sm:text-base">{title}</h1>
            <p className="hidden text-[11px] font-medium text-navy-500 xs:block">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <StatusSelect className="hidden sm:block" />
          <button
            onClick={props.onTogglePreview}
            aria-pressed={showPreviewPanel}
            className={cn(
              "btn-outline btn-sm hidden h-9 lg:inline-flex",
              showPreviewPanel && "border-gold bg-gold/10",
            )}
          >
            <SplitSquareHorizontal size={14} /> Preview
          </button>
          <button
            onClick={props.onDownload}
            disabled={isDownloading}
            className="btn-outline btn-sm h-9"
            aria-label="Download PDF"
          >
            {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={props.onSave}
            disabled={isSaving}
            className="btn-primary btn-sm h-9"
            aria-label="Save invoice"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span className="hidden xs:inline">Save</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 pb-2.5 lg:hidden">
        <StatusSelect className="sm:hidden" />
        <EditPreviewTabs tab={tab} onChange={props.onTabChange} />
      </div>
    </div>
  );
}
