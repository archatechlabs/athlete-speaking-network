"use client";

import { ArrowRight, Mic2, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import HeroFeaturedSpeakersCarousel from "@/components/speakers/HeroFeaturedSpeakersCarousel";
import HeroSpeakerSearch from "@/components/speakers/HeroSpeakerSearch";
import { speakers } from "@/lib/speakers";
import { athletes, SERVICE_LABELS } from "@/lib/data";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";

const stats = [
  { value: "200+", label: "Athletes" },
  { value: "50+", label: "Sports" },
  { value: "24h", label: "Avg. reply" },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function Hero() {
  const spot = athletes[0];
  const previewId = spot.contentIds[0];

  return (
    <section
      id="hero"
      className="relative min-h-[92dvh] min-h-[92vh] overflow-hidden pt-[calc(6rem+env(safe-area-inset-top,0px))] md:min-h-screen md:pt-[calc(7rem+env(safe-area-inset-top,0px))]"
    >
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[100px]" />
      <div
        className="absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/[0.97] to-navy/40 z-[1] lg:to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-3xl md:max-w-2xl lg:max-w-[46%]">
        <Image
          src={HERO_IMAGE}
          alt="Athlete speaking on stage"
          fill
          className="object-cover object-[center_30%] lg:object-left"
          priority
          sizes="(max-width: 1024px) 100vw, 46vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy via-navy/40 to-transparent z-[1] lg:via-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/30 z-[1] lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-8 xl:gap-12 lg:pt-4">
          <div className="flex max-w-xl flex-col justify-center lg:max-w-none lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
              Athlete engagement platform
            </motion.div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <GlassCard hover className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Organizations
                  </p>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
                    Book athletes for impact
                  </h2>
                </GlassCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlassCard hover className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Subscribers &amp; fans
                  </p>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
                    Watch and learn anytime
                  </h2>
                </GlassCard>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            >
              Speaking, training, mentorship, appearances, sponsorships, and streaming—one premium
              network for NFL-caliber athletes and the organizations that book them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-8 max-w-2xl"
            >
              <GlassCard hover={false} className="overflow-hidden p-0 sm:grid sm:grid-cols-[140px_1fr]">
                <div className="relative aspect-square sm:aspect-auto sm:min-h-[200px]">
                  <Image
                    src={spot.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent sm:bg-gradient-to-r" />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    Spotlight
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">{spot.name}</h3>
                  <p className="text-xs text-white/55">{spot.league}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {spot.servicesOffered.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/75"
                      >
                        {SERVICE_LABELS[s]}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-white/60">
                    From {money.format(spot.priceMin)} – {money.format(spot.priceMax)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      href={previewId ? `/watch/${previewId}` : "/watch"}
                      className="!px-4 !py-2 text-sm"
                    >
                      <Play className="h-4 w-4" aria-hidden />
                      Watch preview
                    </Button>
                    <Button
                      variant="primary"
                      href={`/book/${spot.slug}`}
                      className="!px-4 !py-2 text-sm"
                    >
                      Book now
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button variant="primary" href="/athletes">
                Book a Speaker
              </Button>
              <Button variant="secondary" href="/watch">
                Watch Content
              </Button>
              <Button variant="secondary" href="/training">
                Explore Training
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-4 flex flex-wrap gap-3"
            >
              <Button variant="ghost" href="/athletes">
                For organizations
              </Button>
              <Button variant="ghost" href="/apply">
                For athletes
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <HeroSpeakerSearch />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-white/10 py-6"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <p className="text-xl font-bold text-white sm:text-2xl">{s.value}</p>
                  <p className="text-xs text-white/50 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href="/athletes"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white"
              >
                <Mic2 className="h-4 w-4 text-accent" aria-hidden />
                Browse marketplace
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>

          <div className="relative hidden w-full lg:block lg:max-w-none xl:pr-0">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl xl:max-w-[52rem] xl:translate-x-2"
            >
              <HeroFeaturedSpeakersCarousel speakers={speakers} />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-12 lg:hidden"
        >
          <HeroFeaturedSpeakersCarousel speakers={speakers} compact />
        </motion.div>
      </div>
    </section>
  );
}
