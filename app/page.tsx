// import Link from "next/link";
// import { Suspense } from "react";
// import { InvoiceLanding } from "@/components/invoice/invoice-landing";
// import { AdSlot } from "@/components/ads/ad-slot";
// import Footer from "@/components/footer";

// export default function Home() {
//   return (
//     // Main Background: #F5F7FA (60%)
//     <main className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
//       {/* Header: #1B2A4A (30%) */}
//       <header
//         className="sticky top-0 z-10 shadow-md"
//         style={{ backgroundColor: "#1B2A4A" }}
//       >
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <Link href="/" className="font-bold text-xl text-white">
//             Invoice <span style={{ color: "#3A7BD5" }}>SaaS</span>
//           </Link>

//           <div className="flex items-center gap-4">
//             <Link
//               href="/auth/login"
//               className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
//             >
//               Sign in
//             </Link>
//             {/* CTA/Accent: #3A7BD5 (10%) */}
//             <Link
//               href="/auth/sign-up"
//               className="text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all hover:brightness-110 active:scale-95"
//               style={{ backgroundColor: "#3A7BD5" }}
//             >
//               Sign up free
//             </Link>
//           </div>
//         </nav>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="mb-8">
//           <AdSlot variant="header" />
//         </div>

//         <section className="text-center max-w-3xl mx-auto mb-16">
//           {/* Main Heading in Navy for Contrast */}
//           <h1
//             className="text-4xl sm:text-5xl font-extrabold mb-6"
//             style={{ color: "#1B2A4A" }}
//           >
//             Create Professional Invoices
//           </h1>
//           <p className="text-lg leading-relaxed text-slate-600">
//             Free invoice generator for USA and Europe. VAT and tax compliant.
//             <br className="hidden sm:block" /> Export to PDF instantly.
//           </p>
//         </section>

//         <Suspense
//           fallback={
//             <div className="text-center py-20 font-medium text-slate-400">
//               Loading your workspace...
//             </div>
//           }
//         >
//           {/* Landing component will inherit the global feel */}
//           <div className=" overflow-hidden">
//             <InvoiceLanding />
//           </div>
//         </Suspense>

//         <div className="mt-12">
//           <AdSlot variant="success-modal" />
//         </div>
//       </div>

//       {/* Footer also using the Navy theme for consistency */}
//       <Footer />
//     </main>
//   );
// }

import Link from "next/link";
import { Suspense } from "react";
import { InvoiceLanding } from "@/components/invoice/invoice-landing";
import { AdSlot } from "@/components/ads/ad-slot";
import Footer from "@/components/footer";
import { FileText, Zap, Globe, Shield } from "lucide-react";

// ─────────────────────────────────────────────
//  COLOR THEME  (60 · 30 · 10)
//  60% → #ECEFF1  background
//  30% → #191970  midnight blue
//  10% → #FFC107  amber accent
// ─────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      {/* ══ HEADER / NAV ═══════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "#191970",
          boxShadow: "0 2px 20px rgba(25,25,112,0.3)",
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between"
          style={{ height: "60px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
              style={{ background: "#FFC107" }}
            >
              <FileText size={15} style={{ color: "#191970" }} />
            </div>
            <span className="font-black text-lg text-white tracking-tight max-xs:hidden">
              Invoice<span style={{ color: "#FFC107" }}>Gen</span>
            </span>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/auth/login"
              className="text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition-all text-white/65 hover:text-white hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-xs sm:text-sm font-black text-[#191970] px-4 py-2 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: "#FFC107",
                boxShadow: "0 4px 14px rgba(255,193,7,0.35)",
              }}
            >
              Sign up free
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Ad Slot */}
        <div className="mb-8">
          <AdSlot variant="header" />
        </div>

        {/* ══ HERO SECTION ═══════════════════════════════════════════════ */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border"
            style={{
              background: "rgba(255,193,7,0.1)",
              borderColor: "rgba(255,193,7,0.3)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#FFC107" }}
            />
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: "#191970" }}
            >
              Free · No sign-up required
            </span>
          </div>

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
            style={{ color: "rgba(25,25,112,0.6)" }}
          >
            Free invoice generator for USA and Europe. VAT and tax compliant.
            Export to PDF instantly — no account needed.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { icon: <Globe size={12} />, text: "Multi-currency" },
              { icon: <Shield size={12} />, text: "VAT Compliant" },
              { icon: <Zap size={12} />, text: "Instant PDF" },
            ].map((f) => (
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
        <div className="mt-10">
          <AdSlot variant="success-modal" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
