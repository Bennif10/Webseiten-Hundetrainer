import { ArrowRight, CalendarHeart } from "lucide-react";
import Image from "next/image";
import heroImage from "../../../public/images/trainerin-mit-hund.jpg";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* sanfter Lichtschein im Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-sage-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-bark-200/50 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-28">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage-700/15 bg-cream-50/70 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-sage-700 uppercase">
            {siteConfig.name} · {siteConfig.subtitle}
          </p>
          <h1 id="hero-title" className="text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
            Hundetraining <em className="text-sage-600">mit Herz</em> und Haltung.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            Ein Hund braucht mehr als Erziehung. Er braucht einen Menschen, der seine Bedürfnisse erkennt. Im
            Training stehen genau diese Bedürfnisse im Mittelpunkt – <strong className="font-semibold text-ink">fair, klar
            und individuell</strong>.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/trainingsangebote" size="lg">
              Training entdecken
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/anfrage" variant="secondary" size="lg">
              <CalendarHeart className="size-4" aria-hidden />
              Termin anfragen
            </ButtonLink>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative overflow-hidden rounded-5xl shadow-lift">
            <Image
              src={heroImage}
              alt="Die Hundetrainerin von Fairpfoten drückt lachend ihren schwarz-weißen Hund an sich – im Hintergrund sonniges Grün"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 rounded-2xl border border-sage-900/5 bg-cream-50/95 px-5 py-4 shadow-soft backdrop-blur sm:-left-6">
            <p className="font-serif text-2xl text-sage-800 italic">{siteConfig.claim}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
