import Link from "next/link";
import { REPORT_RANGES } from "@/src/constant/reports";
import { ROUTES } from "@/src/constant/routes";
import { cn } from "@/src/lib/utils";
import type { ReportRangeKey, ReportRangeTabsProps } from "@/src/types/types";

export default function ReportRangeTabs({ current }: ReportRangeTabsProps) {
  return (
    <nav className="custom-scrollbar flex gap-1.5 overflow-x-auto pb-1" aria-label="Date range">
      {(Object.keys(REPORT_RANGES) as ReportRangeKey[]).map((key) => (
        <Link
          key={key}
          href={`${ROUTES.reports}?range=${key}`}
          aria-current={key === current ? "page" : undefined}
          className={cn(
            "flex-shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition",
            key === current ? "bg-navy text-white" : "bg-white text-navy-500 hover:text-navy",
          )}
        >
          {REPORT_RANGES[key].label}
        </Link>
      ))}
    </nav>
  );
}
