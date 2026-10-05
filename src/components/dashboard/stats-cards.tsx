import type { LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface StatItem {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: "navy" | "green" | "amber" | "red";
}

const TONES = {
  navy: { bar: "bg-gold", icon: "bg-gold/10 text-gold-dark" },
  green: { bar: "bg-emerald-500", icon: "bg-emerald-50 text-emerald-600" },
  amber: { bar: "bg-amber-500", icon: "bg-amber-50 text-amber-600" },
  red: { bar: "bg-red-500", icon: "bg-red-50 text-red-600" },
};

export function StatsCards({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, hint, icon: Icon, tone = "navy" }) => (
        <div key={label} className="panel relative overflow-hidden p-5">
          <div className={cn("absolute bottom-4 left-0 top-4 w-[3px] rounded-full", TONES[tone].bar)} />
          <div className="flex items-start justify-between gap-3 pl-3">
            <div className="min-w-0">
              <p className="eyebrow mb-2">{label}</p>
              <p className="truncate text-2xl font-black tabular-nums text-navy">{value}</p>
              {hint && <p className="mt-1 text-xs font-medium text-navy-500">{hint}</p>}
            </div>
            <div className={cn("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl", TONES[tone].icon)}>
              <Icon size={17} aria-hidden="true" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
