import Link from "next/link";
import { CalendarCheck, FlaskConical, LifeBuoy, Lock } from "lucide-react";
import { EARLY_ACCESS_FEATURES, ONBOARDING_BOOKING_URL, SUPPORT_LEVELS } from "@/src/constant/support";
import type { SupportCardProps } from "@/src/types/types";

export default function SupportCard({ plan }: SupportCardProps) {
  const support = plan.perks.prioritySupport ? SUPPORT_LEVELS.priority : SUPPORT_LEVELS.standard;

  return (
    <section className="panel grid gap-5 p-6 md:grid-cols-3" aria-labelledby="supportTitle">
      <div>
        <p className="eyebrow mb-2 flex items-center gap-1.5">
          <LifeBuoy size={13} aria-hidden="true" /> Support
        </p>
        <h3 id="supportTitle" className="text-base font-bold text-navy">
          {support.title}
        </h3>
        <p className="mt-1 text-sm text-navy-500">{support.detail}</p>
        <Link
          href="/contact"
          className="mt-3 inline-block text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
        >
          Contact support
        </Link>
      </div>
      <div>
        <p className="eyebrow mb-2 flex items-center gap-1.5">
          <CalendarCheck size={13} aria-hidden="true" /> Onboarding call
        </p>
        <p className="text-sm text-navy-500">
          A 30-minute call to set up your account, branding and workflow.
        </p>
        {plan.perks.onboardingCall ? (
          <a href={ONBOARDING_BOOKING_URL} className="btn-navy btn-sm mt-3">
            Book my call
          </a>
        ) : (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-navy-400">
            <Lock size={12} aria-hidden="true" /> Included with Business
          </p>
        )}
      </div>
      <div>
        <p className="eyebrow mb-2 flex items-center gap-1.5">
          <FlaskConical size={13} aria-hidden="true" /> Early access
        </p>
        <ul className="space-y-2">
          {EARLY_ACCESS_FEATURES.map((feature) => (
            <li key={feature.title} className="text-sm text-navy-500">
              <span className="font-semibold text-navy">{feature.title}</span> — {feature.detail}
            </li>
          ))}
        </ul>
        {!plan.perks.earlyAccess && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-navy-400">
            <Lock size={12} aria-hidden="true" /> Included with Business
          </p>
        )}
      </div>
    </section>
  );
}
