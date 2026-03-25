export type UserRole = "organization" | "athlete" | "subscriber" | "admin";

/** @deprecated use subscriber — kept for localStorage migration */
export type LegacyViewerRole = "viewer";

export type ServiceKind =
  | "speaking"
  | "training"
  | "mentoring"
  | "appearance"
  | "sponsorship"
  | "consultation";

export type FormatKind = "virtual" | "in-person";

export type Athlete = {
  id: string;
  slug: string;
  name: string;
  league: string;
  sport: string;
  location: string;
  bio: string;
  longBio: string;
  topics: string[];
  servicesOffered: ServiceKind[];
  priceMin: number;
  priceMax: number;
  rating: number;
  image: string;
  verified: boolean;
  availableFormats: FormatKind[];
  previewVideoUrl: string;
  mentorshipAreas: string[];
  contentIds: string[];
};

export type ContentItem = {
  id: string;
  athleteId: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  isPremium: boolean;
};

export type PlatformService = {
  id: string;
  athleteId: string;
  type: ServiceKind;
  title: string;
  description: string;
  startingPrice: number;
  format: FormatKind | "both";
  duration: string;
};

export type TrainingProgram = {
  id: string;
  athleteId: string;
  title: string;
  description: string;
  duration: string;
  skillLevel: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  price: number;
  sport: string;
  ageGroup: string;
  format: FormatKind | "both";
};

export type BookingPayload = {
  athleteId: string;
  athleteSlug: string;
  serviceType: ServiceKind;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  virtualOrInPerson: "virtual" | "in-person" | "hybrid";
  budget: string;
  audienceSize: string;
  notes: string;
};

export type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  leagueSport: string;
  yearsPlayed: string;
  city: string;
  servicesOffered: string;
  topics: string;
  bio: string;
  socialLinks: string;
  videoIntroUrl: string;
  availability: string;
  pricingRange: string;
};
