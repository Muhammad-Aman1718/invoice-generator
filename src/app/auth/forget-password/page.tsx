import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

import { Metadata } from "next";
import { ForgotPasswordForm } from "@/src/components/new/auth/ForgotPasswordForm";

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
    url: "https://invoice-gen.vercel.app/auth/forget-password",
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

const ForgetPassword = () => {
  return (
    <main
      className="flex min-h-svh w-full  flex-col  "
      style={{ background: "#ECEFF1" }}
    >
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm">
          <ForgotPasswordForm />
        </div>
      </div>
      {/* Logo */}
      <Footer />
    </main>
  );
};

export default ForgetPassword;
