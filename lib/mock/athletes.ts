import type { Athlete } from "@/lib/types";

export const athletes: Athlete[] = [
  {
    id: "1",
    name: "Jordan Ellis",
    sport: "NFL",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop",
    bio: "Former pro on resilience, team culture, and leading under pressure.",
    topics: ["Leadership", "Adversity", "Team Culture"],
    priceMin: 7500,
    priceMax: 15000,
    rating: 4.9,
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    longBio:
      "Jordan spent eight seasons in the league before founding a mentorship nonprofit. On stage, Jordan blends locker-room stories with practical frameworks for leaders who need their teams to show up when it counts. Audiences leave with language for accountability, trust, and recovery after setbacks.",
  },
  {
    id: "2",
    name: "Maya Chen",
    sport: "WNBA",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=750&fit=crop",
    bio: "Champion mindset, mental performance, and life after the final buzzer.",
    topics: ["Mental Performance", "Leadership", "Life After Sports"],
    priceMin: 6000,
    priceMax: 12000,
    rating: 4.8,
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    longBio:
      "Maya is a two-time All-Star who now coaches executives on focus and recovery. Her keynotes connect high-stakes competition to everyday leadership: how to prepare, how to reset, and how to build habits that survive real life.",
  },
  {
    id: "3",
    name: "DeShawn Porter",
    sport: "NBA",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=750&fit=crop",
    bio: "Finance, brand building, and translating peak performance to business.",
    topics: ["Finance", "Leadership", "Brand"],
    priceMin: 10000,
    priceMax: 25000,
    rating: 5,
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    longBio:
      "DeShawn went from undrafted to a decade in the league—and then into venture investing. He speaks candidly about money myths, long-term planning, and how athletes can protect their futures while the spotlight is still on.",
  },
  {
    id: "4",
    name: "Sofia Ramirez",
    sport: "Soccer",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0bc0e3e4c74?w=600&h=750&fit=crop",
    bio: "Youth impact, adversity, and building inclusive programs that scale.",
    topics: ["Adversity", "Leadership", "Community"],
    priceMin: 4000,
    priceMax: 9000,
    rating: 4.7,
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    longBio:
      "Sofia represented her country and now advises school districts on student-athlete wellness. Her story-driven talks help educators and corporate teams understand how small environments shape big outcomes.",
  },
  {
    id: "5",
    name: "Tyler Brooks",
    sport: "MLB",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=750&fit=crop",
    bio: "Consistency, failure recovery, and the long game of elite performance.",
    topics: ["Adversity", "Leadership", "Consistency"],
    priceMin: 8000,
    priceMax: 18000,
    rating: 4.85,
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    longBio:
      "Tyler pitched professionally for twelve years. He translates the rhythm of a season—peaks, slumps, and comebacks—into lessons for sales teams, founders, and anyone playing a long career arc.",
  },
  {
    id: "6",
    name: "Aaliyah Okonkwo",
    sport: "Track & Field",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=750&fit=crop",
    bio: "Olympic discipline, identity beyond sport, and high-performance habits.",
    topics: ["Life After Sports", "Mental Performance", "Leadership"],
    priceMin: 5500,
    priceMax: 11000,
    rating: 4.9,
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    longBio:
      "Aaliyah competed on the world stage and now studies sports psychology. She helps organizations design cultures where people can be ambitious without burning out—and where transitions are planned, not feared.",
  },
];

export function getAthleteById(id: string): Athlete | undefined {
  return athletes.find((a) => a.id === id);
}
