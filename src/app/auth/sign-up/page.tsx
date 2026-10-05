import { Suspense } from "react";
import { Metadata } from "next";
import SignUpForm from "@/src/components/auth/SignUpForm";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import Loader from "@/src/components/new/auth/Loader";

export const metadata: Metadata = {
  title: "Create your free account",
  description: "Create a free InvoiceGen account to save invoices, clients and track payments.",
  robots: { index: false, follow: true },
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
