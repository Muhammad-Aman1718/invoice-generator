import Link from "next/link";
import BrandLogo from "./BrandLogo";
import SocialLinks from "./SocialLinks";
import { FOOTER_NAV, SITE_CONFIG } from "@/src/constant/site";

export default function Footer() {
  return (
    <footer className="w-full bg-navy" aria-label="Site footer">
      <div className="h-[3px] w-full bg-gold" />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 space-y-5">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-navy-200">
              Professional invoices for freelancers and small businesses worldwide. Create, send and track
              tax-ready invoices in seconds.
            </p>
            <SocialLinks />
          </div>
          {FOOTER_NAV.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.15em] text-gold">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-navy-100 decoration-gold underline-offset-4 transition hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs font-medium text-navy-200 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.company}. All rights reserved.
          </p>
          <p>
            Questions?{" "}
            <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-white hover:underline">
              {SITE_CONFIG.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
