"use client";

import { useState } from "react";
import BillingIntervalToggle from "./BillingIntervalToggle";
import PlanCard from "./PlanCard";
import PlanAction from "./PlanAction";
import usePlanCheckout from "@/src/hooks/usePlanCheckout";
import { PLAN_ORDER, PLANS } from "@/src/constant/plans";
import type { BillingInterval, PlanGridProps } from "@/src/types/types";

export default function PlanGrid({ currentPlan, mode }: PlanGridProps) {
  const [interval, setInterval] = useState<BillingInterval>("month");
  const { loadingPlan, startCheckout } = usePlanCheckout();

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <BillingIntervalToggle value={interval} onChange={setInterval} />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PLAN_ORDER.map((id) => (
          <PlanCard
            key={id}
            plan={PLANS[id]}
            interval={interval}
            action={
              <PlanAction
                plan={PLANS[id]}
                mode={mode}
                currentPlan={currentPlan}
                isLoading={loadingPlan === id}
                disabled={loadingPlan !== null}
                onUpgrade={(plan) => startCheckout(plan, interval)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
