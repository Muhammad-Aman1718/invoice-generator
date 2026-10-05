import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/src/components/marketing/legal-page";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, shares and protects your personal data.`,
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        {siteConfig.company} (“we”, “us”) operates {siteConfig.name} at {siteConfig.url}. For personal data about you
        as an account holder, we are the <strong>data controller</strong>. For personal data about your own customers
        that you enter on invoices, <strong>you</strong> are the controller and we act as your{" "}
        <strong>processor</strong>, handling it only to provide the service to you.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    body: (
      <>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Examples</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account data</td>
              <td>Email address, name, password hash, sign-in provider (Google / GitHub)</td>
              <td>You, or the provider you sign in with</td>
            </tr>
            <tr>
              <td>Business profile</td>
              <td>Business name, address, logo, default currency and tax rate</td>
              <td>You</td>
            </tr>
            <tr>
              <td>Invoice & client data</td>
              <td>Client names, addresses, emails, line items, amounts, notes, signature images</td>
              <td>You</td>
            </tr>
            <tr>
              <td>Billing data</td>
              <td>Plan, billing period, payment status. Card details are handled by Stripe and never reach our servers.</td>
              <td>You and our payment processor</td>
            </tr>
            <tr>
              <td>Technical data</td>
              <td>IP address, browser type, timestamps and error logs kept by our hosting providers</td>
              <td>Automatically</td>
            </tr>
          </tbody>
        </table>
        <p>
          If you use the free invoice builder without an account, your draft stays in your browser’s local storage and
          is not sent to us unless you choose to save it to an account.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your data and our legal bases",
    body: (
      <ul>
        <li>
          <strong>To provide the service</strong> — create your account, store and render invoices, generate PDFs
          (performance of a contract).
        </li>
        <li>
          <strong>To run subscriptions</strong> — process payments, apply plan limits, send receipts (contract; legal
          obligation for tax records).
        </li>
        <li>
          <strong>To keep the service secure</strong> — detect abuse, prevent fraud, debug errors (legitimate interest).
        </li>
        <li>
          <strong>To communicate with you</strong> — service and security notices, replies to support requests
          (contract; legitimate interest). We do not send marketing email without your consent.
        </li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>We never sell your personal data. We share it only with service providers that help us run the product:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — database, authentication and storage.
          </li>
          <li>
            <strong>Vercel</strong> — application hosting and delivery.
          </li>
          <li>
            <strong>Stripe</strong> — subscription payments (only if you buy a paid plan).
          </li>
          <li>
            <strong>Google / GitHub</strong> — only if you choose to sign in with them.
          </li>
        </ul>
        <p>
          Each provider is bound by a data processing agreement. We may also disclose data if required by law or to
          protect our users’ rights and safety.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Our providers may process data outside your country, including in the United States. Where data leaves the
        EEA or UK we rely on the European Commission’s Standard Contractual Clauses or an adequacy decision.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <ul>
        <li>Account, profile, invoice and client data — for as long as your account exists.</li>
        <li>When you delete your account, this data is deleted from our live database immediately and from backups within 30 days.</li>
        <li>Billing records — up to 7 years where tax law requires it.</li>
        <li>Server logs — typically 30 days or less.</li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          Depending on where you live (for example under the GDPR, UK GDPR or CCPA/CPRA), you can access, correct,
          export, delete or restrict the use of your personal data, and object to processing based on legitimate
          interests. Most of this is self-service:
        </p>
        <ul>
          <li>
            Edit your details in <Link href="/dashboard/settings">Settings</Link>.
          </li>
          <li>
            Download all your data as JSON with <em>Settings → Your data → Export</em>.
          </li>
          <li>
            Delete your account and data with <em>Settings → Your data → Delete account</em>.
          </li>
        </ul>
        <p>
          For anything else, email <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>. We
          answer within 30 days. You may also complain to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Data is encrypted in transit (HTTPS) and at rest by our database provider. Row-level security ensures each
        account can only read its own invoices and clients, and passwords are stored only as salted hashes. No system
        is perfectly secure; if we learn of a breach affecting you, we will notify you and the relevant authorities as
        required by law.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <p>
        We use only strictly necessary cookies (to keep you signed in) and local storage (to save invoice drafts).
        There are no advertising or cross-site tracking cookies. See the <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>{siteConfig.name} is a business tool and is not directed to children under 16. We do not knowingly collect their data.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will post any changes on this page and update the date above. For material changes we will also notify
        signed-in users by email or in the dashboard before they take effect.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      current="/privacy-policy"
      intro={
        <p>
          Your invoices contain sensitive business information, so we keep data collection to the minimum needed to run
          {" "}{siteConfig.name}. This policy explains what we collect, why, and the choices you have.
        </p>
      }
      sections={sections}
    />
  );
}
