import type {
  Athlete,
  ApplicationPayload,
  ContentItem,
  PlatformService,
  ServiceKind,
  TrainingProgram,
} from "@/lib/types";

export type ApplicationRecord = ApplicationPayload & {
  id: string;
  submittedAt: string;
  status: "pending" | "review" | "approved";
};

export const athletes: Athlete[] = [
  {
    id: "1",
    slug: "jordan-ellis",
    name: "Jordan Ellis",
    league: "NFL · 8 seasons",
    sport: "Football",
    location: "Dallas, TX",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=750&fit=crop",
    bio: "Former pro on resilience, team culture, and leading under pressure.",
    longBio:
      "Jordan spent eight seasons in the league before founding a mentorship nonprofit. On stage, Jordan blends locker-room stories with practical frameworks for leaders who need their teams to show up when it counts. Off-stage, he trains executives on decision-making under fatigue and designs youth camps that teach accountability without shame.",
    topics: [
      "Leadership",
      "Adversity",
      "Entrepreneurship",
      "Youth development",
      "Team culture",
      "Transition after sports",
    ],
    servicesOffered: [
      "speaking",
      "training",
      "mentoring",
      "appearance",
      "sponsorship",
      "consultation",
    ],
    priceMin: 7500,
    priceMax: 15000,
    rating: 4.9,
    verified: true,
    availableFormats: ["virtual", "in-person"],
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mentorshipAreas: ["Leadership", "Career transition", "Youth mentoring"],
    contentIds: ["1", "2"],
  },
  {
    id: "2",
    slug: "maya-chen",
    name: "Maya Chen",
    league: "WNBA · 2× All-Star",
    sport: "Basketball",
    location: "Seattle, WA",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=750&fit=crop",
    bio: "Champion mindset, mental performance, and life after the final buzzer.",
    longBio:
      "Maya is a two-time All-Star who now coaches executives on focus and recovery. Her keynotes connect high-stakes competition to everyday leadership. She mentors founders on sustainable ambition and runs virtual mindset labs for student-athletes.",
    topics: [
      "Mental performance",
      "Leadership",
      "Transition after sports",
      "Discipline",
      "Training & mindset",
    ],
    servicesOffered: ["speaking", "training", "mentoring", "consultation"],
    priceMin: 6000,
    priceMax: 12000,
    rating: 4.8,
    verified: true,
    availableFormats: ["virtual", "in-person"],
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mentorshipAreas: ["Life coaching", "Leadership mentoring", "Transition support"],
    contentIds: ["3", "8"],
  },
  {
    id: "3",
    slug: "deshawn-porter",
    name: "DeShawn Porter",
    league: "NBA · 10 seasons",
    sport: "Basketball",
    location: "Atlanta, GA",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=750&fit=crop",
    bio: "Finance, brand building, and translating peak performance to business.",
    longBio:
      "DeShawn went from undrafted to a decade in the league—and then into venture investing. He speaks candidly about money myths and long-term planning, hosts entrepreneurship roundtables for athletes, and advises brands on authentic partnerships.",
    topics: ["Finance", "Entrepreneurship", "Leadership", "Brand", "Sponsorships"],
    servicesOffered: ["speaking", "mentoring", "appearance", "sponsorship", "consultation"],
    priceMin: 10000,
    priceMax: 25000,
    rating: 5,
    verified: true,
    availableFormats: ["virtual", "in-person"],
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mentorshipAreas: ["Entrepreneurship mentoring", "Finance", "Brand deals"],
    contentIds: ["4"],
  },
  {
    id: "4",
    slug: "sofia-ramirez",
    name: "Sofia Ramirez",
    league: "USWNT · Olympian",
    sport: "Soccer",
    location: "Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0bc0e3e4c74?w=600&h=750&fit=crop",
    bio: "Youth impact, adversity, and building inclusive programs that scale.",
    longBio:
      "Sofia represented her country and now advises school districts on student-athlete wellness. She trains coaches on inclusive programming, mentors first-gen athletes, and partners with brands on community-first campaigns.",
    topics: ["Youth development", "Adversity", "Leadership", "Community"],
    servicesOffered: ["speaking", "training", "mentoring", "appearance", "sponsorship"],
    priceMin: 4000,
    priceMax: 9000,
    rating: 4.7,
    verified: true,
    availableFormats: ["virtual", "in-person"],
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mentorshipAreas: ["Youth mentoring", "Leadership", "Inclusion"],
    contentIds: ["5"],
  },
  {
    id: "5",
    slug: "tyler-brooks",
    name: "Tyler Brooks",
    league: "MLB · 12 seasons",
    sport: "Baseball",
    location: "Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=750&fit=crop",
    bio: "Consistency, failure recovery, and the long game of elite performance.",
    longBio:
      "Tyler pitched professionally for twelve years. He translates the rhythm of a season into lessons for sales teams and founders, runs arm-care and routine clinics for youth programs, and mentors athletes navigating slumps.",
    topics: ["Adversity", "Discipline", "Training & mindset", "Leadership"],
    servicesOffered: ["speaking", "training", "mentoring", "consultation"],
    priceMin: 8000,
    priceMax: 18000,
    rating: 4.85,
    verified: true,
    availableFormats: ["virtual", "in-person"],
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mentorshipAreas: ["Performance habits", "Recovery", "Youth pitching"],
    contentIds: ["6"],
  },
  {
    id: "6",
    slug: "aaliyah-okonkwo",
    name: "Aaliyah Okonkwo",
    league: "Olympic Track · Finalist",
    sport: "Track & Field",
    location: "Austin, TX",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=750&fit=crop",
    bio: "Olympic discipline, identity beyond sport, and high-performance habits.",
    longBio:
      "Aaliyah competed on the world stage and now studies sports psychology. She helps organizations design cultures where people can be ambitious without burning out, offers virtual consultations on identity and transition, and builds training plans for emerging sprinters.",
    topics: [
      "Transition after sports",
      "Mental performance",
      "Training & mindset",
      "Leadership",
    ],
    servicesOffered: ["speaking", "training", "mentoring", "consultation"],
    priceMin: 5500,
    priceMax: 11000,
    rating: 4.9,
    verified: true,
    availableFormats: ["virtual", "in-person"],
    previewVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mentorshipAreas: ["Life coaching", "Transition support", "Mental skills"],
    contentIds: ["7"],
  },
];

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
    category: "Transition After Sports",
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
    category: "Youth Development",
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
    category: "Transition After Sports",
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
    category: "Training & Mindset",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=640&h=360&fit=crop",
    duration: "19 min",
    description: "Daily non-negotiables that compound into elite outcomes.",
    isPremium: false,
  },
  {
    id: "9",
    athleteId: "3",
    title: "From Combine to Cap Table",
    category: "Entrepreneurship",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=640&h=360&fit=crop",
    duration: "29 min",
    description: "How DeShawn evaluates deals and protects long-term upside.",
    isPremium: true,
  },
  {
    id: "10",
    athleteId: "1",
    title: "Fourth Quarter Decisions",
    category: "Training & Mindset",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=640&h=360&fit=crop",
    duration: "16 min",
    description: "Pressure protocols for leaders when the clock is running out.",
    isPremium: false,
  },
];

