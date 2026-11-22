import { ArrowRight } from "lucide-react";
import Image from "next/image";
import portrait from "../../../public/images/trainerin-portrait.jpg";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Placeholder";
import { siteConfig } from "@/config/site";

export function AboutTeaser() {
  return (
    <section className="bg-sage-50 py-20 sm:py-28" aria-labelledby="about-teaser-title">
      <Container className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-sm md:max-w-none">
          <div aria-hidden className="absolute -inset-3 rounded-t-full rounded-b-4xl border border-sage-300/70" />
          <Image
            src={portrait}
            alt="Portrait der Hundetrainerin von Fairpfoten, lachend mit ihrem Hund im Arm"
            placeholder="blur"
            sizes="(min-width: 768px) 26rem, 90vw"
            className="relative aspect-[4/5] w-full rounded-t-full rounded-b-4xl object-cover shadow-lift"
          />
        </div>

        <div className="reveal">
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-bark-600 uppercase">Über mich</p>
          <h2 id="about-teaser-title" className="text-4xl leading-[1.08] sm:text-5xl">
            Hallo, ich bin <Text>{siteConfig.trainer.name}</Text>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            <Text>{siteConfig.trainer.shortBio}</Text>
          </p>
          <p className="mt-5 font-serif text-2xl text-sage-700 italic">
            „Ein Hund braucht einen Menschen, der seine Bedürfnisse erkennt.“
          </p>
          <ButtonLink href="/ueber-mich" variant="secondary" className="mt-8">
            Mehr über mich
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
