export type SpeakerVideoClip = {
  title: string;
  /** YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID */
  embedUrl: string;
};

export type Speaker = {
  slug: string;
  name: string;
  tagline: string;
  league: string;
  topics: string;
  /** Comma or pipe-separated for display; split for profile chips */
  topicsList: string[];
  price: number;
  priceLabel: string;
  image: string;
  imageClassName?: string;
  heroImageAlt: string;
  bio: string;
  /** Short line for cards */
  highlight: string;
  /** Profile carousel — local paths (/…) or remote image URLs */
  photoGallery?: string[];
  /** Profile carousel — embeddable video URLs (YouTube /embed/…) */
  videoGallery?: SpeakerVideoClip[];
};

export const speakers: Speaker[] = [
  {
    slug: "orson-prince-charles",
    name: "Orson Prince-Charles",
    tagline: "Former NFL Player",
    league: "NFL",
    topics: "Leadership | Motivation",
    topicsList: ["Leadership", "Motivation", "Team culture", "Resilience"],
    price: 3000,
    priceLabel: "$3,000",
    image: "/orson-prince-charles.png",
    heroImageAlt: "Orson Prince-Charles speaking at the podium",
    highlight: "Inspires teams with NFL-tested leadership lessons.",
    bio: "Orson Prince-Charles brings championship-level energy to every stage. Former NFL athlete turned keynote speaker, he helps organizations build trust, accountability, and momentum when it matters most.",
    photoGallery: [
      "/orson-prince-charles.png",
      "https://images.unsplash.com/photo-1566577739112-5180d4f93942?w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682724-e99c43a406b2?w=1200&q=80",
    ],
    videoGallery: [
      {
        title: "Leadership and the infinite mindset (sample reel)",
        embedUrl: "https://www.youtube.com/embed/qp0HIF3SfI4",
      },
      {
        title: "On stage: storytelling and trust",
        embedUrl: "https://www.youtube.com/embed/arj7oStGLkU",
      },
    ],
  },
  {
    slug: "lisa-leslie",
    name: "Lisa Leslie",
    tagline: "WNBA Champion & Hall of Famer",
    league: "WNBA",
    topics: "Empowerment | Excellence",
    topicsList: ["Empowerment", "Excellence", "Women in leadership", "Peak performance"],
    price: 4500,
    priceLabel: "$4,500",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    heroImageAlt: "Lisa Leslie",
    highlight: "WNBA legend on empowerment and sustained excellence.",
    bio: "Lisa Leslie translates a Hall of Fame career into actionable lessons on confidence, discipline, and leading under pressure—ideal for executive offsites and youth programs alike.",
    photoGallery: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
      "https://images.unsplash.com/photo-1519861531473-9350266368b?w=1200&q=80",
    ],
    videoGallery: [
      {
        title: "Championship mindset — keynote excerpt",
        embedUrl: "https://www.youtube.com/embed/qp0HIF3SfI4",
      },
      {
        title: "Women in leadership panel",
        embedUrl: "https://www.youtube.com/embed/arj7oStGLkU",
      },
    ],
  },
  {
    slug: "joe-johnson",
    name: "Joe Johnson",
    tagline: "Former NBA All-Star",
    league: "NBA",
    topics: "Resilience | Teamwork",
    topicsList: ["Resilience", "Teamwork", "Mental toughness", "Longevity"],
    price: 5000,
    priceLabel: "$5,000",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    heroImageAlt: "Joe Johnson",
    highlight: "All-Star perspective on grit, adaptability, and team chemistry.",
    bio: "Joe Johnson shares stories from two decades in the NBA about staying relevant, elevating teammates, and performing when the clock is winding down.",
    photoGallery: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
      "https://images.unsplash.com/photo-1519861531473-9350266368b?w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    ],
    videoGallery: [
      {
        title: "Longevity in pro sports — fireside chat",
        embedUrl: "https://www.youtube.com/embed/qp0HIF3SfI4",
      },
      {
        title: "Clutch performance and mental toughness",
        embedUrl: "https://www.youtube.com/embed/arj7oStGLkU",
      },
    ],
  },
  {
    slug: "chris-long",
    name: "Chris Long",
    tagline: "Super Bowl Champion, Philanthropist",
    league: "NFL",
    topics: "Philanthropy | Mindset",
    topicsList: ["Philanthropy", "Mindset", "Purpose-driven leadership", "Community impact"],
    price: 4000,
    priceLabel: "$4,000",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    heroImageAlt: "Chris Long",
    highlight: "Champion mindset with a focus on impact beyond the field.",
    bio: "Chris Long connects on-field discipline with off-field purpose—helping brands and teams align performance with values and community leadership.",
    photoGallery: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682724-e99c43a406b2?w=1200&q=80",
      "https://images.unsplash.com/photo-1566577739112-5180d4f93942?w=1200&q=80",
    ],
    videoGallery: [
      {
        title: "Purpose-driven leadership keynote",
        embedUrl: "https://www.youtube.com/embed/qp0HIF3SfI4",
      },
      {
        title: "Community impact and philanthropy in sports",
        embedUrl: "https://www.youtube.com/embed/arj7oStGLkU",
      },
    ],
  },
];

export function getSpeakerBySlug(slug: string): Speaker | undefined {
  return speakers.find((s) => s.slug === slug);
}

export function getAllSpeakerSlugs(): string[] {
  return speakers.map((s) => s.slug);
}
