"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import type { Speaker } from "@/lib/speakers";

const INTERVAL_MS = 5500;

const slideVariants = {
  /** Next: new enters from above, old exits down. Previous: the reverse. */
  enter: (dir: number) => ({
    y: dir > 0 ? -56 : 56,
    opacity: 0,
  }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({
    y: dir > 0 ? 56 : -56,
    opacity: 0,
  }),
};

type Props = {
  speakers: Speaker[];
  /** Tighter padding / image sizes on small screens */
  compact?: boolean;
};

export default function HeroFeaturedSpeakersCarousel({
  speakers: roster,
  compact = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const n = roster.length;
  const current = roster[index % n];

  const go = useCallback(
    (delta: number) => {
      if (n <= 1) return;
      setDirection(delta);
      setIndex((i) => (i + delta + n) % n);
    },
    [n]
  );

  useEffect(() => {
    if (n <= 1 || paused) return;
    const t = setInterval(() => go(1), INTERVAL_MS);
    return () => clearInterval(t);
  }, [n, paused, go]);

  if (!current || n === 0) return null;

  const imgSm = compact ? "h-36 w-36 sm:h-40 sm:w-40" : "h-52 w-52 sm:h-56 sm:w-56";
  const imgLg = compact ? "" : "lg:h-[19rem] lg:w-[19rem] xl:h-[21rem] xl:w-[21rem]";
  const textPad = compact ? "p-5 sm:p-6" : "p-6 sm:p-8 sm:pl-6 lg:p-10 lg:pl-8";
  const nameCls = compact
    ? "text-xl font-bold sm:text-2xl"
    : "text-2xl font-bold lg:text-3xl xl:text-4xl";

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
          Featured speakers
        </p>
        {n > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous speaker"
              onClick={() => go(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <ChevronUp className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next speaker"
              onClick={() => go(1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
      </div>

      <div
        className={`relative overflow-hidden ${compact ? "min-h-[200px] sm:min-h-[220px]" : "min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]"}`}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.slug}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0"
          >
            <Link
              href={`/speakers/${current.slug}`}
              className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <Card
                hover={false}
                className="relative overflow-hidden border-white/15 bg-gradient-to-br from-white/[0.14] to-white/[0.05] p-0 shadow-[0_0_60px_-8px_rgba(124,92,255,0.45)] transition duration-300 group-hover:border-accent/35 group-hover:shadow-[0_0_88px_-10px_rgba(124,92,255,0.55)]"
              >
                <div
                  className={`absolute z-20 flex items-center justify-center rounded-full bg-black/35 ring-1 ring-white/25 backdrop-blur-md transition group-hover:bg-accent/90 group-hover:ring-accent ${compact ? "right-4 top-4 h-11 w-11" : "right-5 top-5 h-12 w-12 sm:h-14 sm:w-14"}`}
                >
                  <Play
                    className={compact ? "h-5 w-5 text-white" : "h-6 w-6 text-white sm:h-7 sm:w-7"}
                    fill="currentColor"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-row gap-0">
                  <div
                    className={`relative shrink-0 overflow-hidden rounded-l-2xl ${imgSm} ${imgLg}`}
                  >
                    <Image
                      src={current.image}
                      alt={current.heroImageAlt}
                      fill
                      className={`object-cover ${current.imageClassName ?? ""}`}
                      sizes={
                        compact
                          ? "(max-width: 640px) 144px, 160px"
                          : "(max-width: 1024px) 208px, (max-width: 1280px) 304px, 336px"
                      }
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/25" />
                  </div>
                  <div
                    className={`flex min-w-0 flex-1 flex-col justify-center ${textPad}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {current.league}
                    </p>
                    <h3 className={`mt-1 text-white ${nameCls}`}>{current.name}</h3>
                    <p
                      className={`mt-1 text-white/70 ${compact ? "text-sm sm:text-base" : "text-base lg:text-lg"}`}
                    >
                      {current.tagline}
                    </p>
                    <p
                      className={`mt-2 text-white/50 ${compact ? "text-xs" : "text-sm"}`}
                    >
                      {current.topics}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <span
                        className={`rounded-xl bg-white/10 font-bold text-white ring-1 ring-white/10 ${compact ? "px-3 py-1 text-base" : "px-4 py-1.5 text-base lg:text-lg"}`}
                      >
                        {current.priceLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-base font-medium text-accent transition group-hover:gap-2.5 lg:text-lg">
                        View profile
                        <ArrowRight className="h-5 w-5" aria-hidden />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {n > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {roster.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              aria-label={`Show ${s.name}`}
              aria-current={i === index}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-accent" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
