import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CookieNotice from "@/src/components/marketing/CookieNotice";
import type { LayoutProps } from "@/src/types/types";

export default function MarketingLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-mist">
      <a
        href="#main"
        className="sr-only z-[100] rounded-xl bg-gold px-4 py-2 font-bold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}
