import { CalendarHeart, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Placeholder";
import { siteConfig } from "@/config/site";

export function ContactCta() {
  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="contact-cta-title">
      <Container>
        <div className="reveal relative overflow-hidden rounded-5xl bg-sage-700 px-6 py-14 text-center text-cream-50 sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-sage-500/40 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-bark-500/30 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="contact-cta-title" className="text-4xl text-cream-50 sm:text-5xl">
              Lass uns gemeinsam starten
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-sage-100">
              Du hast Fragen oder möchtest einen Termin vereinbaren? Schreib mir – ich melde mich persönlich bei dir.
            </p>
            <p className="mt-3 text-sm text-sage-200">
              Trainingsgebiet: <Text tone="dark">{siteConfig.contact.area ?? ""}</Text>
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/termine" size="lg" variant="inverse">
                <CalendarHeart className="size-4" aria-hidden />
                Termin anfragen
              </ButtonLink>
              <ButtonLink href="/kontakt" size="lg" variant="inverse-outline">
                <Mail className="size-4" aria-hidden />
                Nachricht schreiben
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
