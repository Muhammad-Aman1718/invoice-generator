import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import ContactForm from "@/src/components/marketing/ContactForm";
import ContactChannels from "@/src/components/marketing/ContactChannels";

export const metadata: Metadata = buildPageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <PageJsonLd page="contact" />
      <PageHero
        eyebrow="Contact"
        title="We're here to help"
        description="Questions about invoices, billing or your data? Send us a message."
      />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <ContactChannels />
        <ContactForm />
      </section>
    </>
  );
}
