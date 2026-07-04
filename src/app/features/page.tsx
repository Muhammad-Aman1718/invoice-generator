import { Metadata } from "next";
import { Globe, Zap, Shield, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Features - Invoice Gen",
  description:
    "Explore the rich set of features we offer at Invoice Gen, built to help businesses create professional, tax-compliant invoices quickly.",
  keywords: ["features", "invoice generator", "tax compliant", "PDF invoices"],
  openGraph: {
    title: "Features | Invoice Gen",
    description:
      "Learn about the powerful features behind Invoice Gen's professional invoice generator.",
    url: "https://invoice-generator1718.vercel.app/features",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const features = [
  {
    icon: Zap,
    title: "Instant PDF Export",
    description: "Generate professional PDFs in seconds with one-click download.",
  },
  {
    icon: Globe,
    title: "Multi-currency Support",
    description: "Support for USD, EUR, GBP, and 100+ currencies worldwide.",
  },
  {
    icon: Shield,
    title: "Tax Compliance",
    description: "VAT, GST, and tax-compliant invoices for USA and Europe.",
  },
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from beautifully designed, customizable templates.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-5xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Powerful Features
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgb(25,25,112,0.7)" }}>
            Everything you need to create professional, compliant invoices in seconds.
          </p>
        </header>

        <article className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 sm:p-8 rounded-2xl border transition-all hover:shadow-lg"
                style={{
                  background: "#fff",
                  borderColor: "rgba(25,25,112,0.1)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#FFC107" }}
                >
                  <Icon size={24} style={{ color: "#191970" }} />
                </div>
                <h2 className="text-lg sm:text-xl font-black mb-2" style={{ color: "#191970" }}>
                  {feature.title}
                </h2>
                <p style={{ color: "rgb(25,25,112,0.6)" }}>{feature.description}</p>
              </div>
            );
          })}
        </article>
      </section>
    </main>
  );
}
