import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import Loader from "@/src/components/auth/Loader";
import type { LayoutProps } from "@/src/types/types";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-svh w-full flex-col bg-mist">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <Suspense fallback={<Loader text="Loading…" />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
