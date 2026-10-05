import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { ROUTES } from "@/src/constant/routes";

export default function HomeHero() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-16">
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-navy">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Free · No sign-up required
      </span>
      <h1 className="mb-4 text-3xl font-black leading-tight text-navy sm:text-5xl">
        Create professional
        <span className="mt-1 block bg-gradient-to-br from-navy to-[#3a3a9e] bg-clip-text text-transparent">
          invoices in seconds
        </span>
      </h1>
      <p className="mx-auto max-w-xl text-sm leading-relaxed text-navy-500 sm:text-base">
        Fill, preview and export tax-ready PDF invoices right in your browser. Create a free account to save
        clients, track payments and see your revenue.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 xs:flex-row">
        <a href="#builder" className="btn-primary">
          <Zap size={16} /> Start invoicing
        </a>
        <Link href={ROUTES.signUp} className="btn-outline">
          Create free account <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
