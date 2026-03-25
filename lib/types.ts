export type UserRole = "organization" | "athlete" | "viewer";

export type Athlete = {
  id: string;
  name: string;
  sport: string;
  image: string;
  bio: string;
  topics: string[];
  priceMin: number;
  priceMax: number;
  rating: number;
  previewVideoUrl: string;
  longBio: string;
};

export type ContentItem = {
  id: string;
  athleteId: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  description: string;
  isPremium: boolean;
};

export type BookingPayload = {
  athleteId: string;
  organizationName: string;
  eventType: string;
  date: string;
  budget: string;
  location: string;
  notes: string;
};
