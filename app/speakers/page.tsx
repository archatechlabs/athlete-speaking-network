import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { filterSpeakers } from "@/lib/searchSpeakers";
import { speakers } from "@/lib/speakers";

export const metadata: Metadata = {
  title: "Browse Speakers | Athlete Speaking Network",
  description:
    "Book world-class athletes for keynotes, workshops, and virtual events.",
};

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SpeakersIndexPage({ searchParams }: PageProps) {
  const rawQ = searchParams.q;
  const query = typeof rawQ === "string" ? rawQ.trim() : "";
  const roster = filterSpeakers(speakers, query);

  return (
    <div className="min-h-screen bg-navy pb-24 pt-[calc(7rem+env(safe-area-inset-top,0px))]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(124,92,255,0.15),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Speaker roster
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
          Browse athletes
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">
          Explore profiles, topics, and starting rates. Tap a card for the full
          speaker profile.
        </p>

        <form
          action="/speakers"
          method="get"
          role="search"
          className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
        >
          <label className="sr-only" htmlFor="roster-search">
            Search speakers
          </label>
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              aria-hidden
            />
            <input
              id="roster-search"
              type="search"
              name="q"
              defaultValue={query}
              key={query}
              placeholder="Name, league, topic, or keyword…"
              className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] py-3 pl-10 pr-4 text-base text-white placeholder:text-white/40 outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div className="flex gap-2 sm:shrink-0">
            <button
              type="submit"
              className="h-12 touch-manipulation rounded-xl bg-accent px-6 text-base font-semibold text-white transition hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy"
            >
              Search
            </button>
            {query ? (
              <Link
                href="/speakers"
                className="inline-flex h-12 min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-white/20 px-4 text-base font-medium text-white/80 transition hover:border-white/35 hover:text-white"
              >
                Clear
              </Link>
            ) : null}
          </div>
        </form>

        <p className="mt-4 text-sm text-white/50">
          {query ? (
            <>
              {roster.length === 0
                ? "No matches for "
                : `${roster.length} match${roster.length === 1 ? "" : "es"} for `}
              <span className="font-medium text-white/70">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            <>{speakers.length} speakers on the roster</>
          )}
        </p>

        {roster.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roster.map((s) => (
              <Link
                key={s.slug}
                href={`/speakers/${s.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-accent/40 hover:shadow-glow"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.heroImageAlt}
                    fill
                    className={`object-cover transition duration-500 group-hover:scale-105 ${s.imageClassName ?? ""}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-medium text-accent">{s.league}</p>
                    <h2 className="mt-1 text-lg font-semibold text-white group-hover:text-accent transition">
                      {s.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-white/65">
                      {s.highlight}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-white">
                      From {s.priceLabel}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-14 text-center">
            <p className="text-lg text-white/80">
              Try a different keyword, or browse the full roster.
            </p>
            <Link
              href="/speakers"
              className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-hover"
            >
              Clear search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
