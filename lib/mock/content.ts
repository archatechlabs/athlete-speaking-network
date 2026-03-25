import type { ContentItem } from "@/lib/types";

export const content: ContentItem[] = [
  {
    id: "1",
    athleteId: "1",
    title: "Overcoming Adversity",
    category: "Leadership",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1517649763962-0c62306601b7?w=640&h=360&fit=crop",
    duration: "24 min",
    description:
      "Jordan breaks down the moments that tested his career—and the mindset that carried him through.",
    isPremium: true,
  },
  {
    id: "2",
    athleteId: "1",
    title: "Locker Room Leadership",
    category: "Leadership",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=640&h=360&fit=crop",
    duration: "18 min",
    description: "What captains actually do when no one is watching.",
    isPremium: false,
  },
  {
    id: "3",
    athleteId: "2",
    title: "Focus Under Noise",
    category: "Adversity",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=360&fit=crop",
    duration: "31 min",
    description: "Maya’s framework for staying present when the stakes spike.",
    isPremium: true,
  },
  {
    id: "4",
    athleteId: "3",
    title: "Money Moves After the League",
    category: "Life After Sports",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&h=360&fit=crop",
    duration: "42 min",
    description: "DeShawn on investing, advisors, and avoiding common pitfalls.",
    isPremium: true,
  },
  {
    id: "5",
    athleteId: "4",
    title: "Building Inclusive Programs",
    category: "Leadership",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1594736797933-d0bc0e3e4c74?w=640&h=360&fit=crop",
    duration: "27 min",
    description: "How Sofia scaled youth initiatives without losing the human touch.",
    isPremium: false,
  },
  {
    id: "6",
    athleteId: "5",
    title: "The Slump Is Data",
    category: "Adversity",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=640&h=360&fit=crop",
    duration: "22 min",
    description: "Tyler reframes failure as feedback—on the mound and in business.",
    isPremium: true,
  },
  {
    id: "7",
    athleteId: "6",
    title: "Identity Beyond the Medal",
    category: "Life After Sports",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=640&h=360&fit=crop",
    duration: "35 min",
    description: "Aaliyah on reinvention, boundaries, and sustainable ambition.",
    isPremium: true,
  },
  {
    id: "8",
    athleteId: "2",
    title: "Championship Habits",
    category: "Leadership",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=640&h=360&fit=crop",
    duration: "19 min",
    description: "Daily non-negotiables that compound into elite outcomes.",
    isPremium: false,
  },
];

export function getContentById(id: string): ContentItem | undefined {
  return content.find((c) => c.id === id);
}

export function getContentByAthleteId(athleteId: string): ContentItem[] {
  return content.filter((c) => c.athleteId === athleteId);
}

export function getContentByCategory(category: string): ContentItem[] {
  return content.filter((c) => c.category === category);
}
