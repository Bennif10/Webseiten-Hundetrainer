import { ArrowRight } from "lucide-react";
import Image from "next/image";
import portrait from "../../../public/images/trainerin-mit-elli-und-milla.jpg";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { aboutText } from "@/data/people";

export function AboutTeaser() {
  return (
    <section className="bg-sage-50 py-20 sm:py-28" aria-labelledby="about-teaser-title">
      <Container className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-sm md:max-w-none">
          <div aria-hidden className="absolute -inset-3 rounded-t-full rounded-b-4xl border border-sage-300/70" />
          <Image
            src={portrait}
            alt="Stefanie Rathmer steht lachend auf einer Sommerwiese, neben ihr sitzen ihre Border Collies Elli und Milla"
            placeholder="blur"
            sizes="(min-width: 768px) 26rem, 90vw"
            className="relative aspect-[3/4] w-full rounded-t-full rounded-b-4xl object-cover shadow-lift"
          />
        </div>

        <div className="reveal">
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-bark-600 uppercase">Über mich</p>
          <h2 id="about-teaser-title" className="text-4xl leading-[1.08] sm:text-5xl">
            Hallo, ich bin {siteConfig.trainer.firstName}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">{siteConfig.trainer.shortBio}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{aboutText[0]}</p>
          <ButtonLink href="/ueber-mich" variant="secondary" className="mt-8">
            Mehr über mich
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
