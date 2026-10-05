import type { Metadata } from "next";
import { Clock, Mail, ShieldCheck } from "lucide-react";
import { PageHero } from "@/src/components/marketing/page-hero";
import { ContactForm } from "@/src/components/marketing/contact-form";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team for support, billing or privacy questions.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const info = [
    { icon: Mail, title: "Support & billing", body: siteConfig.supportEmail, href: `mailto:${siteConfig.supportEmail}` },
    { icon: ShieldCheck, title: "Privacy requests", body: siteConfig.privacyEmail, href: `mailto:${siteConfig.privacyEmail}` },
    { icon: Clock, title: "Response time", body: "Within 1 business day (24h on Business)" },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="We're here to help" description="Questions about invoices, billing or your data? Send us a message." />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <ul className="space-y-4">
          {info.map(({ icon: Icon, title, body, href }) => (
            <li key={title} className="panel flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy">
                <Icon size={18} className="text-gold" />
              </span>
              <div>
                <p className="font-black text-navy">{title}</p>
                {href ? (
                  <a href={href} className="text-sm font-semibold text-navy-500 underline decoration-gold underline-offset-4">
                    {body}
                  </a>
                ) : (
                  <p className="text-sm text-navy-500">{body}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <ContactForm />
      </section>
    </>
  );
}
