import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Benefits from "@/components/sections/Benefits";
import FeaturedAthletes from "@/components/sections/FeaturedAthletes";
import TrendingTalks from "@/components/sections/TrendingTalks";
import TrainingMentorshipPreview from "@/components/sections/TrainingMentorshipPreview";
import HowItWorks from "@/components/sections/HowItWorks";
import AILegacySection from "@/components/sections/AILegacySection";
import StudioServicesSection from "@/components/sections/StudioServicesSection";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Benefits />
      <FeaturedAthletes />
      <TrendingTalks />
      <TrainingMentorshipPreview />
      <HowItWorks />
      <AILegacySection />
      <StudioServicesSection />
      <CTA />
    </>
  );
}
