import { Suspense } from "react";
import { Metadata } from "next";
import SignUpForm from "@/src/components/new/auth/SignUpForm";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import Loader from "@/src/components/new/Loader";

export const metadata: Metadata = {
  title: "Sign Up | Invoice Gen",
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
    url: "https://invoice-gen.vercel.app/auth/sign-up",
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

const SignUp: React.FC = () => {
  return (
    <main
      className="flex min-h-svh w-full flex-col"
      style={{ background: "#ECEFF1" }}
    >
      <Header />
      {/* ── Form Center ── */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full flex">
          <Suspense
            fallback={
              <div
                className="text-center text-sm font-medium"
                style={{ color: "rgba(25,25,112,0.45)" }}
              >
                <div
                  className="w-7 h-7 rounded-full border-2 border-t-transparent mx-auto mb-2 animate-spin"
                  style={{
                    borderColor: "#FFC107",
                    borderTopColor: "transparent",
                  }}
                />
                <Loader text="Loading ... " />
              </div>
            }
          >
            <SignUpForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SignUp;
