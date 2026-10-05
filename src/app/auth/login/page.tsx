import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/src/components/new/auth/LoginForm";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import Loader from "@/src/components/new/auth/Loader";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage your invoices, clients and payments.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh w-full flex-col bg-mist">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <Suspense fallback={<Loader text="Loading…" />}>
          <LoginForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
