import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/src/components/marketing/legal-page";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${siteConfig.name}, including subscriptions and acceptable use.`,
  alternates: { canonical: "/terms-of-service" },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Agreement",
    body: (
      <p>
        By creating an account or using {siteConfig.name} (the “Service”) you agree to these Terms and our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>. If you use the Service on behalf of a company, you confirm
        you are authorised to accept these Terms for it.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Your account",
    body: (
      <ul>
        <li>You must be at least 16 and provide accurate information.</li>
        <li>You are responsible for keeping your password safe and for all activity on your account.</li>
        <li>Tell us promptly at {siteConfig.supportEmail} if you suspect unauthorised access.</li>
      </ul>
    ),
  },
  {
    id: "service",
    title: "The Service",
    body: (
      <>
        <p>
          {siteConfig.name} helps you create, store and export invoices. Tax presets (VAT, GST, sales tax, etc.) are
          provided for convenience only. <strong>You are solely responsible</strong> for the accuracy of your invoices
          and for complying with tax, accounting and invoicing laws in your jurisdiction. We do not provide tax, legal
          or accounting advice.
        </p>
        <p>We may add, change or remove features. We will give reasonable notice before removing a feature you pay for.</p>
      </>
    ),
  },
  {
    id: "plans",
    title: "Plans, subscriptions and payment",
    body: (
      <>
        <ul>
          <li>
            The Free plan is offered at no cost with the limits shown on our <Link href="/pricing">pricing page</Link>.
          </li>
          <li>
            Paid plans (Pro, Business) are billed in advance, monthly or yearly, through our payment processor Stripe.
            Prices exclude any applicable taxes.
          </li>
          <li>
            <strong>Subscriptions renew automatically</strong> at the end of each billing period until you cancel. You
            can cancel at any time from <em>Billing → Manage billing</em>; you keep paid features until the end of the
            period you already paid for.
          </li>
          <li>
            If a payment fails we may retry it and, after a grace period, move your account to the Free plan. Your data
            is kept; only plan features are limited.
          </li>
          <li>
            We may change prices with at least 30 days’ notice. Changes apply from your next renewal.
          </li>
        </ul>
        <p>
          Refunds are described in our <Link href="/refund-policy">Refund Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>create fraudulent, fake or misleading invoices, or impersonate another business;</li>
          <li>break any law, including tax, sanctions, consumer-protection or data-protection law;</li>
          <li>upload malware, or attempt to probe, overload or bypass the security of the Service;</li>
          <li>scrape the Service or resell it without our written permission.</li>
        </ul>
        <p>We may suspend or close accounts that break these rules, with notice where reasonable.</p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content",
    body: (
      <p>
        You own the data you put into the Service (“Your Content”). You grant us a limited licence to host, process and
        display it solely to operate the Service for you. You confirm you have the right to include any personal data
        about your customers, and we process that data as your processor under our Privacy Policy.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Our intellectual property",
    body: (
      <p>
        The Service, its design, code and branding belong to {siteConfig.company}. PDFs you generate are yours to use
        freely. On the Free plan PDFs include a small “Made with {siteConfig.name}” footer, which you agree not to
        remove by technical means.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <p>
        You can delete your account at any time from Settings. We may terminate or suspend access for material breach
        of these Terms. On termination, your right to use the Service ends and Your Content is deleted as described in
        the Privacy Policy — export anything you need first.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and limitation of liability",
    body: (
      <>
        <p>
          The Service is provided “as is” and “as available”. To the fullest extent permitted by law we disclaim all
          implied warranties, including fitness for a particular purpose and non-infringement.
        </p>
        <p>
          To the fullest extent permitted by law, we are not liable for indirect, incidental or consequential losses,
          lost profits or lost data, and our total liability for any claim is limited to the amount you paid us in the
          12 months before the claim (or USD 50 if you are on the Free plan). Nothing in these Terms limits liability
          that cannot be limited by law, or your statutory rights as a consumer.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    body: (
      <p>
        We may update these Terms. Material changes will be announced at least 14 days in advance by email or in the
        dashboard. Continuing to use the Service after they take effect means you accept them.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the jurisdiction where {siteConfig.company} is established, without
        regard to conflict-of-law rules. If you are a consumer, you also keep the protection of the mandatory laws of
        your country of residence.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      current="/terms-of-service"
      intro={<p>Please read these Terms carefully. They explain your rights and obligations when using {siteConfig.name}.</p>}
      sections={sections}
    />
  );
}
