import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "Feedback geben",
    description: "Wie war dein Training bei Fairpfoten Hundetraining? Vergib Sterne und teile deine Erfahrung.",
    path: "/feedback",
  }),
  // Die Seite ist für Kundinnen und Kunden gedacht – nicht für Suchmaschinen.
  robots: { index: false, follow: true },
};

export default function FeedbackPage() {
  return (
    <>
      <PageHero
        eyebrow="Feedback"
        title="Wie war dein Training?"
        intro="Dein Feedback hilft mir, noch besser zu werden – und anderen Mensch-Hund-Teams bei ihrer Entscheidung. Es dauert nur eine Minute, ganz ohne Konto."
      />
      <section className="py-12 sm:py-20">
        <Container>
          <FeedbackWidget />
        </Container>
      </section>
    </>
  );
}
