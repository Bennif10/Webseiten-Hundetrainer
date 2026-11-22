import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactCta } from "@/components/sections/ContactCta";
import { Hero } from "@/components/sections/Hero";
import { NeedsGrid } from "@/components/sections/NeedsGrid";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NeedsGrid />
      <ServicesPreview />
      <AboutTeaser />
      <QuoteBand />
      <Testimonials />
      <ContactCta />
    </>
  );
}
