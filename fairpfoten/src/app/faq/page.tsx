import { Mail } from "lucide-react";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/data/faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Häufige Fragen",
  description:
    "Antworten auf häufige Fragen rund um das Hundetraining bei Fairpfoten: Erstgespräch, Ablauf, Trainingsort und Terminabsagen.",
  path: "/faq",
});

export default function FaqPage() {
  // FAQ-Strukturdaten nur für tatsächlich beantwortete Fragen ausgeben
  const answered = faqItems.filter((i) => i.answer);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Häufige Fragen"
        intro="Hier findest du Antworten auf Fragen, die vor dem ersten Training oft auftauchen."
      />
      <section className="py-16 sm:py-24">
        <Container size="narrow">
          <FaqList items={faqItems} />
          <div className="mt-14 rounded-4xl bg-sage-50 p-8 text-center">
            <h2 className="text-3xl">Deine Frage ist nicht dabei?</h2>
            <p className="mt-3 text-ink-muted">Schreib mir einfach – ich antworte dir persönlich.</p>
            <ButtonLink href="/kontakt" className="mt-6">
              <Mail className="size-4" aria-hidden />
              Frage stellen
            </ButtonLink>
          </div>
        </Container>
      </section>
      {answered.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </>
  );
}
