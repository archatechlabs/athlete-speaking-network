import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { athletes } from "@/lib/data";

export default function AppearancesPage() {
  const brandReady = athletes.filter((a) => a.servicesOffered.includes("appearance"));

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-accent/20 to-transparent blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Appearances &amp; sponsorships
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-white/65 sm:text-base">
          Brands, campaigns, and institutions book athletes for appearances, partnerships, and
          sponsorship narratives—with the same compliance-friendly request flow as speaking and
          training.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <GlassCard hover={false} className="p-8">
            <h2 className="text-lg font-semibold text-white">Brand appearances</h2>
            <p className="mt-3 text-sm text-white/60">
              Retail activations, launches, and fan experiences with clear run-of-show and
              deliverables.
            </p>
          </GlassCard>
          <GlassCard hover={false} className="p-8">
            <h2 className="text-lg font-semibold text-white">Campaign collaborations</h2>
            <p className="mt-3 text-sm text-white/60">
              Social, OOH, and digital storytelling with athletes who match your values—not just
              your impressions.
            </p>
          </GlassCard>
          <GlassCard hover={false} className="p-8">
            <h2 className="text-lg font-semibold text-white">Sponsorship requests</h2>
            <p className="mt-3 text-sm text-white/60">
              Structured inquiries for multi-touch partnerships, NIL-adjacent deals, and nonprofit
              alignments.
            </p>
          </GlassCard>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button variant="primary" href="/athletes">
            Browse athletes
          </Button>
          <Button variant="secondary" href="/mentorship">
            Explore mentorship
          </Button>
        </div>

        <h2 className="mt-16 text-2xl font-bold text-white">Athletes accepting brand work</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brandReady.map((a) => (
            <Card key={a.id} className="p-6">
              <h3 className="font-semibold text-white">{a.name}</h3>
              <p className="mt-1 text-sm text-accent">{a.league}</p>
              <p className="mt-3 line-clamp-3 text-sm text-white/60">{a.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="primary" href={`/book/${a.slug}?service=appearance`} className="!px-4 !py-2 text-sm">
                  Appearance
                </Button>
                <Button
                  variant="secondary"
                  href={`/book/${a.slug}?service=sponsorship`}
                  className="!px-4 !py-2 text-sm"
                >
                  Sponsorship
                </Button>
              </div>
              <Link
                href={`/athletes/${a.slug}`}
                className="mt-3 inline-block text-sm text-accent hover:text-accent-hover"
              >
                Profile →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
