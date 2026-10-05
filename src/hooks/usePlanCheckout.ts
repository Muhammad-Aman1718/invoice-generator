"use client";

import { useState } from "react";
import { api } from "@/src/lib/apiClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import type { BillingInterval, PlanId } from "@/src/types/types";

/** Start Stripe Checkout for a plan; explains manual upgrades when payments are off. */
export default function usePlanCheckout() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);

  const startCheckout = async (plan: PlanId, interval: BillingInterval) => {
    setLoadingPlan(plan);
    try {
      const { url } = await api.billing.startCheckout(plan, interval);
      window.location.href = url;
    } catch (error) {
      showToast.info("Upgrade", getErrorMessage(error, "Please try again."));
      setLoadingPlan(null);
    }
  };

  return { loadingPlan, startCheckout };
}
