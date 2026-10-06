import type { BlogPost } from "@/src/types/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-every-invoice-must-include",
    title: "What every invoice must include",
    excerpt: "The details that make an invoice valid, professional and quick to pay.",
    intro:
      "A clear invoice gets paid faster and keeps you on the right side of tax rules. Whatever country you work in, these are the details clients and accountants expect to see.",
    publishedAt: "2026-09-08",
    date: "September 2026",
    tag: "Basics",
    body: [
      "A unique, sequential invoice number, the issue date and a due date.",
      "Your business name and address, plus a VAT/GST number if you are registered.",
      "Your client’s name and address, a clear description of each item, quantity, unit price and line total.",
      "The subtotal, any discount, the tax rate and tax amount, and the total due with its currency.",
      "How to pay: bank details or a payment link, and your payment terms.",
    ],
  },
  {
    slug: "get-invoices-paid-faster",
    title: "Five habits that get invoices paid faster",
    excerpt: "Small changes to timing, wording and follow-up that shorten the wait for payment.",
    intro:
      "Late payments are rarely about money. They are usually about attention. These five habits keep your invoice at the top of your client's list.",
    publishedAt: "2026-08-12",
    date: "August 2026",
    tag: "Cash flow",
    body: [
      "Send the invoice the day the work is delivered, not at month end.",
      "Use short, explicit terms such as “Due in 14 days” instead of “Net 30”.",
      "Name a contact person on the client side and address the invoice to them.",
      "Follow up politely the day after the due date; overdue invoices are highlighted in your dashboard.",
      "Offer more than one way to pay.",
    ],
  },
  {
    slug: "vat-vs-gst-vs-sales-tax",
    title: "VAT vs GST vs sales tax in one minute",
    excerpt: "How the three most common consumption taxes differ, and how to show them on an invoice.",
    intro:
      "Different countries tax sales in different ways. Here is the one-minute version of what you need to know before you add tax to an invoice.",
    publishedAt: "2026-07-15",
    date: "July 2026",
    tag: "Tax",
    body: [
      "VAT (EU, UK, Gulf) and GST (India, Australia, Canada, NZ) are charged at each step of the supply chain; registered businesses reclaim the tax they pay.",
      "US sales tax is charged only on the final sale and varies by state and city.",
      "Always show the tax separately from the subtotal, and check local rules or an accountant for your exact obligations.",
    ],
  },
];
