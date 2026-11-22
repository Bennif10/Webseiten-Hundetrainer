import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dogNeeds, needsIntro } from "@/data/needs";

export function NeedsGrid() {
  return (
    <section className="bg-cream-50 py-20 sm:py-28" aria-labelledby="needs-title">
      <Container>
        <SectionHeading
          id="needs-title"
          eyebrow="Die Grundlagen"
          title={needsIntro.title}
          intro={needsIntro.subtitle}
          align="center"
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dogNeeds.map(({ id, title, icon: Icon, points }) => (
            <li
              key={id}
              className="reveal group rounded-4xl border border-sage-900/6 bg-cream-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sage-300 hover:bg-cream-50 hover:shadow-lift"
            >
              <span className="grid size-13 place-items-center rounded-full bg-sage-100 text-sage-700 transition-colors duration-300 group-hover:bg-sage-700 group-hover:text-cream-50">
                <Icon className="size-6" strokeWidth={1.5} aria-hidden />
              </span>
              <h3 className="mt-5 text-[1.7rem] leading-tight">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
                    <Check className="mt-1 size-4 shrink-0 text-sage-600" strokeWidth={2.25} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
