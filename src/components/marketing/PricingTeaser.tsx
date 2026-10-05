import Link from "next/link";
import { Check } from "lucide-react";
import { PLAN_ORDER, PLANS } from "@/src/constant/plans";
import { TEASER_FEATURE_COUNT } from "@/src/constant/marketing";
import { cn } from "@/src/lib/utils";

export default function PricingTeaser() {
  return (
    <section className="bg-navy py-16" aria-labelledby="pricingTitle">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="pricingTitle" className="mb-2 text-center text-2xl font-black text-white sm:text-3xl">
          Start free, grow when you&apos;re ready
        </h2>
        <p className="mb-10 text-center text-navy-200">No credit card needed. Cancel paid plans anytime.</p>
        <div className="grid gap-5 md:grid-cols-3">
          {PLAN_ORDER.map((id) => {
            const plan = PLANS[id];
            const light = plan.highlighted;
            return (
              <div
                key={id}
                className={cn(
                  "rounded-2xl p-6",
                  light ? "border-2 border-gold bg-white" : "border border-white/10 bg-white/[0.06]",
                )}
              >
                <p className={cn("font-black", light ? "text-navy" : "text-white")}>{plan.name}</p>
                <p className={cn("mb-4 text-3xl font-black", light ? "text-navy" : "text-gold")}>
                  ${plan.price.month}
                  <span className="text-sm font-semibold opacity-70">/mo</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.slice(0, TEASER_FEATURE_COUNT).map((feature) => (
                    <li
                      key={feature}
                      className={cn("flex gap-2 text-sm", light ? "text-navy-500" : "text-navy-100")}
                    >
                      <Check size={15} className="mt-0.5 flex-shrink-0 text-gold-dark" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/pricing" className="btn-primary">
            Compare plans
          </Link>
        </div>
      </div>
    </section>
  );
}
