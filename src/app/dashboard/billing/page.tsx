import Link from "next/link";
import { CreditCard } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import PlanGrid from "@/src/components/billing/PlanGrid";
import CheckoutBanner from "@/src/components/billing/CheckoutBanner";
import CurrentPlanCard from "@/src/components/billing/CurrentPlanCard";
import UsageCard from "@/src/components/billing/UsageCard";
import ManualUpgradeNotice from "@/src/components/billing/ManualUpgradeNotice";
import { countInvoicesThisMonth, getViewer, listClients } from "@/src/lib/server/data";
import { isStripeConfigured } from "@/src/lib/server/stripe";
import type { BillingPageProps } from "@/src/types/types";

export const metadata = { title: "Billing & Plan" };

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const viewer = await getViewer();
  const { checkout } = await searchParams;
  const [invoicesUsed, clients] = await Promise.all([countInvoicesThisMonth(viewer), listClients(viewer)]);
  const { subscription, plan } = viewer;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={CreditCard}
        title="Billing & Plan"
        description="Your subscription, usage and upgrades."
      />
      <CheckoutBanner
        checkout={checkout}
        isPastDue={subscription.status === "past_due"}
        planName={plan.name}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <CurrentPlanCard plan={plan} subscription={subscription} />
        <UsageCard plan={plan} invoicesUsed={invoicesUsed} clientsUsed={clients.length} />
      </div>
      <section aria-labelledby="plansTitle" className="pt-4">
        <h2 id="plansTitle" className="mb-2 text-center text-xl font-black text-navy">
          {plan.id === "free" ? "Upgrade your plan" : "All plans"}
        </h2>
        <p className="mb-6 text-center text-sm text-navy-500">
          Prices in USD. Taxes may apply. See our{" "}
          <Link href="/refund-policy" className="font-bold underline decoration-gold underline-offset-4">
            refund policy
          </Link>
          .
        </p>
        {!isStripeConfigured() && <ManualUpgradeNotice />}
        <PlanGrid mode="dashboard" currentPlan={plan.id} />
      </section>
    </div>
  );
}
