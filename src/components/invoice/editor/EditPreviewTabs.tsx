import { Edit3, Eye } from "lucide-react";
import { EDITOR_TABS } from "@/src/constant/invoice";
import { cn } from "@/src/lib/utils";
import type { EditPreviewTabsProps } from "@/src/types/types";

export default function EditPreviewTabs({ tab, onChange, className }: EditPreviewTabsProps) {
  return (
    <div className={cn("flex flex-1 rounded-xl bg-mist p-0.5", className)} role="tablist">
      {EDITOR_TABS.map((value) => (
        <button
          key={value}
          role="tab"
          aria-selected={tab === value}
          onClick={() => onChange(value)}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold capitalize transition",
            tab === value ? "bg-navy text-white" : "text-navy-500",
          )}
        >
          {value === "edit" ? <Edit3 size={12} /> : <Eye size={12} />} {value}
        </button>
      ))}
    </div>
  );
}
