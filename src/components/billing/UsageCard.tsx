import UsageMeter from "./UsageMeter";
import type { UsageCardProps } from "@/src/types/types";

export default function UsageCard({ plan, invoicesUsed, clientsUsed }: UsageCardProps) {
  return (
    <section className="panel space-y-5 p-5 sm:p-6">
      <p className="eyebrow">Usage this month</p>
      <UsageMeter label="Invoices" used={invoicesUsed} limit={plan.limits.invoicesPerMonth} />
      <UsageMeter label="Saved clients" used={clientsUsed} limit={plan.limits.clients} />
      <p className="text-xs text-navy-500">Monthly invoice limits reset on the 1st (UTC).</p>
    </section>
  );
}
