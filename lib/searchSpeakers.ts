import type { Speaker } from "./speakers";

/**
 * Filter speakers by a free-text query. Matches name, league, topics, bio, and highlight.
 * All whitespace-separated tokens must appear somewhere in the combined fields.
 */
export function filterSpeakers(list: Speaker[], query: string): Speaker[] {
  const raw = query.trim().toLowerCase();
  if (!raw) return list;

  const tokens = raw.split(/\s+/).filter((t) => t.length > 0);
  if (tokens.length === 0) return list;

  return list.filter((s) => {
    const haystack = [
      s.name,
      s.tagline,
      s.league,
      s.topics,
      s.highlight,
      s.bio,
      ...s.topicsList,
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}
