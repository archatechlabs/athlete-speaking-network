"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AthleteMarketplaceCard from "@/components/athletes/AthleteMarketplaceCard";
import GlassCard from "@/components/ui/GlassCard";
import { athletes } from "@/lib/mock/athletes";
import {
  filterAthletesMarketplace,
  uniqueSports,
  uniqueTopics,
  type AthleteMarketplaceFilters,
} from "@/lib/searchAthletes";

const defaultFilters: AthleteMarketplaceFilters = {
  q: "",
  sport: "all",
  topic: "all",
  priceRange: "any",
};

export default function AthletesMarketplaceClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<AthleteMarketplaceFilters>(defaultFilters);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setFilters((prev) => ({ ...prev, q }));
  }, [searchParams]);

  const sports = useMemo(() => uniqueSports(athletes), []);
  const topics = useMemo(() => uniqueTopics(athletes), []);

  const filtered = useMemo(
    () => filterAthletesMarketplace(athletes, filters),
    [filters]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-2xl"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Athlete marketplace
        </h1>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Search by sport, topic, or budget. Every profile links to streamable talks and
          booking—so teams can learn before they book.
        </p>
      </motion.div>

      <GlassCard className="mt-10 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_repeat(3,minmax(0,11rem))] lg:items-end">
          <div className="relative">
            <label className="sr-only" htmlFor="marketplace-search">
              Search athletes
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              id="marketplace-search"
              type="search"
              value={filters.q}
              onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
              placeholder="Name, sport, or topic…"
              className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/50" htmlFor="sport">
              Sport
            </label>
            <select
              id="sport"
              value={filters.sport}
              onChange={(e) => setFilters((f) => ({ ...f, sport: e.target.value }))}
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light/90 px-3 text-sm text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
            >
              <option value="all">All sports</option>
              {sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/50" htmlFor="topic">
              Topic
            </label>
            <select
              id="topic"
              value={filters.topic}
              onChange={(e) => setFilters((f) => ({ ...f, topic: e.target.value }))}
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light/90 px-3 text-sm text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
            >
              <option value="all">All topics</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/50" htmlFor="price">
              Price range
            </label>
            <select
              id="price"
              value={filters.priceRange}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  priceRange: e.target.value as AthleteMarketplaceFilters["priceRange"],
                }))
              }
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light/90 px-3 text-sm text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
            >
              <option value="any">Any budget</option>
              <option value="under10">Under $10k</option>
              <option value="10to20">$10k – $20k</option>
              <option value="over20">$20k+</option>
            </select>
          </div>
        </div>
      </GlassCard>

      <p className="mt-6 text-sm text-white/50">
        {filtered.length} athlete{filtered.length === 1 ? "" : "s"} match your filters
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <AthleteMarketplaceCard athlete={a} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <GlassCard hover={false} className="mt-10 p-10 text-center">
          <p className="text-white/80">No athletes match those filters.</p>
          <button
            type="button"
            onClick={() => setFilters(defaultFilters)}
            className="mt-4 text-sm font-medium text-accent hover:text-accent-hover"
          >
            Clear filters
          </button>
        </GlassCard>
      )}
    </div>
  );
}
