import Link from "next/link";
import { Check } from "lucide-react";
import Reveal from "@/src/components/ui/Reveal";
import { PLAN_ORDER, PLANS } from "@/src/constant/plans";
import { TEASER_FEATURE_COUNT } from "@/src/constant/marketing";
import { CARD_STAGGER_MS } from "@/src/constant/theme";
import { cn } from "@/src/lib/utils";

export default function PricingTeaser() {
  return (
    <section className="border-t border-navy/[0.07] bg-white py-20" aria-labelledby="pricingTitle">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="pricingTitle" className="mb-3 text-center text-3xl font-bold text-navy sm:text-4xl">
          Start free, grow when you&apos;re ready
        </h2>
        <p className="mb-12 text-center text-navy-500">No credit card needed. Cancel paid plans anytime.</p>
        <div className="grid items-start gap-5 md:grid-cols-3">
          {PLAN_ORDER.map((id, index) => {
            const plan = PLANS[id];
            return (
              <Reveal
                key={id}
                delayMs={index * CARD_STAGGER_MS}
                className={cn(
                  "rounded-2xl bg-white p-7",
                  plan.highlighted ? "border-2 border-gold shadow-lift md:-mt-3" : "border border-navy/[0.1]",
                )}
              >
                <p className="font-display text-lg font-bold text-navy">{plan.name}</p>
                <p className="mb-5 font-display text-4xl font-extrabold text-navy">
                  ${plan.price.month}
                  <span className="text-base font-semibold text-navy-400">/mo</span>
                </p>
                <ul className="space-y-2.5">
                  {plan.features.slice(0, TEASER_FEATURE_COUNT).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-navy-500">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-gold-dark" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link href="/pricing" className="btn-navy px-5 py-3">
            Compare plans
          </Link>
        </div>
      </div>
    </section>
  );
}
