import { Check } from "lucide-react";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { dogNeeds } from "@/data/needs";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Trainingsangebote",
  description:
    "Intensivtag, Gruppenintensivtag, Welpenpaket, Walk and Talk und mehr: die Trainingsangebote von Fairpfoten Hundetraining in Ebersbach und Umgebung – mit Preisen.",
  path: "/trainingsangebote",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainingsangebote"
        title="Training, das den ganzen Hund sieht"
        intro="Es gibt kein Patentrezept: Jedes Training richtet sich nach euch als Mensch-Hund-Team. Wenn du die Arbeit nach der Hundeteamschule Anita Balser noch nicht kennst, starten wir in der Regel mit einem Intensivtag."
      />

      <section className="py-20 sm:py-24" aria-labelledby="offers-title">
        <Container>
          <h2 id="offers-title" className="sr-only">
            Alle Angebote
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="mt-10 space-y-2 rounded-3xl bg-sage-50 p-6 text-sm leading-relaxed text-sage-900">
            <p>
              <strong className="font-semibold">Wann?</strong> {siteConfig.trainingTimes}.
            </p>
            <p>{siteConfig.pricingNote}</p>
          </div>
        </Container>
      </section>

      <section className="bg-cream-50 py-20 sm:py-28" aria-labelledby="focus-title">
        <Container>
          <SectionHeading
            id="focus-title"
            eyebrow="Worauf es im Training ankommt"
            title="Sechs Grundbedürfnisse als Fundament"
            intro="Unabhängig vom Angebot: Diese Grundlagen fließen in jedes Training ein."
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {dogNeeds.map(({ id, title, icon: Icon, points }) => (
              <div key={id} className="reveal">
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-sage-600" strokeWidth={1.5} aria-hidden />
                  <h3 className="text-2xl">{title}</h3>
                </div>
                <ul className="mt-3 space-y-2 border-l border-sage-200 pl-5">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2 text-[0.95rem] leading-relaxed text-ink-muted">
                      <Check className="mt-1 size-3.5 shrink-0 text-sage-500" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="pt-20 sm:pt-28">
        <ContactCta />
      </div>
    </>
  );
}
