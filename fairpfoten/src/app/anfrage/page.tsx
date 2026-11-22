import { Suspense } from "react";
import { InquiryWidget } from "@/components/inquiry/InquiryWidget";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Training anfragen",
  description:
    "Training bei Fairpfoten Hundetraining unverbindlich anfragen: Paket wählen, angeben, wann du Zeit hast – und du bekommst einen persönlichen Terminvorschlag.",
  path: "/anfrage",
});

export default function InquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Anfrage"
        title="Training anfragen"
        intro="Wähle ein Paket und sag mir grob, wann du Zeit hast. Daraus entsteht eine fertige E-Mail – ich melde mich dann persönlich mit einem Terminvorschlag."
      />
      <section className="py-12 sm:py-20">
        <Container>
          <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-4xl bg-sage-50" />}>
            <InquiryWidget />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
