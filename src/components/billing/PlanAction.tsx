import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { PLAN_ORDER } from "@/src/constant/plans";
import { ROUTES } from "@/src/constant/routes";
import type { PlanActionProps } from "@/src/types/types";

/** The call-to-action at the bottom of a plan card. */
export default function PlanAction({
  plan,
  mode,
  currentPlan,
  isLoading,
  disabled,
  onUpgrade,
}: PlanActionProps) {
  const buttonClass = plan.highlighted ? "btn-primary w-full" : "btn-navy w-full";

  if (mode === "public") {
    const href =
      plan.id === "free" ? ROUTES.signUp : `${ROUTES.signUp}?next=${encodeURIComponent(ROUTES.billing)}`;
    return (
      <Link href={href} className={buttonClass}>
        {plan.id === "free" ? "Start for free" : `Get ${plan.name}`}
      </Link>
    );
  }
  if (currentPlan === plan.id) {
    return (
      <span className="btn w-full cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700">
        <Check size={15} /> Current plan
      </span>
    );
  }
  const isLowerTier = currentPlan && PLAN_ORDER.indexOf(plan.id) < PLAN_ORDER.indexOf(currentPlan);
  if (plan.id === "free" || isLowerTier) {
    return (
      <span className="btn w-full cursor-default border border-navy/10 text-navy-400">
        Included in your plan
      </span>
    );
  }
  return (
    <button className={buttonClass} onClick={() => onUpgrade(plan.id)} disabled={disabled}>
      {isLoading && <Loader2 size={15} className="animate-spin" />}
      Upgrade to {plan.name}
    </button>
  );
}
