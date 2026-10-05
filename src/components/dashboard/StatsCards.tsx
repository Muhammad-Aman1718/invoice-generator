import { STAT_TONES } from "@/src/constant/theme";
import { cn } from "@/src/lib/utils";
import type { StatsCardsProps } from "@/src/types/types";

export default function StatsCards({ items }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, hint, icon: Icon, tone = "navy" }) => (
        <div key={label} className="panel relative overflow-hidden p-5">
          <div className={cn("absolute bottom-4 left-0 top-4 w-[3px] rounded-full", STAT_TONES[tone].bar)} />
          <div className="flex items-start justify-between gap-3 pl-3">
            <div className="min-w-0">
              <p className="eyebrow mb-2">{label}</p>
              <p className="truncate text-2xl font-black tabular-nums text-navy">{value}</p>
              {hint && <p className="mt-1 text-xs font-medium text-navy-500">{hint}</p>}
            </div>
            <div
              className={cn(
                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl",
                STAT_TONES[tone].icon,
              )}
            >
              <Icon size={17} aria-hidden="true" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
