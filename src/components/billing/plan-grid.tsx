"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { PLAN_ORDER, PLANS, type BillingInterval, type PlanId } from "@/src/config/plans";
import { api } from "@/src/lib/api-client";
import { cn } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";

interface Props {
  /** Signed-in plan; omit on the public pricing page. */
  currentPlan?: PlanId;
  mode: "public" | "dashboard";
}

export function PlanGrid({ currentPlan, mode }: Props) {
  const [interval, setInterval] = useState<BillingInterval>("month");
  const [loading, setLoading] = useState<PlanId | null>(null);

  const upgrade = async (plan: PlanId) => {
    setLoading(plan);
    try {
      const { url } = await api.billing.checkout(plan, interval);
      window.location.href = url;
    } catch (err) {
      showToast.info("Upgrade", err instanceof Error ? err.message : "Please try again.");
      setLoading(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-2xl border border-navy/10 bg-white p-1 shadow-card" role="radiogroup" aria-label="Billing period">
          {(["month", "year"] as BillingInterval[]).map((i) => (
            <button
              key={i}
              role="radio"
              aria-checked={interval === i}
              onClick={() => setInterval(i)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-black transition",
                interval === i ? "bg-navy text-white" : "text-navy-500 hover:text-navy",
              )}
            >
              {i === "month" ? "Monthly" : "Yearly"}
              {i === "year" && (
                <span className={cn("ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]", interval === i ? "bg-gold text-navy" : "bg-gold/20 text-navy")}>
                  2 months free
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLAN_ORDER.map((id) => {
          const plan = PLANS[id];
          const price = plan.price[interval];
          const isCurrent = currentPlan === id;
          const isLower = currentPlan ? PLAN_ORDER.indexOf(id) < PLAN_ORDER.indexOf(currentPlan) : false;

          let cta: React.ReactNode;
          if (mode === "public") {
            cta = (
              <Link
                href={id === "free" ? "/auth/sign-up" : `/auth/sign-up?next=${encodeURIComponent("/dashboard/billing")}`}
                className={plan.highlighted ? "btn-primary w-full" : "btn-navy w-full"}
              >
                {id === "free" ? "Start for free" : `Get ${plan.name}`}
              </Link>
            );
          } else if (isCurrent) {
            cta = (
              <span className="btn w-full cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700">
                <Check size={15} /> Current plan
              </span>
            );
          } else if (id === "free" || isLower) {
            cta = (
              <span className="btn w-full cursor-default border border-navy/10 text-navy-400">
                Included in your plan
              </span>
            );
          } else {
            cta = (
              <button
                className={plan.highlighted ? "btn-primary w-full" : "btn-navy w-full"}
                onClick={() => upgrade(id)}
                disabled={loading !== null}
              >
                {loading === id && <Loader2 size={15} className="animate-spin" />}
                Upgrade to {plan.name}
              </button>
            );
          }

          return (
            <div
              key={id}
              className={cn(
                "relative flex flex-col rounded-3xl border-2 bg-white p-6 sm:p-7",
                plan.highlighted ? "border-gold shadow-lift" : "border-navy/[0.08] shadow-card",
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[11px] font-black uppercase tracking-wider text-navy">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-black text-navy">{plan.name}</h3>
              <p className="mb-5 text-sm text-navy-500">{plan.tagline}</p>
              <p className="mb-1 flex items-baseline gap-1">
                <span className="text-4xl font-black text-navy">${price}</span>
                <span className="text-sm font-semibold text-navy-500">/{interval === "month" ? "mo" : "yr"}</span>
              </p>
              <p className="mb-6 h-4 text-xs text-navy-500">
                {price > 0 && interval === "year" ? `≈ $${(price / 12).toFixed(2)}/mo billed yearly` : price === 0 ? "Free forever" : "Billed monthly, cancel anytime"}
              </p>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-navy-500">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gold/20">
                      <Check size={11} className="text-navy" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {cta}
            </div>
          );
        })}
      </div>
    </div>
  );
}
