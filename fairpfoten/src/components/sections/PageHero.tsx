import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}

/** Einheitlicher Kopfbereich für Unterseiten. */
export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-sage-900/5 bg-cream-50">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 size-[28rem] rounded-full bg-sage-100/80 blur-3xl" />
      <Container className="relative py-16 sm:py-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-bark-600 uppercase">{eyebrow}</p>
          <h1 className="text-[2.7rem] leading-[1.05] sm:text-6xl">{title}</h1>
          {intro && <div className="mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">{intro}</div>}
        </div>
      </Container>
    </section>
  );
}
