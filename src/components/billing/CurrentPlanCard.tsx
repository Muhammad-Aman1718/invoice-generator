import { CheckCircle2 } from "lucide-react";
import ManageBillingButton from "./ManageBillingButton";
import { formatLongDate } from "@/src/lib/format";
import type { CurrentPlanCardProps } from "@/src/types/types";

export default function CurrentPlanCard({ plan, subscription }: CurrentPlanCardProps) {
  const periodEnd = subscription.currentPeriodEnd ? formatLongDate(subscription.currentPeriodEnd) : null;
  const renewalText = periodEnd
    ? ` · ${subscription.cancelAtPeriodEnd ? "ends" : "renews"} ${periodEnd}`
    : "";
  const priceText =
    plan.id === "free"
      ? "Free forever. Upgrade any time."
      : `$${plan.price[subscription.billingInterval]} / ${subscription.billingInterval}${renewalText}`;

  return (
    <section className="panel p-5 sm:p-6 lg:col-span-2">
      <p className="eyebrow mb-2">Current plan</p>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-navy">{plan.name}</h2>
          <p className="text-sm text-navy-500">{priceText}</p>
        </div>
        {subscription.hasBillingPortal && <ManageBillingButton />}
      </div>
      {subscription.cancelAtPeriodEnd && periodEnd && (
        <p className="mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
          Your subscription is set to cancel. You keep {plan.name} features until {periodEnd}.
        </p>
      )}
      <ul className="grid gap-2 sm:grid-cols-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-navy-500">
            <CheckCircle2 size={14} className="flex-shrink-0 text-emerald-600" /> {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}
