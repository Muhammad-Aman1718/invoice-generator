import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import UpdatePasswordForm from "@/src/components/new/auth/UpdatePasswordForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password | Invoice Gen",
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
    url: "https://invoice-gen.vercel.app/auth/update-password",
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

const UpdatePassword = () => {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <Header />
      <div className="w-full max-w-3xl mx-auto flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <UpdatePasswordForm />
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePassword;
