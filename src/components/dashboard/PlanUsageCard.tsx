import Link from "next/link";
import { Sparkles } from "lucide-react";
import { FULL_PERCENT, USAGE_WARNING_PERCENT } from "@/src/constant/app";
import { ROUTES } from "@/src/constant/routes";
import { cn } from "@/src/lib/utils";
import type { PlanUsageCardProps } from "@/src/types/types";

export default function PlanUsageCard({ viewer }: PlanUsageCardProps) {
  const { used, limit } = viewer.usage;
  const percent = limit ? Math.min(FULL_PERCENT, Math.round((used / limit) * FULL_PERCENT)) : 0;

  return (
    <div className="rounded-xl bg-white/[0.06] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-white">{viewer.planName} plan</span>
        {!viewer.isPaid && (
          <Link
            href={ROUTES.billing}
            className="flex items-center gap-1 text-[11px] font-bold text-gold hover:underline"
          >
            <Sparkles size={11} /> Upgrade
          </Link>
        )}
      </div>
      {limit ? (
        <>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className={cn(
                "h-full rounded-full",
                percent >= USAGE_WARNING_PERCENT ? "bg-red-400" : "bg-gold",
              )}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-white/60">
            {used} / {limit} invoices this month
          </p>
        </>
      ) : (
        <p className="text-[11px] text-white/60">Unlimited invoices</p>
      )}
    </div>
  );
}
