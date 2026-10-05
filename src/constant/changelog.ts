import type { Release } from "@/src/types/types";

export const RELEASES: Release[] = [
  {
    version: "v2.0.0",
    date: "October 2026",
    items: [
      "New dashboard with revenue chart, overdue tracking and setup checklist",
      "Client book: save clients and fill invoices in one click",
      "Pro & Business plans with Stripe billing, usage meters and CSV export",
      "Reports page with 12-month trends and collection rate",
      "Settings: business defaults, password change, data export and account deletion",
      "Admin area for user, role and plan management",
      "Duplicate invoices, paid stamp and page numbers in PDFs",
      "Rewritten Privacy Policy, Terms, Refund, Cookie and GDPR pages",
    ],
  },
  {
    version: "v1.3.0",
    date: "March 2026",
    items: ["SEO-friendly public pages", "Improved dashboard responsiveness", "Better mobile navigation"],
  },
  {
    version: "v1.0.0",
    date: "January 2026",
    items: ["Invoice builder with live preview", "PDF export", "Email, Google and GitHub sign-in"],
  },
];