export const services: PlatformService[] = [
  {
    id: "s1-1",
    athleteId: "1",
    type: "speaking",
    title: "Keynotes & workshops",
    description: "Inspiring keynotes on leadership, culture, and resilience for teams and students.",
    startingPrice: 7500,
    format: "both",
    duration: "45–90 min",
  },
  {
    id: "s1-2",
    athleteId: "1",
    type: "training",
    title: "Elite habits intensive",
    description: "Virtual or on-site sessions building routines used in pro locker rooms.",
    startingPrice: 3500,
    format: "both",
    duration: "Half day",
  },
  {
    id: "s1-3",
    athleteId: "1",
    type: "mentoring",
    title: "1:1 mentorship",
    description: "Ongoing guidance for emerging leaders and student-athletes.",
    startingPrice: 500,
    format: "virtual",
    duration: "60 min / session",
  },
  {
    id: "s1-4",
    athleteId: "1",
    type: "appearance",
    title: "Brand & community appearances",
    description: "Signed appearances, meet-and-greets, and campaign days.",
    startingPrice: 10000,
    format: "in-person",
    duration: "2–4 hours",
  },
  {
    id: "s1-5",
    athleteId: "1",
    type: "sponsorship",
    title: "Sponsorship & partnerships",
    description: "Structured packages for brands aligned with youth and performance.",
    startingPrice: 25000,
    format: "both",
    duration: "Campaign-based",
  },
  {
    id: "s1-6",
    athleteId: "1",
    type: "consultation",
    title: "Virtual consultation",
    description: "Strategy calls for athletic departments, nonprofits, and startups.",
    startingPrice: 750,
    format: "virtual",
    duration: "45 min",
  },
  {
    id: "s2-1",
    athleteId: "2",
    type: "speaking",
    title: "Mindset under pressure",
    description: "Talks and workshops on focus, recovery, and confidence.",
    startingPrice: 6000,
    format: "both",
    duration: "60 min",
  },
  {
    id: "s2-2",
    athleteId: "2",
    type: "training",
    title: "Mental performance lab",
    description: "Small-group virtual training for teams and trainees.",
    startingPrice: 2000,
    format: "virtual",
    duration: "4 weeks",
  },
  {
    id: "s2-3",
    athleteId: "2",
    type: "mentoring",
    title: "Executive mentoring",
    description: "Leadership and transition coaching for professionals.",
    startingPrice: 600,
    format: "virtual",
    duration: "Monthly",
  },
  {
    id: "s3-1",
    athleteId: "3",
    type: "speaking",
    title: "Finance & brand keynotes",
    description: "Audiences learn how elite performers think about money and partnerships.",
    startingPrice: 12000,
    format: "both",
    duration: "45–60 min",
  },
  {
    id: "s3-2",
    athleteId: "3",
    type: "mentoring",
    title: "Founder office hours",
    description: "Entrepreneurship mentoring for athlete-founders.",
    startingPrice: 900,
    format: "virtual",
    duration: "60 min",
  },
  {
    id: "s4-1",
    athleteId: "4",
    type: "training",
    title: "Inclusive coaching clinic",
    description: "On-field and virtual modules for coaches and PE leaders.",
    startingPrice: 4500,
    format: "both",
    duration: "Full day",
  },
  {
    id: "s4-2",
    athleteId: "4",
    type: "mentoring",
    title: "Youth mentor circles",
    description: "Group mentoring for student-athletes.",
    startingPrice: 350,
    format: "virtual",
    duration: "90 min",
  },
];

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "t1",
    athleteId: "1",
    title: "Leadership drills for captains",
    description: "Scenario-based training translating NFL huddle dynamics to school teams.",
    duration: "6 sessions",
    skillLevel: "Intermediate",
    price: 2800,
    sport: "Football",
    ageGroup: "14–18",
    format: "both",
  },
  {
    id: "t2",
    athleteId: "2",
    title: "Focus & recovery micro-cycles",
    description: "Breath, sleep, and focus stacks used in pro travel schedules.",
    duration: "8 sessions",
    skillLevel: "All levels",
    price: 1200,
    sport: "Basketball",
    ageGroup: "16+",
    format: "virtual",
  },
  {
    id: "t3",
    athleteId: "3",
    title: "Explosive first-step lab",
    description: "Virtual mechanics and film review for guards and wings.",
    duration: "4 sessions",
    skillLevel: "Advanced",
    price: 2200,
    sport: "Basketball",
    ageGroup: "18+",
    format: "virtual",
  },
  {
    id: "t4",
    athleteId: "4",
    title: "Youth technical progression",
    description: "Ball mastery and small-sided games for clubs and schools.",
    duration: "10 sessions",
    skillLevel: "Beginner",
    price: 1800,
    sport: "Soccer",
    ageGroup: "10–16",
    format: "both",
  },
  {
    id: "t5",
    athleteId: "5",
    title: "Routine & arm-care workshop",
    description: "In-person or virtual workshop for pitchers and coaches.",
    duration: "1 day",
    skillLevel: "Intermediate",
    price: 3500,
    sport: "Baseball",
    ageGroup: "12–22",
    format: "both",
  },
  {
    id: "t6",
    athleteId: "6",
    title: "Sprint mechanics intensive",
    description: "Block starts, max velocity, and taper planning.",
    duration: "5 sessions",
    skillLevel: "Advanced",
    price: 2400,
    sport: "Track & Field",
    ageGroup: "16+",
    format: "both",
  },
];

