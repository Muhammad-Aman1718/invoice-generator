import type { ReportRange, ReportRangeKey } from "@/src/types/types";

export const REPORT_RANGES: Record<ReportRangeKey, ReportRange> = {
  "30d": { label: "Last 30 days", days: 30 },
  "90d": { label: "Last 90 days", days: 90 },
  "12m": { label: "Last 12 months", days: 365 },
  all: { label: "All time", days: null },
};

export const DEFAULT_REPORT_RANGE: ReportRangeKey = "12m";
