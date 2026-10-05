import { CONTACT_CHANNELS } from "@/src/constant/site";

export default function ContactChannels() {
  return (
    <ul className="space-y-4">
      {CONTACT_CHANNELS.map(({ icon: Icon, title, body, href }) => (
        <li key={title} className="panel flex items-start gap-4 p-5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy">
            <Icon size={18} className="text-gold" />
          </span>
          <div>
            <p className="font-black text-navy">{title}</p>
            {href ? (
              <a
                href={href}
                className="text-sm font-semibold text-navy-500 underline decoration-gold underline-offset-4"
              >
                {body}
              </a>
            ) : (
              <p className="text-sm text-navy-500">{body}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
