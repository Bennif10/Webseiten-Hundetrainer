import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { guidingQuote } from "@/data/needs";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-sage-800 py-20 text-cream-50 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.08),transparent_60%)]" />
      <Container size="narrow" className="relative text-center">
        <figure className="reveal">
          <blockquote className="font-serif text-3xl leading-snug text-balance italic sm:text-[2.6rem]">
            {guidingQuote.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </blockquote>
          <figcaption className="mt-8 text-sm tracking-[0.3em] text-sage-200 uppercase">{siteConfig.claim}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
