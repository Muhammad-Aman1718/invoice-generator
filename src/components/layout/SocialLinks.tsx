import { SOCIAL_LINKS } from "@/src/constant/site";

export default function SocialLinks() {
  return (
    <nav className="flex items-center gap-3" aria-label="Social media">
      {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-navy/10 text-navy-500 transition hover:border-navy hover:bg-navy hover:text-white"
        >
          <Icon size={16} />
        </a>
      ))}
    </nav>
  );
}
