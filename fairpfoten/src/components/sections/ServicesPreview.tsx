import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { featuredServices } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

export function ServicesPreview() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="services-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Trainingsangebote"
            title="Der Einstieg: ein Tag, der viel bewegt"
            intro="Wenn du die Arbeit nach der Hundeteamschule Anita Balser noch nicht kennst, starten wir in der Regel mit einem Intensivtag – allein oder in der kleinen Gruppe."
          />
          <ButtonLink href="/trainingsangebote" variant="secondary" className="self-start md:self-auto">
            Alle Angebote
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-muted">{siteConfig.pricingNote}</p>
      </Container>
    </section>
  );
}
