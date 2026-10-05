import { ForgotPasswordForm } from "@/src/components/forgot-password-form";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Reset your InvoiceGen password.",
  robots: { index: false, follow: true },
};

const ForgetPassword = () => {
  return (
    <main
      className="flex min-h-svh w-full  flex-col  "
      style={{ background: "#ECEFF1" }}
    >
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
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
      {/* Logo */}
      <Footer />
    </main>
  );
};

export default ForgetPassword;
