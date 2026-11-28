import { Heart, Quote, ShieldCheck } from "lucide-react";
import { Stars } from "@/components/feedback/Stars";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { feedbackConfig, ratingCategories } from "@/config/feedback";
import { testimonials } from "@/data/people";
import { averageRatings, formatMonth, formatRating } from "@/lib/ratings";

/**
 * Kundenstimmen mit Sternen je Kategorie.
 * Wird erst angezeigt, sobald mindestens eine echte Bewertung in
 * src/data/people.ts eingetragen ist.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  const averages = averageRatings(testimonials);
  const count = testimonials.length;
  // Neueste zuerst
  const sorted = [...testimonials].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="py-20 sm:py-28" aria-labelledby="testimonials-title">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kundenstimmen"
          title="Was Mensch-Hund-Teams sagen"
          intro={`Durchschnitt aus ${count} ${count === 1 ? "Bewertung" : "Bewertungen"}`}
          align="center"
        />

        <dl className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {ratingCategories.map(({ id, label }) => (
            <div key={id} className="rounded-3xl bg-cream-50 p-5 text-center shadow-soft">
              <dt className="text-sm font-medium text-sage-800">{label}</dt>
              <dd className="mt-2 flex flex-col items-center gap-1">
                <span className="font-serif text-4xl text-sage-900 tabular-nums">{formatRating(averages[id])}</span>
                <Stars value={averages[id]} size="sm" />
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((t, i) => (
            <li key={`${t.date}-${i}`} className="reveal">
              <figure className="flex h-full flex-col rounded-4xl bg-cream-50 p-7 shadow-soft">
                <dl className="space-y-1.5 text-sm">
                  {ratingCategories.map(({ id, label }) => (
                    <div key={id} className="flex flex-wrap items-center justify-between gap-x-3">
                      <dt className="text-ink-muted">{label}</dt>
                      <dd>
                        <Stars value={t.ratings[id]} size="sm" />
                      </dd>
                    </div>
                  ))}
                </dl>
                {t.comment && (
                  <blockquote className="mt-5 flex flex-1 gap-3 border-t border-sage-900/8 pt-5 leading-relaxed text-ink">
                    <Quote className="size-5 shrink-0 text-sage-300" aria-hidden />
                    <p>{t.comment}</p>
                  </blockquote>
                )}
                <figcaption className="mt-auto pt-5 text-sm">
                  <span className="font-medium text-sage-800">{t.author?.trim() || "Anonym"}</span>
                  <span className="text-ink-muted"> · {formatMonth(t.date)}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-5 text-center">
          <p className="flex max-w-2xl items-start gap-2 text-sm leading-relaxed text-ink-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage-600" aria-hidden />
            {feedbackConfig.verificationNotice}
          </p>
          <ButtonLink href="/feedback" variant="secondary">
            <Heart className="size-4" aria-hidden />
            Du hast mit mir trainiert? Feedback geben
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
