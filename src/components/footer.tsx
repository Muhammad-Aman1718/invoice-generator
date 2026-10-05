import Link from "next/link";
import { FileText, Github, Linkedin, Twitter } from "lucide-react";
import { footerNav, siteConfig } from "@/src/config/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { Icon: Twitter, label: "Twitter", href: siteConfig.social.twitter },
    { Icon: Github, label: "GitHub", href: siteConfig.social.github },
    { Icon: Linkedin, label: "LinkedIn", href: siteConfig.social.linkedin },
  ];

  return (
    <footer className="w-full bg-navy" aria-label="Site footer">
      <div className="h-[3px] w-full bg-gold" />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold">
                <FileText size={18} strokeWidth={2.5} className="text-navy" />
              </span>
              <span className="text-xl font-black tracking-tight text-white">
                Invoice<span className="text-gold">Gen</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-navy-200">
              Professional invoices for freelancers and small businesses worldwide. Create, send and track
              tax-ready invoices in seconds.
            </p>
            <nav className="flex items-center gap-3" aria-label="Social media">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-navy-100 transition hover:border-gold hover:bg-gold hover:text-navy"
                >
                  <Icon size={16} />
                </a>
              ))}
            </nav>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.15em] text-gold">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
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
            © {year} {siteConfig.company}. All rights reserved.
          </p>
          <p>
            Questions?{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className="text-white hover:underline">
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
