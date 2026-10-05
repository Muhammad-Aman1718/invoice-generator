import { PLAN_ORDER, PLANS } from "@/src/constant/plans";
import { FULL_PERCENT } from "@/src/constant/app";
import type { PlanDistributionProps } from "@/src/types/types";

export default function PlanDistribution({ byPlan, totalUsers }: PlanDistributionProps) {
  return (
    <ul className="space-y-3">
      {PLAN_ORDER.map((plan) => {
        const share = totalUsers ? (byPlan[plan] / totalUsers) * FULL_PERCENT : 0;
        return (
          <li key={plan}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-semibold text-navy">{PLANS[plan].name}</span>
              <span className="tabular-nums text-navy-500">
                {byPlan[plan]} · {Math.round(share)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-mist">
              <div className="h-full rounded-full bg-navy-400" style={{ width: `${share}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
