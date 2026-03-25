"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { filterAthletesByQuery } from "@/lib/searchAthletes";
import { athletes } from "@/lib/mock/athletes";

const MAX_SUGGESTIONS = 6;

export default function HeroSpeakerSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
    };
  }, []);

  const suggestions = useMemo(() => {
    const t = q.trim();
    if (t.length < 1) return [];
    return filterAthletesByQuery(athletes, t).slice(0, MAX_SUGGESTIONS);
  }, [q]);

  const cancelBlur = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
  };

  const scheduleBlur = () => {
    blurTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative mt-6 max-w-md lg:max-w-lg">
      <form
        action="/athletes"
        method="get"
        role="search"
        className="flex gap-2"
        onSubmit={() => setOpen(false)}
      >
        <label className="sr-only" htmlFor="hero-speaker-search">
          Search athletes
        </label>
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            aria-hidden
          />
          <input
            id="hero-speaker-search"
            type="search"
            name="q"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={scheduleBlur}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search by name, sport, or topic…"
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] py-3 pl-10 pr-4 text-base text-white placeholder:text-white/40 outline-none ring-accent/0 transition focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
          />
          {open && suggestions.length > 0 && (
            <ul
              className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-white/10 bg-navy-light/95 py-2 shadow-glow-lg backdrop-blur-md"
              role="listbox"
              aria-label="Matching athletes"
              onMouseDown={(e) => e.preventDefault()}
            >
              {suggestions.map((a) => (
                <li key={a.id} role="presentation">
                  <Link
                    href={`/athletes/${a.id}`}
                    role="option"
                    className="flex flex-col gap-0.5 px-4 py-2.5 text-left transition hover:bg-white/10"
                    onClick={() => {
                      setOpen(false);
                      setQ("");
                    }}
                  >
                    <span className="font-medium text-white">{a.name}</span>
                    <span className="text-xs text-white/50">
                      {a.sport} · {a.topics.slice(0, 2).join(", ")}
                    </span>
                  </Link>
                </li>
              ))}
              <li role="presentation" className="border-t border-white/10 pt-2">
                <Link
                  href={
                    q.trim()
                      ? `/athletes?q=${encodeURIComponent(q.trim())}`
                      : "/athletes"
                  }
                  className="block px-4 py-2 text-sm font-medium text-accent hover:text-accent-hover"
                  onMouseEnter={cancelBlur}
                  onMouseLeave={scheduleBlur}
                >
                  See all results →
                </Link>
              </li>
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="h-12 min-w-[44px] shrink-0 touch-manipulation rounded-xl bg-accent px-5 text-base font-semibold text-white transition hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy"
        >
          Search
        </button>
      </form>
    </div>
  );
}
