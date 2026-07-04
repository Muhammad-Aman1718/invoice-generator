import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Metadata } from "next";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export const metadata: Metadata = {
  title: "Sign Up Success | Invoice Gen",
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
    url: "https://invoice-gen.vercel.app/auth/sign-up-success",
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

const SignUpSuccess = () => {
  return (
    <main
      className="flex min-h-svh w-full flex-col"
      style={{ background: "#ECEFF1" }}
    >
      <Header />
      {/* ── Success Card ── */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div
          className="w-full max-w-sm rounded-2xl border overflow-hidden"
          style={{
            background: "#ffffff",
            borderColor: "rgba(25,25,112,0.08)",
            boxShadow: "0 8px 40px rgba(25,25,112,0.1)",
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: "#FFC107" }} />

          <div className="p-8 text-center space-y-5">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: "rgba(255,193,7,0.12)" }}
            >
              <MailCheck size={28} style={{ color: "#FFC107" }} />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h1
                className="text-xl font-black tracking-tight"
                style={{ color: "#191970" }}
              >
                Check your inbox!
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(25,25,112,0.55)" }}
              >
                We&rsquo;ve sent a verification link to your email address.
                Click the link to activate your account.
              </p>
            </div>

            {/* Divider */}
            <div
              className="border-t"
              style={{ borderColor: "rgba(25,25,112,0.07)" }}
            />

            {/* Action */}
            <p className="text-xs" style={{ color: "rgba(25,25,112,0.45)" }}>
              Already confirmed?{" "}
              <Link
                href="/auth/login"
                className="font-black hover:underline"
                style={{ color: "#191970" }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SignUpSuccess;