export const applicationsSeed: ApplicationRecord[] = [
  {
    id: "ap_1",
    submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: "review",
    fullName: "Chris Dalton",
    email: "chris.dalton@example.com",
    phone: "555-0101",
    leagueSport: "NFL · WR",
    yearsPlayed: "6",
    city: "Miami, FL",
    servicesOffered: "Speaking, appearances",
    topics: "Resilience, finance",
    bio: "Recently retired; nonprofit founder.",
    socialLinks: "@cdalton",
    videoIntroUrl: "https://example.com/intro",
    availability: "Spring 2026",
    pricingRange: "$8k–$15k",
  },
  {
    id: "ap_2",
    submittedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    status: "pending",
    fullName: "Riley Santos",
    email: "riley.s@example.com",
    phone: "555-0102",
    leagueSport: "College football",
    yearsPlayed: "4",
    city: "Columbus, OH",
    servicesOffered: "Training, mentoring",
    topics: "Youth development",
    bio: "Strength coach path; NIL experience.",
    socialLinks: "",
    videoIntroUrl: "",
    availability: "Immediate",
    pricingRange: "$2k–$5k",
  },
];

export const WATCH_SECTIONS: { title: string; category: string }[] = [
  { title: "Trending talks", category: "__trending__" },
  { title: "Leadership", category: "Leadership" },
  { title: "Adversity", category: "Adversity" },
  { title: "Transition after sports", category: "Transition After Sports" },
  { title: "Entrepreneurship", category: "Entrepreneurship" },
  { title: "Youth development", category: "Youth Development" },
  { title: "Training & mindset", category: "Training & Mindset" },
];

