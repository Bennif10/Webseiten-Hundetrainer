import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

export function ServicesPreview() {
  const hasPlaceholders = services.some((s) => s.isPlaceholder);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="services-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Trainingsangebote"
            title="Training, das zu euch passt"
            intro="Jeder Hund ist anders – und jedes Mensch-Hund-Team auch. Deshalb ist das Training individuell auf euch abgestimmt."
          />
          <ButtonLink href="/trainingsangebote" variant="secondary" className="self-start md:self-auto">
            Alle Angebote
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        {hasPlaceholders && (
          <PlaceholderNote className="mt-8">
            Die konkreten Trainingsangebote stehen noch aus. Die Karten unten zeigen die vorbereitete Struktur und
            werden in <code className="font-mono text-xs">src/data/services.ts</code> befüllt.
          </PlaceholderNote>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
