import { CalendarHeart, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Placeholder";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { placeholder } from "@/lib/placeholder";
import { toTelHref } from "@/lib/phone";

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt zu Fairpfoten Hundetraining: Schreib mir eine Nachricht oder frage direkt einen Termin für dich und deinen Hund an.",
  path: "/kontakt",
});

export default function ContactPage() {
  const { contact, social } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Schön, dass du dich meldest"
        intro="Ob Frage, erstes Kennenlernen oder konkreter Trainingswunsch – ich freue mich auf deine Nachricht."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside aria-labelledby="contact-info-title" className="space-y-8">
            <div>
              <h2 id="contact-info-title" className="text-3xl">
                Kontaktdaten
              </h2>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
                    <Mail className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-ink-muted">E-Mail</p>
                    <a href={`mailto:${contact.email}`} className="font-medium break-all text-sage-800 hover:underline">
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
                    <Phone className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-ink-muted">Telefon</p>
                    {contact.phone ? (
                      <>
                        <a href={toTelHref(contact.phone)} className="font-medium text-sage-800 hover:underline">
                          {contact.phone}
                        </a>
                        {contact.phoneHours && <p className="mt-0.5 text-sm text-ink-muted">{contact.phoneHours}</p>}
                      </>
                    ) : (
                      <Text>{placeholder("Telefonnummer, falls gewünscht")}</Text>
                    )}
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-ink-muted">Trainingsgebiet</p>
                    <Text className="font-medium text-sage-800">{contact.area ?? ""}</Text>
                  </div>
                </li>
              </ul>
            </div>

            {social.length > 0 && (
              <div>
                <h3 className="text-xl">Social Media</h3>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {social.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-sage-700/20 px-4 py-2 text-sm text-sage-800 hover:border-sage-700"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-4xl bg-sage-700 p-7 text-cream-50">
              <h3 className="text-2xl text-cream-50">Lieber direkt ein Training anfragen?</h3>
              <p className="mt-2 text-sm leading-relaxed text-sage-100">
                Wähle ein Angebot, gib an, wann du Zeit hast – und schick mir eine fertige Anfrage.
              </p>
              <ButtonLink href="/anfrage" variant="inverse" className="mt-5">
                <CalendarHeart className="size-4" aria-hidden />
                Zur Anfrage
              </ButtonLink>
            </div>
          </aside>

          <div>
            <h2 className="sr-only">Kontaktformular</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
