import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-28 sm:py-40">
      <Container size="narrow" className="text-center">
        <p className="font-serif text-7xl text-sage-300 italic">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Hier ist leider niemand</h1>
        <p className="mt-4 text-lg text-ink-muted">Die gesuchte Seite gibt es nicht (mehr).</p>
        <ButtonLink href="/" className="mt-8">
          <ArrowLeft className="size-4" aria-hidden />
          Zur Startseite
        </ButtonLink>
      </Container>
    </section>
  );
}
