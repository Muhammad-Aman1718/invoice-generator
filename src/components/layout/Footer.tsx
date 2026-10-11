import Link from "next/link";
import BrandLogo from "./BrandLogo";
import SocialLinks from "./SocialLinks";
import { FOOTER_NAV, SITE_CONFIG } from "@/src/constant/site";

export default function Footer() {
  return (
    <footer className="w-full border-t border-navy/[0.07] bg-white" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 space-y-5">
            <BrandLogo tone="onLight" />
            <p className="max-w-xs text-sm leading-relaxed text-navy-500">
              Professional invoices for freelancers and small businesses. Create, send and track tax-ready
              invoices in seconds.
            </p>
            <SocialLinks />
          </div>
          {FOOTER_NAV.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold text-navy">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-500 decoration-gold underline-offset-4 transition hover:text-navy hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-navy/[0.07] pt-8 text-xs text-navy-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.company}. All rights reserved.
          </p>
          <p>
            Questions?{" "}
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="font-semibold text-navy hover:underline"
            >
              {SITE_CONFIG.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
