import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { MONTHS_PER_YEAR } from "@/src/constant/app";
import type { PlanCardProps } from "@/src/types/types";

function getPriceNote(price: number, interval: string): string {
  if (price === 0) return "Free forever";
  if (interval === "year") return `≈ $${(price / MONTHS_PER_YEAR).toFixed(2)}/mo billed yearly`;
  return "Billed monthly, cancel anytime";
}

export default function PlanCard({ plan, interval, action }: PlanCardProps) {
  const price = plan.price[interval];
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border-2 bg-white p-6 sm:p-7",
        plan.highlighted ? "border-gold shadow-lift" : "border-navy/[0.08] shadow-card",
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
          Most popular
        </span>
      )}
      <h3 className="text-xl font-bold text-navy">{plan.name}</h3>
      <p className="mb-5 text-sm text-navy-500">{plan.tagline}</p>
      <p className="mb-1 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-navy">${price}</span>
        <span className="text-sm font-semibold text-navy-500">/{interval === "month" ? "mo" : "yr"}</span>
      </p>
      <p className="mb-6 h-4 text-xs text-navy-500">{getPriceNote(price, interval)}</p>
      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-navy-500">
            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gold/20">
              <Check size={11} className="text-navy" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      {action}
    </div>
  );
}
