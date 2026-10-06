import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import Link from "next/link";
import LegalPage from "@/src/components/marketing/LegalPage";
import type { LegalSection } from "@/src/types/types";
import { SITE_CONFIG } from "@/src/constant/site";

export const metadata: Metadata = buildPageMetadata("refundPolicy");

const sections: LegalSection[] = [
  {
    id: "cancel",
    title: "Cancel any time",
    body: (
      <p>
        You can cancel a paid subscription whenever you like from{" "}
        <em>Dashboard → Billing → Manage billing</em>. There are no cancellation fees. Your plan stays active
        until the end of the period you already paid for, then your account moves to the Free plan
        automatically. Your invoices and clients are kept.
      </p>
    ),
  },
  {
    id: "guarantee",
    title: "14-day money-back guarantee",
    body: (
      <p>
        If you are not happy with your <strong>first</strong> payment for a Pro or Business plan, email{" "}
        <a href={`mailto:${SITE_CONFIG.supportEmail}`}>{SITE_CONFIG.supportEmail}</a> within 14 days of the
        charge and we will refund it in full — no questions asked.
      </p>
    ),
  },
  {
    id: "renewals",
    title: "Renewals",
    body: (
      <ul>
        <li>Monthly renewals are generally non-refundable once the new period has started.</li>
        <li>
          Yearly renewals can be refunded in full if you contact us within 14 days of the renewal date and
          have not meaningfully used the new period.
        </li>
        <li>We send a reminder before yearly renewals where required by law.</li>
      </ul>
    ),
  },
  {
    id: "plan-changes",
    title: "Upgrades and downgrades",
    body: (
      <ul>
        <li>
          Upgrades take effect immediately; our payment processor charges a prorated amount for the rest of
          the period.
        </li>
        <li>Downgrades take effect at the end of the current period; there is no partial refund.</li>
      </ul>
    ),
  },
  {
    id: "exceptions",
    title: "Exceptions",
    body: (
      <p>
        We always refund duplicate charges and charges caused by a fault on our side. Accounts terminated for
        breaching our <Link href="/terms-of-service">Terms of Service</Link> are not eligible for refunds.
        Nothing in this policy limits your statutory rights — for example, EU/UK consumers’ right of
        withdrawal where it applies.
      </p>
    ),
  },
  {
    id: "how",
    title: "How refunds are paid",
    body: (
      <p>
        Refunds go back to the original payment method through Stripe. They usually appear within 5–10
        business days, depending on your bank.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <PageJsonLd page="refundPolicy" />
      <LegalPage
        title="Refund & Cancellation Policy"
        current="/refund-policy"
        intro={
          <p>
            We want you to pay for {SITE_CONFIG.name} only while it is useful to you. Here is exactly how
            cancellations and refunds work.
          </p>
        }
        sections={sections}
      />
    </>
  );
}
