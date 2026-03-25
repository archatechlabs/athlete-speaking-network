import type { Athlete, ServiceKind } from "@/lib/types";

export function filterAthletesByQuery(athletes: Athlete[], q: string): Athlete[] {
  const t = q.trim().toLowerCase();
  if (!t) return athletes;
  return athletes.filter((a) => {
    const hay = [
      a.name,
      a.sport,
      a.league,
      a.location,
      a.bio,
      ...a.topics,
      ...a.servicesOffered,
      ...a.mentorshipAreas,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(t);
  });
}

export type AthleteMarketplaceFilters = {
  q: string;
  sport: string;
  serviceType: "all" | ServiceKind;
  topic: string;
  format: "all" | "virtual" | "in-person";
  location: string;
  priceRange: "any" | "under10" | "10to20" | "over20";
};

export function filterAthletesMarketplace(
  list: Athlete[],
  f: AthleteMarketplaceFilters
): Athlete[] {
  let out = filterAthletesByQuery(list, f.q);

  if (f.sport && f.sport !== "all") {
    out = out.filter((a) => a.sport === f.sport);
  }

  if (f.serviceType !== "all") {
    const svc = f.serviceType;
    out = out.filter((a) => a.servicesOffered.includes(svc));
  }

  if (f.topic && f.topic !== "all") {
    out = out.filter((a) =>
      a.topics.some((t) => t.toLowerCase() === f.topic.toLowerCase())
    );
  }

  if (f.format === "virtual") {
    out = out.filter((a) => a.availableFormats.includes("virtual"));
  } else if (f.format === "in-person") {
    out = out.filter((a) => a.availableFormats.includes("in-person"));
  }

  if (f.location.trim()) {
    const loc = f.location.trim().toLowerCase();
    out = out.filter((a) => a.location.toLowerCase().includes(loc));
  }

  if (f.priceRange === "under10") {
    out = out.filter((a) => a.priceMax <= 10_000);
  } else if (f.priceRange === "10to20") {
    out = out.filter((a) => a.priceMin <= 20_000 && a.priceMax >= 10_000);
  } else if (f.priceRange === "over20") {
    out = out.filter((a) => a.priceMin >= 20_000);
  }

  return out;
}

export function uniqueSports(athletes: Athlete[]): string[] {
  return Array.from(new Set(athletes.map((a) => a.sport))).sort();
}

export function uniqueTopics(athletes: Athlete[]): string[] {
  const set = new Set<string>();
  athletes.forEach((a) => a.topics.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
