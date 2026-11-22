import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactCta } from "@/components/sections/ContactCta";
import { Hero } from "@/components/sections/Hero";
import { NeedsGrid } from "@/components/sections/NeedsGrid";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { StorySection } from "@/components/sections/StorySection";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <NeedsGrid />
      <ServicesPreview />
      <AboutTeaser />
      <QuoteBand />
      <Testimonials />
      <div className="pt-20 sm:pt-28">
        <ContactCta />
      </div>
    </>
  );
}
