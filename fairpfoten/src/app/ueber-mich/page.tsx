import { Award, Dog as DogIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import portrait from "../../../public/images/trainerin-portrait.jpg";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote, Text } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { dogNeeds, guidingQuote } from "@/data/needs";
import { dogs, qualifications } from "@/data/people";
import { pageMetadata } from "@/lib/metadata";
import { placeholder } from "@/lib/placeholder";

export const metadata = pageMetadata({
  title: "Über mich",
  description:
    "Lerne die Hundetrainerin hinter Fairpfoten kennen: Philosophie, Trainingsansatz und die eigenen Hunde – Hundetraining mit Herz und Haltung.",
  path: "/ueber-mich",
});

const principles = [
  {
    title: "Fair",
    text: "Faire Führung und verständliche Kommunikation – der Hund soll verstehen können, was von ihm erwartet wird.",
  },
  {
    title: "Klar",
    text: "Klare und verlässliche Grenzen geben Sicherheit. Gleichzeitig bekommt der Hund Freiräume und größtmögliche Selbstständigkeit.",
  },
  {
    title: "Individuell",
    text: "Beschäftigung entsprechend Persönlichkeit und Fähigkeiten – mit Respekt vor den individuellen Bedürfnissen und Grenzen jedes Hundes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Über mich"
        title={
          <>
            Mit Herz <em className="text-sage-600">und</em> Haltung
          </>
        }
        intro={guidingQuote.lines.join(" ")}
      />

      {/* Persönliche Vorstellung */}
      <section className="py-20 sm:py-28" aria-labelledby="intro-title">
        <Container className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-sm md:sticky md:top-28 md:max-w-none">
            <Image
              src={portrait}
              alt="Die Hundetrainerin von Fairpfoten lacht und hält ihren schwarz-weißen Hund im Arm"
              placeholder="blur"
              sizes="(min-width: 768px) 26rem, 90vw"
              className="aspect-[4/5] w-full rounded-t-full rounded-b-4xl object-cover shadow-lift"
            />
          </div>
          <div>
            <h2 id="intro-title" className="text-4xl leading-tight sm:text-5xl">
              Hallo, ich bin <Text>{siteConfig.trainer.name}</Text>
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                <Text>{siteConfig.trainer.shortBio}</Text>
              </p>
              <p>
                <Text>
                  {placeholder(
                    "Ausführliche Vorstellung: Werdegang, wie du zum Hundetraining gekommen bist, was dir an der Arbeit mit Mensch und Hund wichtig ist.",
                  )}
                </Text>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophie */}
      <section className="bg-cream-50 py-20 sm:py-28" aria-labelledby="philosophy-title">
        <Container>
          <SectionHeading
            id="philosophy-title"
            eyebrow="Philosophie"
            title="Fair. Klar. Individuell."
            intro="Ein Hund braucht mehr als Erziehung. Im Mittelpunkt stehen seine Bedürfnisse – und ein Mensch, der sie erkennt."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal rounded-4xl border border-sage-900/6 bg-cream-100 p-7">
                <span className="font-serif text-lg text-bark-500 italic">0{i + 1}</span>
                <h3 className="mt-2 text-3xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Trainingsansatz */}
      <section className="py-20 sm:py-28" aria-labelledby="approach-title">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="approach-title"
            eyebrow="Trainingsansatz"
            title="Was Hunde für ein gutes Leben brauchen"
            intro="Das Training baut auf sechs Grundbedürfnissen auf. Sie bilden die Grundlage einer verantwortungsvollen Hundeerziehung."
          />
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {dogNeeds.map(({ id, title, icon: Icon, points }) => (
              <li key={id} className="reveal flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{points[points.length - 1]}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Qualifikationen */}
      <section className="bg-sage-50 py-20 sm:py-28" aria-labelledby="qualifications-title">
        <Container size="narrow">
          <div className="flex items-center gap-3 text-bark-600">
            <Award className="size-5" aria-hidden />
            <p className="text-xs font-semibold tracking-[0.22em] uppercase">Qualifikationen &amp; Erfahrung</p>
          </div>
          <h2 id="qualifications-title" className="mt-3 text-4xl sm:text-5xl">
            Wissen, auf das du dich verlassen kannst
          </h2>
          <ul className="mt-10 space-y-4">
            {qualifications.map((q) => (
              <li key={q} className="flex gap-3 rounded-2xl bg-cream-50 p-5 shadow-soft">
                <Sparkles className="mt-1 size-4 shrink-0 text-sage-600" aria-hidden />
                <Text>{q}</Text>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Hunde */}
      <section className="py-20 sm:py-28" aria-labelledby="dogs-title">
        <Container>
          <SectionHeading
            id="dogs-title"
            eyebrow="Meine Hunde"
            title="Meine wichtigsten Lehrmeister"
            align="center"
          />
          {dogs.some((d) => d.isPlaceholder) && (
            <PlaceholderNote className="mx-auto mt-8 max-w-2xl">
              Fotos und Beschreibungen der eigenen Hunde folgen. Bilder bitte in{" "}
              <code className="font-mono text-xs">public/images/</code> ablegen, Texte in{" "}
              <code className="font-mono text-xs">src/data/people.ts</code> pflegen.
            </PlaceholderNote>
          )}
          <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {dogs.map((dog) => (
              <li key={dog.name} className="reveal overflow-hidden rounded-4xl bg-cream-50 shadow-soft">
                <div className="grid aspect-[4/3] place-items-center bg-sage-100 text-sage-400">
                  <DogIcon className="size-14" strokeWidth={1} aria-hidden />
                  <span className="sr-only">Foto folgt</span>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl">
                    <Text>{dog.name}</Text>
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">
                    <Text>{dog.description}</Text>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
