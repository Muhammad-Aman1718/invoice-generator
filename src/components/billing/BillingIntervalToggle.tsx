import { cn } from "@/src/lib/utils";
import { BILLING_INTERVAL_OPTIONS } from "@/src/constant/plans";
import type { BillingIntervalToggleProps } from "@/src/types/types";

export default function BillingIntervalToggle({ value, onChange }: BillingIntervalToggleProps) {
  return (
    <div
      className="inline-flex rounded-2xl border border-navy/10 bg-white p-1 shadow-card"
      role="radiogroup"
      aria-label="Billing period"
    >
      {BILLING_INTERVAL_OPTIONS.map((interval) => {
        const active = value === interval.value;
        return (
          <button
            key={interval.value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(interval.value)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-bold transition",
              active ? "bg-navy text-white" : "text-navy-500 hover:text-navy",
            )}
          >
            {interval.label}
            {interval.value === "year" && (
              <span
                className={cn(
                  "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]",
                  active ? "bg-gold text-navy" : "bg-gold/20 text-navy",
                )}
              >
                2 months free
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
