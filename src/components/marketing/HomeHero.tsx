import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SampleInvoiceShowcase from "./SampleInvoiceShowcase";
import { ROUTES } from "@/src/constant/routes";

export default function HomeHero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-16">
      <div className="min-w-0 motion-safe:animate-fade-up">
        <span className="mb-5 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-navy">
          Free, no sign-up needed
        </span>
        <h1 className="mb-5 text-4xl font-extrabold leading-[1.05] text-navy md:text-5xl lg:text-[3.5rem]">
          Create professional invoices in seconds
        </h1>
        <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-navy-500">
          Fill in your details, check the live preview and download a tax-ready PDF. No account needed.
        </p>
        <div className="flex flex-col gap-3 xs:flex-row">
          <a href="#builder" className="btn-primary px-5 py-3 text-base">
            Start invoicing
          </a>
          <Link href={ROUTES.signUp} className="btn-outline px-5 py-3 text-base">
            Sign up free <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="min-w-0 motion-safe:animate-fade-up [animation-delay:120ms]">
        <SampleInvoiceShowcase id="heroInvoiceSample" />
      </div>
    </section>
  );
}
