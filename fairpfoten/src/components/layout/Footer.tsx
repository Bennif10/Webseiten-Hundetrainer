import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Placeholder";
import { legalNav, mainNav, siteConfig } from "@/config/site";
import { toTelHref } from "@/lib/phone";
import { Logo } from "./Logo";

export function Footer() {
  const { contact, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sage-900 text-sage-100">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs font-serif text-xl italic text-cream-100">{siteConfig.tagline}</p>
          <p className="mt-2 text-sm tracking-[0.2em] text-sage-300 uppercase">{siteConfig.claim}</p>
        </div>

        <nav aria-label="Footer-Navigation">
          <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-sage-300 uppercase">Seiten</h2>
          <ul className="mt-4 space-y-2">
            {[...mainNav, { label: "Feedback geben", href: "/feedback" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sage-100 transition-colors hover:text-cream-50 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.22em] text-sage-300 uppercase">Kontakt</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-sage-300" aria-hidden />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-cream-50 hover:underline">
                {contact.email}
              </a>
            </li>
            {contact.phone && (
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-sage-300" aria-hidden />
                <a href={toTelHref(contact.phone)} className="hover:text-cream-50 hover:underline">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.area && (
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sage-300" aria-hidden />
                <Text tone="dark">{contact.area}</Text>
              </li>
            )}
          </ul>
          {social.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3 text-sm">
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener noreferrer" target="_blank" className="hover:text-cream-50 hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      <div className="border-t border-cream-50/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-sage-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name} {siteConfig.subtitle}
          </p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream-50 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