export const SERVICE_LABELS: Record<ServiceKind, string> = {
  speaking: "Speaking",
  training: "Training",
  mentoring: "Mentoring",
  appearance: "Appearances",
  sponsorship: "Sponsorships",
  consultation: "Consultation",
};

export function getAthleteById(id: string): Athlete | undefined {
  return athletes.find((a) => a.id === id);
}

export function getAthleteBySlug(slug: string): Athlete | undefined {
  return athletes.find((a) => a.slug === slug);
}

export function getContentById(id: string): ContentItem | undefined {
  return content.find((c) => c.id === id);
}

export function getContentByAthleteId(athleteId: string): ContentItem[] {
  return content.filter((c) => c.athleteId === athleteId);
}

export function getContentByCategory(category: string): ContentItem[] {
  return content.filter((c) => c.category === category);
}

export function getServicesByAthleteId(athleteId: string): PlatformService[] {
  return services.filter((s) => s.athleteId === athleteId);
}

export function getTrainingByAthleteId(athleteId: string): TrainingProgram[] {
  return trainingPrograms.filter((t) => t.athleteId === athleteId);
}

export function getTrainingWithAthletes(): Array<{
  program: TrainingProgram;
  athlete: Athlete;
}> {
  return trainingPrograms
    .map((program) => {
      const athlete = getAthleteById(program.athleteId);
      return athlete ? { program, athlete } : null;
    })
    .filter(Boolean) as Array<{ program: TrainingProgram; athlete: Athlete }>;
}

export function getMentorshipOffers(): Array<{
  athlete: Athlete;
  area: string;
  format: string;
  fromPrice: number;
}> {
  const rows: Array<{
    athlete: Athlete;
    area: string;
    format: string;
    fromPrice: number;
  }> = [];
  for (const a of athletes) {
    const mentorSvc = services.find(
      (s) => s.athleteId === a.id && s.type === "mentoring"
    );
    const base = mentorSvc?.startingPrice ?? a.priceMin;
    for (const area of a.mentorshipAreas) {
      rows.push({
        athlete: a,
        area,
        format: a.availableFormats.join(" · "),
        fromPrice: base,
      });
    }
  }
  return rows;
}
