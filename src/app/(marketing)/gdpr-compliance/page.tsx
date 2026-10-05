import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/src/components/marketing/legal-page";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "GDPR Compliance",
  description: `How ${siteConfig.name} supports GDPR and UK GDPR obligations for you and your customers.`,
  alternates: { canonical: "/gdpr-compliance" },
};

const sections: LegalSection[] = [
  {
    id: "roles",
    title: "Controller and processor roles",
    body: (
      <p>
        We are the controller for your account data. For your customers’ data on invoices, you are the controller and
        we are your processor. Our <Link href="/terms-of-service">Terms</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> form our data processing terms; a signed DPA is available on
        request from <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Data subject rights, built in",
    body: (
      <ul>
        <li>
          <strong>Access & portability (Art. 15, 20)</strong> — one-click JSON export in Settings.
        </li>
        <li>
          <strong>Rectification (Art. 16)</strong> — edit profile, clients and invoices at any time.
        </li>
        <li>
          <strong>Erasure (Art. 17)</strong> — delete individual clients/invoices, or your whole account, instantly.
        </li>
        <li>
          <strong>Restriction & objection (Art. 18, 21)</strong> — on request by email.
        </li>
      </ul>
    ),
  },
  {
    id: "minimisation",
    title: "Data minimisation",
    body: (
      <p>
        We collect only what is needed to produce invoices. No advertising trackers, no selling of data, and the free
        builder works without an account — drafts stay in your browser.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security measures",
    body: (
      <ul>
        <li>TLS encryption in transit and encryption at rest.</li>
        <li>Row-level security isolating each account’s data at the database level.</li>
        <li>Role-based admin access, with admin actions limited to account and plan management.</li>
        <li>Hashed passwords and optional sign-in with Google or GitHub.</li>
      </ul>
    ),
  },
  {
    id: "subprocessors",
    title: "Sub-processors",
    body: (
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Supabase</td>
            <td>Database, authentication</td>
          </tr>
          <tr>
            <td>Vercel</td>
            <td>Hosting</td>
          </tr>
          <tr>
            <td>Stripe</td>
            <td>Payments (paid plans only)</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "breaches",
    title: "Breach notification",
    body: (
      <p>
        If a personal-data breach affects your account we will notify you without undue delay, and supervisory
        authorities within 72 hours where Article 33 requires it.
      </p>
    ),
  },
];

export default function GdprPage() {
  return (
    <LegalPage
      title="GDPR Compliance"
      current="/gdpr-compliance"
      intro={<p>{siteConfig.name} is designed so that you can meet your GDPR obligations to your own customers.</p>}
      sections={sections}
    />
  );
}
