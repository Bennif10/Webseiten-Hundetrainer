import { Suspense } from "react";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { availabilityConfig } from "@/config/availability";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Termine & Anfrage",
  description:
    "Freie Trainingstermine bei Fairpfoten Hundetraining ansehen und unverbindlich anfragen – der Termin wird nach persönlicher Bestätigung reserviert.",
  path: "/termine",
});

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Terminübersicht"
        title="Termin anfragen"
        intro="Wähle ein Angebot, einen passenden Tag und eine freie Uhrzeit. Deine Anfrage ist unverbindlich – reserviert ist der Termin erst nach meiner persönlichen Bestätigung."
      />
      <section className="py-12 sm:py-20">
        <Container>
          {availabilityConfig.isExampleData && (
            <PlaceholderNote className="mb-8">
              Die angezeigten Zeitfenster sind Beispieldaten. Die echten Verfügbarkeiten werden zentral in{" "}
              <code className="font-mono text-xs">src/config/availability.ts</code> gepflegt.
            </PlaceholderNote>
          )}
          <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-4xl bg-sage-50" />}>
            <BookingWidget />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
