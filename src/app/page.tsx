import { Zap, Globe, Shield } from "lucide-react";
import { Suspense } from "react";
import InvoiceLanding from "@/src/components/invoice/InvoiceLanding";
// import { AdSlot } from "@/components/ads/ad-slot";

import { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

const defaultUrl = "https://invoice-gen.vercel.app";

export const metadata: Metadata = {
  title: "Invoice Gen",
  description:
    "Create professional invoices for USA and Europe. PDF Invoice Maker with VAT, GST support. Free to use.",
  keywords: [
    "Invoice Generator",
    "PDF Invoice Maker",
    "VAT Compliant",
    "Tax Compliant",
    "USA",
    "Europe",
  ],
  openGraph: {
    title: "Invoice SaaS | Professional PDF Invoice Maker",
    description:
      "Create VAT and tax compliant invoices. Export to PDF instantly.",
    url: defaultUrl,
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

const Home = () => {
  const CHIPS = [
    { icon: <Globe size={12} />, text: "Multi-currency" },
    { icon: <Shield size={12} />, text: "VAT Compliant" },
    { icon: <Zap size={12} />, text: "Instant PDF" },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* ══ HERO SECTION ═══════════════════════════════════════════════ */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1
            className="text-3xl sm:text-5xl font-black mb-4 leading-tight"
            style={{ color: "#191970" }}
          >
            Create Professional
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(135deg, #191970 0%, #3a3a9e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Invoices in Seconds
            </span>
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(25,25,112,0.8)" }}
          >
            Free invoice generator for USA and Europe. VAT and tax compliant.
            Export to PDF instantly — no account needed.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {CHIPS.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
                style={{
                  background: "#fff",
                  borderColor: "rgba(25,25,112,0.1)",
                  color: "#191970",
                  boxShadow: "0 2px 8px rgba(25,25,112,0.05)",
                }}
              >
                <span style={{ color: "#FFC107" }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </section>

        {/* ══ INVOICE BUILDER ════════════════════════════════════════════ */}
        <Suspense
          fallback={
            <div
              className="text-center py-24 rounded-2xl font-semibold text-sm"
              style={{
                background: "#fff",
                color: "rgba(25,25,112,0.4)",
                border: "1px solid rgba(25,25,112,0.08)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent mx-auto mb-3 animate-spin"
                style={{
                  borderColor: "#FFC107",
                  borderTopColor: "transparent",
                }}
              />
              Loading workspace...
            </div>
          }
        >
          <InvoiceLanding />
        </Suspense>

        {/* Ad Slot bottom */}
        {/* <div className="mt-10">
          <AdSlot variant="success-modal" />
        </div> */}
      </div>
      <Footer />
    </main>
  );
};

export default Home;
