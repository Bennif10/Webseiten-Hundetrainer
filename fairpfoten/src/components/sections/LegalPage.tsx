import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Gemeinsames Gerüst für Impressum und Datenschutzerklärung. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-16 sm:py-24">
      <Container size="narrow">
        <h1 className="text-4xl sm:text-6xl">{title}</h1>
        <div className="prose-legal mt-8">{children}</div>
      </Container>
    </section>
  );
}
