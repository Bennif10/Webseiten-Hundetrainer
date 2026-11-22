import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { story } from "@/data/story";

/** Einstieg auf der Startseite: holt Besucher bei ihrem Alltag ab. */
export function StorySection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="story-title">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <h2 id="story-title" className="text-4xl leading-[1.1] sm:text-5xl">
            {story.opening[0]}
          </h2>
          <p className="mt-4 font-serif text-2xl text-sage-600 italic">{story.opening[1]}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">{story.struggle}</p>
          <ul className="mt-6 space-y-2 border-l-2 border-bark-300 pl-5 text-lg text-ink">
            {story.signs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-10 font-serif text-3xl text-sage-800">{story.truth}</p>
          <div className="mt-4 space-y-1 text-lg leading-relaxed text-ink-muted">
            {story.explanation.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-serif text-2xl text-sage-700 italic">
            {story.needs.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </p>
        </div>

        <div className="reveal self-center rounded-5xl bg-sage-50 p-8 sm:p-12">
          <h3 className="text-3xl sm:text-4xl">{story.approachTitle}</h3>
          <div className="mt-5 space-y-3 text-lg leading-relaxed text-ink-muted">
            {story.approach.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <ul className="mt-7 space-y-3">
            {story.promises.map((p) => (
              <li key={p} className="flex items-center gap-3 text-lg font-medium text-sage-900">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sage-700 text-cream-50">
                  <Check className="size-4" strokeWidth={2.5} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-sage-900/10 pt-6">
            {story.closing.map((s, i) => (
              <p key={s} className={i === 1 ? "mt-1 font-serif text-2xl text-sage-800 italic" : "text-ink-muted"}>
                {s}
              </p>
            ))}
            <ButtonLink href="/anfrage" className="mt-6">
              Ersten Schritt machen
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
