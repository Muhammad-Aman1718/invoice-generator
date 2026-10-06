"use client";

import { RefreshCw } from "lucide-react";
import useDataRefresh from "@/src/hooks/useDataRefresh";
import { cn } from "@/src/lib/utils";

export default function RefreshButton() {
  const { isRefreshing, refresh } = useDataRefresh();

  return (
    <button
      type="button"
      onClick={refresh}
      disabled={isRefreshing}
      className="btn-outline"
      aria-label="Refresh data"
      title="Refresh data"
    >
      <RefreshCw size={15} className={cn(isRefreshing && "animate-spin")} aria-hidden="true" />
      <span className="hidden sm:inline">{isRefreshing ? "Refreshing…" : "Refresh"}</span>
    </button>
  );
}
