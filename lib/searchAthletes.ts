import type { Athlete } from "@/lib/types";

export function filterAthletesByQuery(athletes: Athlete[], q: string): Athlete[] {
  const t = q.trim().toLowerCase();
  if (!t) return athletes;
  return athletes.filter((a) => {
    const hay = [a.name, a.sport, a.bio, ...a.topics].join(" ").toLowerCase();
    return hay.includes(t);
  });
}

export type AthleteMarketplaceFilters = {
  q: string;
  sport: string;
  topic: string;
  priceRange: "any" | "under10" | "10to20" | "over20";
};

export function filterAthletesMarketplace(
  athletes: Athlete[],
  f: AthleteMarketplaceFilters
): Athlete[] {
  let list = filterAthletesByQuery(athletes, f.q);

  if (f.sport && f.sport !== "all") {
    list = list.filter((a) => a.sport === f.sport);
  }

  if (f.topic && f.topic !== "all") {
    list = list.filter((a) => a.topics.includes(f.topic));
  }

  if (f.priceRange === "under10") {
    list = list.filter((a) => a.priceMax <= 10_000);
  } else if (f.priceRange === "10to20") {
    list = list.filter((a) => a.priceMin <= 20_000 && a.priceMax >= 10_000);
  } else if (f.priceRange === "over20") {
    list = list.filter((a) => a.priceMin >= 20_000);
  }

  return list;
}

export function uniqueSports(athletes: Athlete[]): string[] {
  return Array.from(new Set(athletes.map((a) => a.sport))).sort();
}

export function uniqueTopics(athletes: Athlete[]): string[] {
  const set = new Set<string>();
  athletes.forEach((a) => a.topics.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
