import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import WatchRow from "@/components/watch/WatchRow";
import { content, getContentByCategory } from "@/lib/mock/content";
import { DEFAULT_SUBSCRIPTION, canAccessPremium } from "@/lib/future/subscription";
import { estimatePlatformFeeUsd } from "@/lib/future/booking-fees";

export default function WatchPage() {
  const trending = content.slice(0, 6);
  const leadership = getContentByCategory("Leadership");
  const adversity = getContentByCategory("Adversity");
  const lifeAfter = getContentByCategory("Life After Sports");

  const sub = DEFAULT_SUBSCRIPTION;
  const samplePremiumLocked = content.find((c) => c.isPremium);
  const canWatchPremium =
    samplePremiumLocked &&
    canAccessPremium(sub, samplePremiumLocked.isPremium);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-accent/15 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Watch
          </h1>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Leadership, adversity, and life after sports—on demand. Subscriptions and
            bookings fund the next wave of athlete-created talks.
          </p>
        </div>

        <GlassCard hover={false} className="mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">ASN Pro (coming soon)</p>
            <p className="mt-1 text-sm text-white/60">
              Premium rows show a lock until checkout is wired. Mock access:{" "}
              <span className="text-white/80">
                {canWatchPremium ? "would allow preview" : "locked for free tier"}
              </span>
              .
            </p>
            <p className="mt-2 text-xs text-white/40">
              Booking fee placeholder:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(estimatePlatformFeeUsd(50_000))}{" "}
              estimated platform fee on a $50k contract.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" href="/athletes">
              Book an athlete
            </Button>
            <Button variant="primary" href="/dashboard">
              Dashboard
            </Button>
          </div>
        </GlassCard>

        <div className="mt-12 space-y-2">
          <WatchRow
            title="Trending talks"
            subtitle="What teams are watching this week"
            items={trending}
          />
          <WatchRow title="Leadership" items={leadership} />
          <WatchRow title="Adversity" items={adversity} />
          <WatchRow title="Life after sports" items={lifeAfter} />
        </div>

        <GlassCard className="mt-8 p-8 text-center">
          <p className="text-white/80">
            Athlete onboarding flow placeholder — list your talks alongside your booking
            profile.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover"
          >
            Open dashboard →
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
