import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import FeaturedAthletes from "@/components/sections/FeaturedAthletes";
import TrendingTalks from "@/components/sections/TrendingTalks";
import HowItWorks from "@/components/sections/HowItWorks";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedAthletes />
      <TrendingTalks />
      <HowItWorks />
      <CTA />
    </>
  );
}
