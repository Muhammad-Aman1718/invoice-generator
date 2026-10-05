import Link from "next/link";
import { AlertTriangle, CheckCircle2, CreditCard, Info } from "lucide-react";
import { PageHeader } from "@/src/components/ui/page-header";
import { PlanGrid } from "@/src/components/billing/plan-grid";
import { ManageBillingButton } from "@/src/components/billing/manage-billing-button";
import { countInvoicesThisMonth, getViewer, listClients } from "@/src/lib/server/data";
import { stripeConfigured } from "@/src/lib/server/stripe";
import { siteConfig } from "@/src/config/site";

export const metadata = { title: "Billing & Plan" };

function Meter({ label, used, limit }: { label: string; used: number; limit: number | null }) {
  const pct = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-semibold text-navy">{label}</span>
        <span className="tabular-nums text-navy-500">{limit ? `${used} / ${limit}` : `${used} · Unlimited`}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-mist">
        <div
          className={pct >= 90 ? "h-full rounded-full bg-red-500" : "h-full rounded-full bg-gold"}
          style={{ width: limit ? `${pct}%` : "100%", opacity: limit ? 1 : 0.35 }}
        />
      </div>
    </div>
  );
}

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const viewer = await getViewer();
  const { checkout } = await searchParams;
  const [used, clients] = await Promise.all([countInvoicesThisMonth(viewer), listClients(viewer)]);
  const { subscription, plan } = viewer;
  const renews = subscription.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", { dateStyle: "long" })
    : null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader icon={CreditCard} title="Billing & Plan" description="Your subscription, usage and upgrades." />

      {checkout === "success" && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
          Payment received — thank you! Your plan updates as soon as our payment provider confirms it (usually within a
          few seconds). Refresh this page if it hasn&apos;t changed yet.
        </div>
      )}
      {checkout === "cancelled" && (
        <div className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-4 text-sm text-navy-500">
          <Info size={18} className="mt-0.5 flex-shrink-0" /> Checkout was cancelled. You have not been charged.
        </div>
      )}
      {subscription.status === "past_due" && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
          Your last payment failed. Update your payment method to keep your {plan.name} features.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="panel p-5 sm:p-6 lg:col-span-2">
          <p className="eyebrow mb-2">Current plan</p>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-navy">{plan.name}</h2>
              <p className="text-sm text-navy-500">
                {plan.id === "free"
                  ? "Free forever — upgrade any time."
                  : `$${plan.price[subscription.billingInterval]} / ${subscription.billingInterval}` +
                    (renews ? ` · ${subscription.cancelAtPeriodEnd ? "ends" : "renews"} ${renews}` : "")}
              </p>
            </div>
            {subscription.hasBillingPortal && <ManageBillingButton />}
          </div>
          {subscription.cancelAtPeriodEnd && renews && (
            <p className="mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
              Your subscription is set to cancel. You keep {plan.name} features until {renews}.
            </p>
          )}
          <ul className="grid gap-2 sm:grid-cols-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-navy-500">
                <CheckCircle2 size={14} className="flex-shrink-0 text-emerald-600" /> {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="panel space-y-5 p-5 sm:p-6">
          <p className="eyebrow">Usage this month</p>
          <Meter label="Invoices" used={used} limit={plan.limits.invoicesPerMonth} />
          <Meter label="Saved clients" used={clients.length} limit={plan.limits.clients} />
          <p className="text-xs text-navy-500">Monthly invoice limits reset on the 1st (UTC).</p>
        </section>
      </div>

      <section aria-labelledby="plans-title" className="pt-4">
        <h2 id="plans-title" className="mb-2 text-center text-xl font-black text-navy">
          {plan.id === "free" ? "Upgrade your plan" : "All plans"}
        </h2>
        <p className="mb-6 text-center text-sm text-navy-500">
          Prices in USD. Taxes may apply. See our{" "}
          <Link href="/refund-policy" className="font-bold underline decoration-gold underline-offset-4">
            refund policy
          </Link>
          .
        </p>
        {!stripeConfigured() && (
          <p className="mx-auto mb-6 max-w-2xl rounded-2xl border border-gold/40 bg-gold/10 p-4 text-center text-sm text-navy">
            Online card payments are being set up. To upgrade today, email{" "}
            <a className="font-bold underline" href={`mailto:${siteConfig.supportEmail}?subject=Upgrade%20request`}>
              {siteConfig.supportEmail}
            </a>{" "}
            and we&apos;ll activate your plan manually.
          </p>
        )}
        <PlanGrid mode="dashboard" currentPlan={plan.id} />
      </section>
    </div>
  );
}
