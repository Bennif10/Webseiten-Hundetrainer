import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote, Text } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/people";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  const allPlaceholders = testimonials.every((t) => t.isPlaceholder);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="testimonials-title">
      <Container>
        <SectionHeading id="testimonials-title" eyebrow="Kundenstimmen" title="Was Mensch-Hund-Teams sagen" align="center" />
        {allPlaceholders && (
          <PlaceholderNote className="mx-auto mt-8 max-w-2xl">
            Hier erscheinen echte Kundenstimmen, sobald sie vorliegen (nur mit Einverständnis der Personen).
            Pflege: <code className="font-mono text-xs">src/data/people.ts</code>
          </PlaceholderNote>
        )}
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i} className="reveal">
              <figure className="flex h-full flex-col rounded-4xl bg-cream-50 p-7 shadow-soft">
                <Quote className="size-7 text-sage-300" aria-hidden />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink-muted">
                  <Text>{t.quote}</Text>
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium text-sage-800">
                  <Text>{t.author}</Text>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
