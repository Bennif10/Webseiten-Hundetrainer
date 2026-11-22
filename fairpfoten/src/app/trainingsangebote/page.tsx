import { Check } from "lucide-react";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dogNeeds } from "@/data/needs";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Trainingsangebote",
  description:
    "Die Trainingsangebote von Fairpfoten Hundetraining: individuelles Training, das die Bedürfnisse deines Hundes in den Mittelpunkt stellt.",
  path: "/trainingsangebote",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainingsangebote"
        title="Training, das den ganzen Hund sieht"
        intro="Fair, klar und individuell: Jedes Training richtet sich nach der Persönlichkeit, den Fähigkeiten und den Bedürfnissen deines Hundes – und nach dem, was ihr als Team braucht."
      />

      <section className="py-20 sm:py-24" aria-labelledby="offers-title">
        <Container>
          <h2 id="offers-title" className="sr-only">
            Alle Angebote
          </h2>
          {services.some((s) => s.isPlaceholder) && (
            <PlaceholderNote className="mb-10">
              Die konkreten Angebote (Name, Beschreibung, Zielgruppe, Dauer und – falls gewünscht – Preis) liegen noch
              nicht vor. Sie werden zentral in <code className="font-mono text-xs">src/data/services.ts</code> gepflegt
              und erscheinen dann automatisch hier, auf der Startseite und in der Terminanfrage.
            </PlaceholderNote>
          )}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
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
