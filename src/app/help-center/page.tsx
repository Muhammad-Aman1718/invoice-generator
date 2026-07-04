import { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center - Invoice Gen",
  description:
    "Find answers to common questions, tutorials, and support resources in our Help Center.",
  keywords: ["help center", "support", "faq"],
  openGraph: {
    title: "Help Center | Invoice Gen",
    description: "Get assistance with using Invoice Gen effectively.",
    url: "https://invoice-generator1718.vercel.app/help-center",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const faqs = [
  {
    question: "How do I create my first invoice?",
    answer: "Simply sign up, log in, and click 'Create Invoice'. Fill in your details and customer information, then export as PDF.",
  },
  {
    question: "What currencies are supported?",
    answer: "We support 100+ currencies including USD, EUR, GBP, INR, and more. Select your currency when creating an invoice.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard encryption and comply with GDPR and data protection regulations.",
  },
  {
    question: "Can I customize invoice templates?",
    answer: "Yes, all templates are fully customizable. Add your logo, change colors, and adjust layouts to match your brand.",
  },
];

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-3xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Help Center
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            Get answers to common questions and learn how to use Invoice Gen.
          </p>
        </header>

        <article className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="p-4 sm:p-6 rounded-xl border cursor-pointer transition-all hover:shadow-md group"
              style={{
                background: "#fff",
                borderColor: "rgba(25,25,112,0.1)",
              }}
            >
              <summary className="flex items-center justify-between font-black" style={{ color: "#191970" }}>
                {faq.question}
                <ChevronDown size={20} className="transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4" style={{ color: "rgb(25,25,112,0.6)" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </article>
      </section>
    </main>
  );
}
