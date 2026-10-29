// ─────────────────────────────────────────────────────────────────────────────
//  Country invoicing guides — one SEO landing page each at /invoice-generator/<slug>.
//  General guidance only (not tax advice). Review yearly and bump COUNTRY_GUIDES_REVIEWED.
// ─────────────────────────────────────────────────────────────────────────────

import type { CountryGuide } from "@/src/types/types";

export const COUNTRY_GUIDES_REVIEWED = "2026-10-29";
export const COUNTRY_GUIDES_REVIEWED_LABEL = "October 2026";

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    slug: "pakistan",
    name: "Pakistan",
    currency: "PKR",
    taxName: "Sales tax",
    rates: "18% standard federal sales tax on goods; services are taxed by the provinces",
    intro:
      "Make sales tax invoices in Pakistani rupees with your NTN / STRN, your buyer's details and a clear tax breakdown, then download a PDF.",
    mustInclude: [
      "A unique serial number for every invoice",
      "Your business name, address and NTN / sales tax registration number (STRN)",
      "The buyer's name, address and registration number when they are registered",
      "Date of issue",
      "Description and quantity of the goods or services",
      "Value excluding tax, the sales tax amount and the value including tax",
    ],
    goodToKnow: [
      "Services are taxed by provincial authorities (PRA, SRB, KPRA, BRA) at their own rates. Pick “Custom” tax to enter yours.",
      "FBR is rolling out digital invoicing for sales tax registered businesses. If you must integrate, issue invoices from an FBR-integrated system.",
      "Add your bank name, account title and IBAN in Payment details so clients can pay by transfer.",
    ],
    setup: {
      documentTitle: "tax_invoice",
      taxLabel: "Sales Tax",
      taxRate: 18,
      presetText: "Sales Tax (Pakistan) 18%",
    },
    authority: { name: "Federal Board of Revenue (FBR)", url: "https://www.fbr.gov.pk/" },
    faqs: [
      {
        q: "Is this invoice generator free in Pakistan?",
        a: "Yes. Create invoices in PKR and download the PDF without an account. A free account also saves invoices and clients.",
      },
      {
        q: "Where do I put my NTN or STRN?",
        a: "Type it in “Address & contact details” under Your business, e.g. “NTN: 1234567-8”. Add the buyer's number in the client details.",
      },
    ],
  },
  {
    slug: "india",
    name: "India",
    currency: "INR",
    taxName: "GST",
    rates: "Mostly 5% or 18% GST (0% on essentials, 40% on some luxury and sin goods)",
    intro:
      "Create GST invoices in rupees with your GSTIN, place of supply and tax amounts, then download a print-ready PDF.",
    mustInclude: [
      "Invoice number and date",
      "Supplier name, address and GSTIN",
      "Customer name, billing and shipping address, and GSTIN if registered",
      "Place of supply",
      "HSN / SAC code, description, quantity and unit of each item",
      "Taxable value and discounts",
      "GST rate and amount, shown as CGST + SGST or IGST",
      "Whether tax is payable on reverse charge",
      "Signature of the supplier",
    ],
    goodToKnow: [
      "For an unregistered customer and a value over ₹50,000, add their name, address, delivery address and state code.",
      "Within one state, show CGST and SGST separately (half the rate each); add the split in Notes, as the total shows one combined GST line.",
      "Businesses above the e-invoicing turnover threshold must also generate an IRN on the government portal.",
    ],
    setup: { documentTitle: "tax_invoice", taxLabel: "GST", taxRate: 18, presetText: "GST (India) 18%" },
    authority: { name: "GST Portal", url: "https://www.gst.gov.in/" },
    faqs: [
      {
        q: "Can I add HSN or SAC codes?",
        a: "Yes. Put the code at the start of each item description, e.g. “998314 · Website design”.",
      },
      {
        q: "Does it create e-invoices with an IRN?",
        a: "No. InvoiceGen creates PDF invoices. If your turnover requires e-invoicing, generate the IRN on the e-invoice portal as well.",
      },
    ],
  },
  {
    slug: "united-kingdom",
    name: "the United Kingdom",
    shortName: "UK",
    currency: "GBP",
    taxName: "VAT",
    rates: "20% standard, 5% reduced, 0% zero-rated",
    intro:
      "Create UK invoices and VAT invoices in pounds with your VAT number and VAT shown separately, then download a PDF in seconds.",
    mustInclude: [
      "A unique invoice number",
      "Your business name, address and contact details",
      "Your customer's name and address",
      "A clear description of what you are charging for",
      "The date of supply and the invoice date",
      "The amount charged, any VAT and the total owed",
      "If VAT registered: your VAT number, with VAT shown separately",
    ],
    goodToKnow: [
      "Sole traders show their own name plus any business name; limited companies use the full registered name.",
      "Retailers can issue a simplified VAT invoice for supplies of £250 or less.",
      "Zero-rated sales still show the VAT line at 0%.",
    ],
    setup: { documentTitle: "tax_invoice", taxLabel: "VAT", taxRate: 20, presetText: "VAT (Standard) 20%" },
    authority: {
      name: "GOV.UK",
      url: "https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include",
    },
    faqs: [
      {
        q: "Do I need a VAT invoice if I'm not VAT registered?",
        a: "No. Use a normal invoice and don't charge VAT. Choose “Invoice” as the document type and “None” as tax.",
      },
      {
        q: "Where do I add the date of supply?",
        a: "If it differs from the issue date, add “Date of supply: …” in Notes.",
      },
    ],
  },
  {
    slug: "united-states",
    name: "the United States",
    shortName: "USA",
    currency: "USD",
    taxName: "Sales tax",
    rates: "No federal sales tax; state and local rates vary (5 states have no statewide sales tax)",
    intro:
      "Create invoices in US dollars with sales tax where it applies, payment terms and your logo, then download a PDF for free.",
    mustInclude: [
      "A unique invoice number and the invoice date",
      "Your business name and contact details",
      "Your client's name and address",
      "Description, quantity and price of each item",
      "Sales tax, if you collect it in that state",
      "Total due, due date and how to pay",
    ],
    goodToKnow: [
      "There is no federal law on invoice contents; sales tax rules are set by each state.",
      "Use the “Sales Tax” preset or “Custom” to enter your combined state and local rate.",
      "Add an EIN only if a client asks for it; never put a Social Security number on an invoice.",
    ],
    setup: {
      documentTitle: "invoice",
      taxLabel: "Sales Tax",
      taxRate: 0,
      presetText: "Sales Tax, or Custom for your state rate",
    },
    authority: {
      name: "IRS small business",
      url: "https://www.irs.gov/businesses/small-businesses-self-employed",
    },
    faqs: [
      {
        q: "Is this a free invoice generator for US freelancers?",
        a: "Yes. Build and download unlimited PDF invoices in the browser without an account.",
      },
      {
        q: "Should I charge sales tax on services?",
        a: "It depends on the state and the service. Check your state's revenue department before adding tax.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    currency: "CAD",
    taxName: "GST / HST",
    rates: "5% GST, or HST of 13–15% in participating provinces",
    intro:
      "Create invoices in Canadian dollars with your GST/HST number and the right tax rate for your province, then download a PDF.",
    mustInclude: [
      "Your business name (or trading name) and GST/HST registration number",
      "Invoice date",
      "Total amount paid or payable",
      "The GST/HST charged, or a statement that the total includes it",
      "For larger invoices: the buyer's name, a description of each item and payment terms",
    ],
    goodToKnow: [
      "Provinces with their own sales tax (PST/QST) need that tax shown too; add it as a custom rate or in Notes.",
      "Clients need your GST/HST number on the invoice to claim input tax credits.",
    ],
    setup: {
      documentTitle: "invoice",
      taxLabel: "GST",
      taxRate: 5,
      presetText: "GST (Canada) 5%, or HST 13%",
    },
    authority: { name: "Canada Revenue Agency", url: "https://www.canada.ca/en/revenue-agency.html" },
    faqs: [
      {
        q: "Can I use HST instead of GST?",
        a: "Yes. Pick the HST preset, or “Custom” and type your province's rate.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    currency: "AUD",
    taxName: "GST",
    rates: "10% GST",
    intro:
      "Create tax invoices in Australian dollars with your ABN and GST shown, then download a PDF ready to send.",
    mustInclude: [
      "The words “Tax invoice”",
      "Your identity and ABN",
      "Date of issue",
      "Description, quantity and price of what you sold",
      "The GST amount, or a statement that the total includes GST",
      "For sales of $1,000 or more: the buyer's identity or ABN",
    ],
    goodToKnow: [
      "Choose “Tax invoice” as the document type so the heading reads correctly.",
      "If you are not registered for GST, issue an invoice without GST and don't call it a tax invoice.",
    ],
    setup: { documentTitle: "tax_invoice", taxLabel: "GST", taxRate: 10, presetText: "GST (Australia) 10%" },
    authority: { name: "Australian Taxation Office", url: "https://www.ato.gov.au/" },
    faqs: [
      {
        q: "Where do I put my ABN?",
        a: "Add “ABN: 12 345 678 901” in Your business details; it prints under your business name.",
      },
    ],
  },
  {
    slug: "uae",
    name: "the UAE",
    shortName: "UAE",
    currency: "AED",
    taxName: "VAT",
    rates: "5% VAT",
    intro: "Create UAE tax invoices in dirhams with your TRN and VAT shown, then download a PDF in English.",
    mustInclude: [
      "The words “Tax invoice”",
      "Supplier name, address and TRN",
      "Recipient name, address and TRN when registered",
      "A sequential invoice number and date of issue",
      "Date of supply if different from the issue date",
      "Description, quantity, unit price, VAT rate and amount payable",
      "Any discount, the total and the VAT amount in AED",
    ],
    goodToKnow: [
      "A simplified tax invoice can be used for unregistered customers or invoices of AED 10,000 or less.",
      "If you invoice in another currency, also show the VAT amount in AED.",
      "The UAE has announced phased e-invoicing; check the FTA for when it applies to you.",
    ],
    setup: { documentTitle: "tax_invoice", taxLabel: "VAT", taxRate: 5, presetText: "VAT (GCC) 5%" },
    authority: { name: "Federal Tax Authority", url: "https://tax.gov.ae/" },
    faqs: [
      {
        q: "Can I invoice in USD in the UAE?",
        a: "Yes, but the VAT amount must also be shown in AED. Add it in Notes, or invoice in AED.",
      },
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    currency: "SAR",
    taxName: "VAT",
    rates: "15% VAT",
    intro:
      "Create proforma invoices and quotes in riyals with 15% VAT. Registered businesses must issue final tax invoices through ZATCA e-invoicing.",
    mustInclude: [
      "Tax invoice (B2B) or simplified tax invoice (B2C)",
      "Seller name, address and VAT number",
      "Buyer details and VAT number on B2B tax invoices",
      "Sequential invoice number, issue date and supply date",
      "Taxable amount, VAT rate and VAT amount",
      "A QR code on simplified tax invoices",
    ],
    goodToKnow: [
      "E-invoicing (Fatoora) has applied to resident VAT payers since 4 December 2021, with system integration rolled out in waves from 1 January 2023.",
      "A PDF from InvoiceGen is not a ZATCA e-invoice. Use it for proformas, quotes, or if you are not VAT registered.",
      "Invoices must be in Arabic; a bilingual Arabic/English invoice is common.",
    ],
    setup: { documentTitle: "proforma", taxLabel: "VAT", taxRate: 15, presetText: "VAT (KSA) 15%" },
    authority: {
      name: "ZATCA",
      url: "https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/What-is-e-invoicing.aspx",
    },
    faqs: [
      {
        q: "Is InvoiceGen ZATCA compliant?",
        a: "No. It does not generate ZATCA XML e-invoices or QR codes. Use it for proforma invoices and quotes.",
      },
    ],
  },
  {
    slug: "european-union",
    name: "the European Union",
    shortName: "EU",
    currency: "EUR",
    taxName: "VAT",
    rates: "Set by each country, from 17% to 27% (e.g. Germany 19%, France 20%, Spain 21%)",
    intro:
      "Create EU VAT invoices in euros with both VAT numbers, VAT per rate and a reverse-charge note when needed, then download a PDF.",
    mustInclude: [
      "Date of issue and a sequential invoice number",
      "Your VAT number, and the customer's VAT number for reverse-charge or cross-border sales",
      "Full names and addresses of you and your customer",
      "Quantity and nature of the goods or services",
      "Date of supply, if different from the invoice date",
      "Taxable amount per VAT rate, the rate, and the VAT amount",
      "A reference such as “Reverse charge” when the customer accounts for the VAT",
    ],
    goodToKnow: [
      "For B2B services to another EU country, charge 0% and add “Reverse charge” in Notes.",
      "Several countries (e.g. Belgium, Germany, France) are moving domestic B2B invoices to structured e-invoices, so a PDF may not be enough there.",
    ],
    setup: {
      documentTitle: "invoice",
      taxLabel: "VAT",
      taxRate: 0,
      presetText: "VAT, MwSt, TVA or IVA at your country's rate",
    },
    authority: {
      name: "European Commission: VAT invoicing rules",
      url: "https://taxation-customs.ec.europa.eu/taxation/vat_en",
    },
    faqs: [
      {
        q: "How do I write a reverse-charge invoice?",
        a: "Set tax to “None”, add both VAT numbers in the business and client details, and write “Reverse charge” in Notes.",
      },
    ],
  },
];

export function findCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((guide) => guide.slug === slug);
}

/** "Pakistan", "UK", "UAE" — used in titles and link text. */
export function getCountryLabel(guide: CountryGuide): string {
  return guide.shortName ?? guide.name.replace(/^the /, "");
}
