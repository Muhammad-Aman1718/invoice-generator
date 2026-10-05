import { INVOICE_FILTERS, STATUS_META } from "@/src/constant/invoice";
import { cn } from "@/src/lib/utils";
import type { StatusFilterTabsProps } from "@/src/types/types";

export default function StatusFilterTabs({ value, counts, onChange }: StatusFilterTabsProps) {
  return (
    <div
      className="custom-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
      role="tablist"
      aria-label="Filter by status"
    >
      {INVOICE_FILTERS.map((filter) => {
        const active = value === filter;
        return (
          <button
            key={filter}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(filter)}
            className={cn(
              "flex flex-shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition",
              active ? "bg-navy text-white" : "bg-white text-navy-500 hover:text-navy",
            )}
          >
            {filter === "all" ? "All" : STATUS_META[filter].label}
            <span className={cn("rounded-full px-1.5 text-[10px]", active ? "bg-gold text-navy" : "bg-mist")}>
              {counts[filter] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
