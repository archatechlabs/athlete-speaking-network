import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Play } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import WatchVideoCard from "@/components/watch/WatchVideoCard";
import AthleteServiceCard from "@/components/athletes/AthleteServiceCard";
import Card from "@/components/ui/Card";
import {
  getAthleteBySlug,
  getContentByAthleteId,
  getServicesByAthleteId,
  getTrainingByAthleteId,
  SERVICE_LABELS,
} from "@/lib/data";
import type { ServiceKind } from "@/lib/types";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type Props = { params: { slug: string } };

export default function AthleteProfilePage({ params }: Props) {
  const athlete = getAthleteBySlug(params.slug);
  if (!athlete) notFound();

  const talks = getContentByAthleteId(athlete.id);
  const athleteServices = getServicesByAthleteId(athlete.id);
  const programs = getTrainingByAthleteId(athlete.id);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GlassCard hover={false} className="overflow-hidden p-0 lg:grid lg:grid-cols-[minmax(0,340px)_1fr]">
          <div className="relative aspect-[3/4] w-full max-lg:max-h-[420px] lg:min-h-[420px]">
            <Image
              src={athlete.image}
              alt={athlete.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 340px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {athlete.league}
              </p>
              {athlete.verified && (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                  Verified
                </span>
              )}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {athlete.name}
            </h1>
            <p className="mt-2 text-sm text-white/55">{athlete.location}</p>
            <StarRating value={athlete.rating} className="mt-4" />
            <p className="mt-6 text-lg text-white/75">{athlete.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {athlete.servicesOffered.map((s: ServiceKind) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {SERVICE_LABELS[s]}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm text-white/50">Starting range</p>
            <p className="text-2xl font-bold text-white">
              {money.format(athlete.priceMin)} – {money.format(athlete.priceMax)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" href={`/book/${athlete.slug}`}>
                Book athlete
              </Button>
              <Button variant="secondary" href="/watch">
                Watch content
              </Button>
              <Button variant="ghost" href="/training">
                Explore training
              </Button>
            </div>
          </div>
        </GlassCard>

        <section className="mt-14" id="services">
          <h2 className="text-2xl font-bold text-white">Services</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            Speaking, training, mentoring, appearances, sponsorships, and consultations—structured
            so organizations can scope the right engagement.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {athleteServices.map((s) => (
              <AthleteServiceCard key={s.id} service={s} athleteSlug={athlete.slug} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white">Topics &amp; expertise</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {athlete.topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Watch talks</h2>
              <p className="mt-2 max-w-xl text-sm text-white/65">
                Stream previews and full sessions. Content and bookings reinforce the same
                narrative—book once, learn everywhere.
              </p>
            </div>
            <Link
              href="/watch"
              className="text-sm font-medium text-accent transition hover:text-accent-hover"
            >
              Full library →
            </Link>
          </div>
          {talks.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {talks.map((c) => (
                <WatchVideoCard key={c.id} item={c} className="w-full shrink" />
              ))}
            </div>
          ) : (
            <GlassCard hover={false} className="mt-8 p-8 text-white/60">
              New talks publishing soon.
            </GlassCard>
          )}
        </section>

        <section className="mt-16" id="training">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Training programs</h2>
              <p className="mt-2 max-w-xl text-sm text-white/65">
                Athlete-led sessions beyond the keynote—built for teams, schools, and dedicated
                trainees.
              </p>
            </div>
            <Link href="/training" className="text-sm font-medium text-accent hover:text-accent-hover">
              Training marketplace →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Card key={p.id} className="flex h-full flex-col p-6">
                <p className="text-xs font-medium uppercase text-accent">{p.sport}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-white/65">{p.description}</p>
                <p className="mt-4 text-xs text-white/45">
                  {p.skillLevel} · {p.ageGroup} · {p.duration} · {p.format}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {money.format(p.price)}
                </p>
                <Button
                  variant="secondary"
                  href={`/book/${athlete.slug}?service=training`}
                  className="mt-4 w-full !py-2.5"
                >
                  Request training
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white">Mentorship focus</h2>
          <GlassCard hover={false} className="mt-6 p-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {athlete.mentorshipAreas.map((m) => (
                <li key={m} className="flex items-start gap-3 text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {m}
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              href={`/book/${athlete.slug}?service=mentoring`}
              className="mt-8"
            >
              Request mentorship
            </Button>
          </GlassCard>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white">Story &amp; legacy</h2>
          <GlassCard hover={false} className="mt-6 p-8 sm:p-10">
            <p className="text-base leading-relaxed text-white/80 whitespace-pre-line">
              {athlete.longBio}
            </p>
          </GlassCard>
        </section>

        <section className="mt-12">
          <GlassCard hover={false} className="overflow-hidden p-0">
            <div className="relative aspect-video w-full bg-navy-light">
              <iframe
                title={`${athlete.name} preview`}
                src={athlete.previewVideoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-center gap-3 border-t border-white/10 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Play className="h-5 w-5" fill="currentColor" />
              </div>
              <p className="text-sm text-white/70">Watch preview — then book or stream full talks.</p>
            </div>
          </GlassCard>
        </section>

        <GlassCard className="mt-16 flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Ready to move forward?</h3>
            <p className="mt-1 text-sm text-white/65">
              Submit a structured request—{athlete.name.split(" ")[0]}&apos;s team replies within 24 hours
              on average.
            </p>
          </div>
          <Button variant="primary" href={`/book/${athlete.slug}`}>
            Book {athlete.name.split(" ")[0]}
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
