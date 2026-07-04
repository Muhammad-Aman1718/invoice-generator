import { Metadata } from "next";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - Invoice Gen",
  description:
    "View our transparent pricing plans for Invoice Gen. Free to start, scale as your business grows.",
  keywords: ["pricing", "invoice software cost", "plans"],
  openGraph: {
    title: "Pricing | Invoice Gen",
    description: "Choose the plan that fits your business needs.",
    url: "https://invoice-generator1718.vercel.app/pricing",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for freelancers and small teams",
    features: [
      "Unlimited invoices",
      "PDF export",
      "VAT/GST support",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Everything in Free",
      "Custom templates",
      "Team members",
      "Priority support",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "On-premise options",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Simple, Transparent Pricing
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgb(25,25,112,0.7)" }}>
            Start free. Upgrade when you're ready.
          </p>
        </header>

        <article className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 sm:p-8 border-2 transition-all ${
                plan.highlighted ? "md:scale-105 shadow-2xl" : ""
              }`}
              style={{
                background: "#fff",
                borderColor: plan.highlighted ? "#FFC107" : "rgba(25,25,112,0.1)",
              }}
            >
              <h2 className="text-2xl font-black mb-2" style={{ color: "#191970" }}>
                {plan.name}
              </h2>
              <p className="text-sm mb-6" style={{ color: "rgb(25,25,112,0.6)" }}>
                {plan.description}
              </p>
              <div className="text-4xl font-black mb-6" style={{ color: "#FFC107" }}>
                {plan.price}
                {plan.period && <span className="text-lg" style={{ color: "rgb(25,25,112,0.6)" }}>{plan.period}</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={20} style={{ color: "#FFC107", flexShrink: 0 }} />
                    <span style={{ color: "rgb(25,25,112,0.7)" }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
