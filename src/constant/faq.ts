import type { FaqGroup, FaqItem } from "@/src/types/types";
import { FREE_CLIENT_LIMIT, FREE_INVOICES_PER_MONTH } from "@/src/constant/plans";

export const PRICING_FAQS: FaqItem[] = [
  {
    q: "Is the Free plan really free?",
    a: `Yes. No card required. You can create and download unlimited PDFs with the builder, and save up to ${FREE_INVOICES_PER_MONTH} invoices per month to your account.`,
  },
  {
    q: "Can I cancel any time?",
    a: "Yes — cancel from Billing in one click. You keep paid features until the end of the period you paid for, then drop to Free without losing data.",
  },
  {
    q: "Do you offer refunds?",
    a: "Your first payment is covered by a 14-day money-back guarantee. See the refund policy for details.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "All major cards, plus wallets such as Apple Pay and Google Pay where available, processed securely by Stripe.",
  },
  {
    q: "What happens to my invoices if I downgrade?",
    a: "Nothing is deleted. You can still view, edit and download every invoice; only the Free plan’s monthly saving limit applies again.",
  },
];

export const HELP_CENTER_GROUPS: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "Do I need an account?",
        a: "No. The builder on the home page works without one — your draft is saved in your browser and you can download the PDF. Create a free account to save invoices, clients and track payments.",
      },
      {
        q: "How do I create my first invoice?",
        a: "Go to Dashboard → New invoice. Fill in “From”, pick or type a client under “Bill To”, add line items, then click Save. Use PDF to download it.",
      },
      {
        q: "Can I set my business details once?",
        a: "Yes. In Settings → Business details add your name, address and logo, plus default currency, tax rate, payment terms, notes and terms. Every new invoice starts with them.",
      },
    ],
  },
  {
    title: "Invoices",
    items: [
      {
        q: "How are totals calculated?",
        a: "Each line is quantity × rate minus its line discount. The overall discount is applied to the subtotal, then tax is applied to the discounted amount.",
      },
      {
        q: "What do the statuses mean?",
        a: "Draft — not sent yet. Pending — sent and awaiting payment. Paid — settled. Cancelled — void. Pending invoices past their due date show as Overdue automatically.",
      },
      {
        q: "Can I copy an invoice?",
        a: "Yes. In Invoices, open the ⋯ menu and choose Duplicate. The copy gets the next number and today’s date.",
      },
      {
        q: "Which currencies are supported?",
        a: "Over 40 currencies. In the PDF, currencies whose symbol isn’t supported by the PDF font are shown with their ISO code (e.g. AED 1,200.00).",
      },
    ],
  },
  {
    title: "Plans & billing",
    items: [
      {
        q: "What are the Free plan limits?",
        a: `${FREE_INVOICES_PER_MONTH} saved invoices per calendar month and ${FREE_CLIENT_LIMIT} saved clients. PDF downloads are unlimited.`,
      },
      {
        q: "How do I upgrade or cancel?",
        a: "Go to Dashboard → Billing & Plan. Upgrades apply immediately; cancellations take effect at the end of the paid period.",
      },
    ],
  },
  {
    title: "Account & privacy",
    items: [
      {
        q: "How do I export or delete my data?",
        a: "Settings → Your data. “Export” downloads everything as JSON; “Delete account” permanently removes your account and data.",
      },
      {
        q: "I forgot my password.",
        a: "Use “Forgot?” on the sign-in page to receive a reset link by email.",
      },
    ],
  },
];
