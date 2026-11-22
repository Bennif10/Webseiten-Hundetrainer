import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/Placeholder";

/** Gemeinsames Gerüst für Impressum und Datenschutzerklärung. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-16 sm:py-24">
      <Container size="narrow">
        <h1 className="text-4xl sm:text-6xl">{title}</h1>
        <PlaceholderNote className="mt-8">
          <strong className="font-semibold">Entwurf – keine Rechtsberatung.</strong> Angaben in eckigen Klammern
          fehlen noch. Der finale Text muss vor der Veröffentlichung vollständig ergänzt und rechtlich geprüft werden
          (z. B. mit einem Generator eines Anbieters für Rechtstexte oder anwaltlich).
        </PlaceholderNote>
        <div className="prose-legal mt-6">{children}</div>
      </Container>
    </section>
  );
}
