import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getMentorshipOffers } from "@/lib/data";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const pillars = [
  {
    title: "Life coaching",
    text: "Identity, boundaries, and sustainable ambition after the spotlight.",
  },
  {
    title: "Transition support",
    text: "Career pivots, education, and first 90 days outside the locker room.",
  },
  {
    title: "Youth mentoring",
    text: "Student-athletes and next-gen leaders in schools and clubs.",
  },
  {
    title: "Leadership & entrepreneurship",
    text: "Boardrooms, founders, and executives learning from elite competitors.",
  },
];

export default function MentorshipPage() {
  const offers = getMentorshipOffers();

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute right-10 top-24 h-80 w-80 rounded-full bg-accent/12 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Mentorship</h1>
        <p className="mt-4 max-w-3xl text-sm text-white/65 sm:text-base">
          ASN connects mentors who lived the journey with orgs and individuals who need structured
          guidance—virtual or in-person, always tied to verified athlete profiles.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <GlassCard key={p.title} hover={false} className="p-5">
              <h2 className="font-semibold text-white">{p.title}</h2>
              <p className="mt-2 text-sm text-white/60">{p.text}</p>
            </GlassCard>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold text-white">Mentors on roster</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((m) => (
            <Card key={`${m.athlete.id}-${m.area}`} className="flex h-full flex-col p-6">
              <p className="text-xs font-medium text-accent">{m.athlete.league}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{m.athlete.name}</h3>
              <p className="mt-2 text-sm font-medium text-white/85">{m.area}</p>
              <p className="mt-2 flex-1 text-sm text-white/55">Formats: {m.format}</p>
              <p className="mt-4 text-sm font-semibold text-white">
                From {money.format(m.fromPrice)}
              </p>
              <Button
                variant="primary"
                href={`/book/${m.athlete.slug}?service=mentoring`}
                className="mt-4 w-full !py-2.5"
              >
                Request session
              </Button>
              <Link
                href={`/athletes/${m.athlete.slug}`}
                className="mt-3 text-center text-sm text-accent hover:text-accent-hover"
              >
                View profile
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
