import { FULL_PERCENT, USAGE_WARNING_PERCENT } from "@/src/constant/app";
import { cn } from "@/src/lib/utils";
import type { UsageMeterProps } from "@/src/types/types";

export default function UsageMeter({ label, used, limit }: UsageMeterProps) {
  const percent = limit ? Math.min(FULL_PERCENT, Math.round((used / limit) * FULL_PERCENT)) : FULL_PERCENT;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-semibold text-navy">{label}</span>
        <span className="tabular-nums text-navy-500">
          {limit ? `${used} / ${limit}` : `${used} · Unlimited`}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-mist">
        <div
          className={cn(
            "h-full rounded-full",
            limit && percent >= USAGE_WARNING_PERCENT ? "bg-red-500" : "bg-gold",
            !limit && "opacity-35",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
