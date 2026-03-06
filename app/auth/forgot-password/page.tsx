import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Invoice Gen",
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
    url: "https://invoice-gen.vercel.app/auth/forgot-password",
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return (
    <div
      className="flex min-h-svh w-full flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: "#ECEFF1" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#191970" }}
        >
          <FileText size={16} style={{ color: "#FFC107" }} />
        </div>
        <span className="font-black text-xl" style={{ color: "#191970" }}>
          Invoice<span style={{ color: "#FFC107" }}>Gen</span>
        </span>
      </Link>

      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
