import type { Metadata } from "next";
import LegalPage from "@/src/components/marketing/LegalPage";
import type { LegalSection } from "@/src/types/types";
import { SITE_CONFIG } from "@/src/constant/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `The cookies and browser storage ${SITE_CONFIG.name} uses, and how to control them.`,
  alternates: { canonical: "/cookie-policy" },
};

const sections: LegalSection[] = [
  {
    id: "what",
    title: "What we use",
    body: (
      <>
        <p>
          {SITE_CONFIG.name} uses only <strong>strictly necessary</strong> cookies and browser storage. We do
          not use advertising, analytics or cross-site tracking cookies, so no consent banner is required — we
          show a short notice instead.
        </p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sb-*-auth-token</td>
              <td>Cookie (first-party)</td>
              <td>Keeps you signed in securely</td>
              <td>Session, refreshed while active</td>
            </tr>
            <tr>
              <td>invoice-generator-data</td>
              <td>Local storage</td>
              <td>Saves your invoice draft on this device</td>
              <td>Until you clear it or save the invoice</td>
            </tr>
            <tr>
              <td>invoicegen-cookie-notice</td>
              <td>Local storage</td>
              <td>Remembers that you dismissed this notice</td>
              <td>Until cleared</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party cookies",
    body: (
      <p>
        If you sign in with Google or GitHub, or pay through Stripe Checkout, those services set their own
        cookies on their own domains under their privacy policies. We do not control or read them.
      </p>
    ),
  },
  {
    id: "control",
    title: "Controlling cookies",
    body: (
      <p>
        You can delete or block cookies in your browser settings. Blocking the authentication cookie will
        prevent you from signing in; clearing local storage removes unsaved invoice drafts.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Updates",
    body: (
      <p>If we ever add non-essential cookies, we will update this page and ask for your consent first.</p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      current="/cookie-policy"
      intro={
        <p>Short version: only the cookies needed to keep you signed in, and nothing that tracks you.</p>
      }
      sections={sections}
    />
  );
}
